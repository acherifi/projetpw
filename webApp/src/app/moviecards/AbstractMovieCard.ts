import { Input } from '@angular/core';
import {IDataMoviePage} from '../dataformoviecard/IDataMoviePage';

export abstract class AbstractMovieCard {
  @Input() data: IDataMoviePage;
}
