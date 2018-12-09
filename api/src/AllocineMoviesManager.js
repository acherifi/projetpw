const fetch = require('node-fetch');
module.exports = class AllocineMoviesManager {
  constructor() {
    this.urlAllocine = 'http://api.allocine.fr/rest/v3/';
    this.partnerKey = 'YW5kcm9pZC12Mg';
    this.codeRoleDirector = 8002;
    this.codeRoleActor = 8001;
  }
  async getMovieById(movieId, parametersShowTimes) {
    const resultFromAllocine = await this.doRequest('movie?'+await this.getPartnerParameter()+
    '&code='+movieId+'&profile=large&mediafmt=mp4-lc&format=json&filter=movie&striptags=synopsis');
    const movie = await this.formatOneMovie(resultFromAllocine);
    let resultShowTimeFromAllocine = undefined;
    if (parametersShowTimes !== undefined) {
      resultShowTimeFromAllocine = await this.doRequest('showtimelist?'+await this.getPartnerParameter()+
      '&movie='+movieId+'&count=5000'+'&lat='+parametersShowTimes.latitude+'&long='+
      parametersShowTimes.longitude+'&radius='+parametersShowTimes.radius+'&format=json');
    }
    const showTime = await this.formatShowTime(resultShowTimeFromAllocine);
    return [movie, showTime];
  }
  async doRequest(toAddtoUrl) {
    console.log(this.urlAllocine+toAddtoUrl);
    const res = await fetch(this.urlAllocine+toAddtoUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    return await res.json();
  }
  async getPartnerParameter() {
    return await 'partner='+this.partnerKey;
  }
  async formatOneMovie(allocineResult) {
    if (allocineResult.movie === undefined) {
      return {};
    } else {
      let title = allocineResult.movie.originalTitle;
      if (title.includes('Google play')) {
        title = allocineResult.movie.media[0].title.replace(': Affiche', '');
      }
      const genres = [];
      for (let i = 0; i < allocineResult.movie.genre.length; ++i) {
        genres.push(allocineResult.movie.genre[i].$);
      }
      const result = {infomovie: {
        id: allocineResult.movie.code,
        title: title,
        genres: genres,
        directors: await this.getPeople(allocineResult, this.codeRoleDirector),
        actors: await this.getPeople(allocineResult, this.codeRoleActor),
        synopsis: allocineResult.movie.synopsis,
        releasedate: allocineResult.movie.release.releaseDate,
        poster: allocineResult.movie.media[0].thumbnail.href,
        rate: await this.getRate(allocineResult),
      }};
      return result;
    }
  }
  async formatShowTime(allocineResult) {
    const theaters = [];
    if (allocineResult !== undefined) {
      const theaterShowtimes = allocineResult.feed.theaterShowtimes;
      for (let i = 0; i < theaterShowtimes.length; ++i) {
        const city = theaterShowtimes[i].place.theater.city;
        const name = theaterShowtimes[i].place.theater.name;
        theaters.push({
          'city': city,
          'name': name,
          'filmshows': await this.formatMovieShowTimes(theaterShowtimes[i].movieShowtimes),
        });
      }
    }

    const result = {infoshowtime: {
      'theaters': theaters,
    }};
    return result;
  }
  async formatMovieShowTimes(allocineShowTimes) {
    const result = [];
    for (let i = 0; i < allocineShowTimes.length; ++i) {
      const version = allocineShowTimes[i].version.$;
      const type = allocineShowTimes[i].screenFormat.$;
      const elementsOfResult = [];
      for (let p = 0; p < allocineShowTimes[i].scr.length; ++p) {
        const date = allocineShowTimes[i].scr[p].d;
        const shows = [];
        for (let q = 0; q < allocineShowTimes[i].scr[p].t.length; ++q) {
          await shows.push(allocineShowTimes[i].scr[p].t[q].$);
        }
        await elementsOfResult.push({
          'day': date,
          'version': version,
          'type': type,
          'shows': shows,
        });
      }
      await result.push(elementsOfResult);
    }
    return result;
  }
  async getPeople(allocineResult, codeRole) {
    const res = [];
    for (let i = 0; i < allocineResult.movie.castMember.length; ++i) {
      if (allocineResult.movie.castMember[i].activity.code === codeRole) {
        await res.push(allocineResult.movie.castMember[i].person.name);
      }
    }
    return res;
  }
  async getRate(allocineResult) {
    const pressRate = allocineResult.movie.statistics.pressRating;
    const userRating = allocineResult.movie.statistics.userRating;
    return (pressRate + userRating)/2;
  }
};
