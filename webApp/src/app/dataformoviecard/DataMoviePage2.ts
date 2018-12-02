import { IDataMoviePage } from './IDataMoviePage';
import { Movie } from '../../services/objects/Movie';
import { AbstractDataMoviePage } from './AbstractDataMoviePage';
export class DataMoviePage2 extends AbstractDataMoviePage {
  constructor(movie: Movie) {
    super(movie);
  }
}