import { AbstractParam } from './AbstractParam';
/**
 * This is used to ask [a, b] new movies.
 */
export class ParamInterval extends AbstractParam {
  getKey(): String {
    return 'interval';
  }
  async getArrayValue(): Promise<number[]> {
    const clean: String = await super.getValue().replace(' ', '');
    const tempo: String[] = await clean.split(',');
    const res: number[] = [];
    await res.push(parseInt((await tempo[0].substring(1)), 10));
    await res.push(parseInt((await tempo[1].slice(0, -1)), 10));
    if (tempo[0].charAt(0) === ']') {
      res[0] --;
    }
    if (tempo[1].charAt(tempo[1].length - 1) === ']') {
      res[1] ++;
    }
    return res;
  }

}
