const fetch = require('node-fetch');
module.exports = class AllocineMoviesManager {
  constructor() {
    this.urlAllocine = 'http://api.allocine.fr/rest/v3/';
    this.partnerKey = 'YW5kcm9pZC12Mg';
    /**
     * code from allocine to find actor, directors ...
     */
    this.codeRoleDirector = 8002;
    this.codeRoleActor = 8001;
  }
  async getMovieById(movieId, parametersShowTimes) {
    const resultFromAllocine = await this.doRequest('movie?'+await this.getPartnerParameter()+
    '&code='+movieId+'&profile=large&mediafmt=mp4-lc&format=json&filter=movie&striptags=synopsis');
    const movie = await this.formatOneMovie(resultFromAllocine.movie);
    let resultShowTimeFromAllocine = undefined;
    if (parametersShowTimes !== undefined) {
      resultShowTimeFromAllocine = await this.doRequest('showtimelist?'+await this.getPartnerParameter()+
      '&movie='+movieId+'&count=5000'+'&lat='+parametersShowTimes.latitude+'&long='+
      parametersShowTimes.longitude+'&radius='+parametersShowTimes.radius+'&format=json');
    }
    const showTime = await this.formatShowTime(resultShowTimeFromAllocine);
    return {infomovie: movie, infoshowtime: showTime};
  }
  /**
   * Get movies juste released in theaters sorted by number of theaters.
   * @param {string} interval to specify how many movies do you want to get
   */
  async getRecentMoviesInTheaters(interval) {
    const allMovies = [];
    if (interval === undefined) {
      return allMovies;
    }
    const resultFromAllocine = await this.doRequest('movielist?'+await this.getPartnerParameter()+
  '&count='+ interval[1] +'&format=json&filter=nowshowing&order=theatercount');

    for (let i = interval[0]; i < resultFromAllocine.feed.movie.length && i < interval[1]; ++i) {
      await allMovies.push(await this.getMovieById(resultFromAllocine.feed.movie[i].code, undefined));
    }
    return allMovies;
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
  /**
   * Take json from allocine to build a json for us
   * @param {JSON} movieAllocine Json from allocine
   */
  async formatOneMovie(movieAllocine) {
    if (movieAllocine === undefined) {
      return {};
    } else {
      let title = movieAllocine.originalTitle;
      if (title.includes('Google play')) {
        if (movieAllocine.media !== undefined) {
          title = movieAllocine.media[0].title.replace(': Affiche', '');
        } else {
          title = 'titre';
        }
      }
      const genres = [];
      for (let i = 0; i < movieAllocine.genre.length; ++i) {
        genres.push(movieAllocine.genre[i].$);
      }
      const result = {
        id: movieAllocine.code,
        title: title,
        genres: genres,
        directors: await this.getPeople(movieAllocine, this.codeRoleDirector),
        actors: await this.getPeople(movieAllocine, this.codeRoleActor),
        synopsis: movieAllocine.synopsis,
        releasedate: movieAllocine.release.releaseDate,
        poster: await this.convertHttpStringToHttpsString(movieAllocine.media[0].thumbnail.href),
        rate: await this.getRate(movieAllocine),
      };
      return result;
    }
  }
  async convertHttpStringToHttpsString(request) {
    // 4 for http
    return (await request.slice(0, 4) + 's'+await request.slice(4));
  }
  async formatShowTime(allocineResult) {
    const theaters = [];
    if (allocineResult !== undefined) {
      const theaterShowtimes = allocineResult.feed.theaterShowtimes;
      if (theaterShowtimes !== undefined) {
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
    }

    const result = {
      'theaters': theaters,
    };
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
  async getPeople(movieAllocine, codeRole) {
    const res = [];
    if (movieAllocine.castMember !== undefined) {
      for (let i = 0; i < movieAllocine.castMember.length; ++i) {
        if (movieAllocine.castMember[i].activity.code === codeRole) {
          await res.push(movieAllocine.castMember[i].person.name);
        }
      }
    }
    return res;
  }
  async getRate(movieAllocine) {
    const pressRate = movieAllocine.statistics.pressRating;
    const userRating = movieAllocine.statistics.userRating;
    return ((pressRate + userRating)/2).toFixed(1);
  }
};
