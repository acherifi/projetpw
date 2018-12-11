import { IParam } from './IParam';
export abstract class AbstractParam implements IParam {
  private value: String;
  constructor(value: String) {
    this.value = value;
  }
  abstract getKey(): String;
  getValue(): String {
    return this.value;
  }

}
