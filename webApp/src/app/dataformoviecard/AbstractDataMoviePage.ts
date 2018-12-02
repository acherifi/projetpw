import { IDataMoviePage } from './IDataMoviePage';
import { Movie } from '../../services/objects/Movie';

export abstract class AbstractDataMoviePage implements IDataMoviePage{
  getTitle(): string {
    return null;
  }
  constructor(movie: Movie) {

  }
}