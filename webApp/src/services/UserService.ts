import { User } from './objects/User';
export class UserService {
  private connectedUser: User;

  getUserByMail(mail: string): User {
    // TODO : requete à l'api
    return null;
  }
  getAllUsers(): User[] {
    // TODO : requete à l'api
    return null;
  }
  addUser(user: User): boolean {
    // TODO : requete à l'api
    return null;
  }
  removeUser(user: User): boolean {
    // TODO : requete à l'api
    return null;
  }
  setConnectedUser(user: User) {
    this.connectedUser = user;
  }
  getConnectedUser() {
    return this.connectedUser;
  }

}
