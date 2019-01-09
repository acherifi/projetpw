import bcrypt from 'bcrypt-nodejs';
const saltRounds = 10;

export class CryptClass {
  public static crypt(toCrypt: string): string {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(toCrypt, salt);
  }
  public static compare(clear: string , crypted: string): boolean {
    return bcrypt.compareSync(clear, crypted);
  }
}
