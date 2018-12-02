import { Movie } from './objects/Movie';
import { IParam } from './objects/searchParameters/IParam';

export class MovieService{
  constructor(){

  } 
  getMoviesById(id:string):Movie{
    //TODO : requete à l'api
    return null;
  } 
  getMoviesByIds(id:string[]):Movie[]{
    //TODO : requete à l'api
    return null;
  }
  getMoviesByParams(params:IParam[]):Movie[]{
    //TODO : requete à l'api
    return null;
  }
}