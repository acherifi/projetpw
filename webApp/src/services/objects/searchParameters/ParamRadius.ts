import { AbstractParam } from './AbstractParam';
/**
 * This is used to send a radius around a point (latitude, longitude) to search movies available in theaters.
 */
export class ParamRadius extends AbstractParam {
  getKey(): String {
    return 'radius';
  }

}
