const fetch = require('node-fetch');
module.exports = class AllocineMoviesManager {
  constructor() {
    this.urlAllocine = 'http://api.allocine.fr/rest/v3/';
    this.partnerKey = 'YW5kcm9pZC12Mg';
    this.codeRoleDirector = 8002;
    this.codeRoleActor = 8001;
  }
  async getMovieById(movieId) {
    const resultFromAllocine = await this.doRequest('movie?'+await this.getPartnerParameter()+
    '&code='+movieId+'&profile=large&mediafmt=mp4-lc&format=json&filter=movie&striptags=synopsis');
    const movie = await this.formatOneMovie(resultFromAllocine);
    const showTime = await this.formatShowTime('');
    return [movie, showTime];
  }
  async getMovieByParams(paramJSONObject) {

  }
  async doRequest(toAddtoUrl) {
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
    const result = {infoshowtime: {

    }};
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
