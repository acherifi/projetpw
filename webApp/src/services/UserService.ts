import { User } from './objects/User';
import { WatchlistService } from './WatchlistService';
import { CryptClass} from './CryptClass';

export class UserService {
  private url = 'https://localhost:4000/users/';
  private keyLocalStorage = 'connectedUser';
  async getUserByMail(email: string): Promise<User> {
    const resultRequest =  await this.doGetRequest('');
    for (let i = 0; i < resultRequest.length; ++i) {
      if (await CryptClass.compare(email, resultRequest[i].email)) {
        const user = await new User(email, resultRequest[i].password);
        await user.setId(resultRequest[i].id);
        await user.setWatchlist(await (await new WatchlistService()).getWatchlistById(resultRequest[i].idwatch));
        return user;
      }
    }
    return undefined;
  }
  async getUserById(id: string): Promise<User> {
    const resultRequest = await this.doGetRequest(id);
    if (resultRequest !== {}) {
      const user = await new User(resultRequest.email, resultRequest.password);
      await user.setId(id);
      await user.setWatchlist(await (await new WatchlistService()).getWatchlistById(resultRequest.idwatch));
      return user;
    }
    return undefined;
  }
  async getAllUsers(): Promise<User[]> {
    const resultRequest =  await this.doGetRequest('');
    const users: User[] = [];

    for (let i = 0; i < resultRequest.length; ++i) {
      const user = await new User(resultRequest[i].email, resultRequest[i].password);
      await user.setId(resultRequest[i].id);
      const watchlistService = await new WatchlistService();
      const wlTempo = await watchlistService.getWatchlistById(resultRequest[i].idwatch);
      await user.setWatchlist(wlTempo);
      await users.push(user);
    }
    return users;
  }
  async addUser(user: User): Promise<User> {
    const answer: boolean = await this.doPostRequest('add',
    {email: await user.getEmail(), password: await user.getPassword()});
    if (answer) {
      const newUser = await this.getUserByMail((await user.getEmail()).toString());
      return newUser;
    } else {
      return undefined;
    }
  }
  async setConnectedUser(user: User) {
    if (user === undefined) {
      localStorage.setItem(this.keyLocalStorage, undefined);
    } else {
      localStorage.setItem(this.keyLocalStorage, (await user.getId()).toString());
    }
  }
  async getConnectedUser(): Promise<User> {
    const localUserId: string = localStorage.getItem(this.keyLocalStorage);
    const localUser: User = await this.getUserById(localUserId);
    return localUser;
  }
  private async doGetRequest(params: string) {
    const result = await fetch(this.url + params, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const jsonResult = await result.json();
    return jsonResult;
  }
  private async doPostRequest(params: string, data: {}): Promise<boolean> {
    const result = await fetch(this.url + params, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return result.status === 201;
  }

}
