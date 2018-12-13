export interface IParam {
  getKey(): String;
  getValue(): String;
  equals(toCompare: IParam): boolean;
}
