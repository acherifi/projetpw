import bcrypt from 'bcrypt-nodejs';
const saltRounds = 10;

export class CryptClass {
  public static crypt(toCrypt: string): string {
    const salt = bcrypt.genSaltSync(saltRounds);
    const answer = bcrypt.hashSync(toCrypt, salt);
    return answer;
  }
  public static compare(clear: string , crypted: string): boolean {
    try {
      return bcrypt.compareSync(clear, crypted);
    } catch (e) {
      return false;
    }
  }
}
