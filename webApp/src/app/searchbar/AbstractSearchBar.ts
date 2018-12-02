import { Input } from '@angular/core';
import { Movie } from '../../services/objects/Movie';
import { IParam } from '../../services/objects/searchParameters/IParam';

export abstract class AbstractSearchBar{
  @Input() dataDirectors:string[];

  submit():void{
    //TODO: c'est l'event du bouton submit quoi
    //c'est un handler commun à toutes les barres de recherche
  }
  onChangeDirectors(result){
    //TODO: event quand le choix des réalisateurs changent
    //c'est un handler commun à toutes les barres
  }
  abstract update(movies: Movie[]);
  abstract addParamToService(param:IParam);
}