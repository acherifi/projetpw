import { User } from './objects/User';
import { WatchlistService } from './WatchlistService';
import { CryptClass} from './CryptClass';

export class UserService {
  public api_url: string;
  private keyLocalStorage = 'connectedUser';
  private localUser: User;
  constructor(api_url: string) {
    this.api_url = api_url;
  }
  async getUserByMail(email: string): Promise<User> {
    return await this.getUserById(email);
  }
  async getUserById(id: string): Promise<User> {
    const resultRequest = await this.doGetRequest(id);
    if (resultRequest !== {}) {
      const user = await new User(resultRequest.email, resultRequest.password);
      await user.setId(id);
      await user.setWatchlist(await (await new WatchlistService(this.api_url)).getWatchlistById(resultRequest.idwatch));
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
      const watchlistService = await new WatchlistService(this.api_url);
      const wlTempo = await watchlistService.getWatchlistById(resultRequest[i].idwatch);
      await user.setWatchlist(wlTempo);
      await users.push(user);
    }
    return users;
  }
  async addUser(user: User): Promise<User> {
     const answer: boolean = await this.doPostRequest('add',
        {email:  await (await user.getEmail()).toString(), password: CryptClass.crypt(await
          (await user.getPassword()).toString())});
    if (answer) {
      const newUser = await this.getUserByMail(await (await user.getEmail()).toString());
      return newUser;
    } else {
      return undefined;
    }


  }
  async setConnectedUser(user: User) {
    this.localUser = user;
    if (user === undefined) {
      localStorage.setItem(this.keyLocalStorage, undefined);
    } else {
      localStorage.setItem(this.keyLocalStorage, (await user.getId()).toString());
    }
  }
  async getConnectedUser(): Promise<User> {
    if (this.localUser === undefined) {
      const localUserId: string = await localStorage.getItem(this.keyLocalStorage);
      if (localUserId !== 'undefined') {
        this.localUser = await this.getUserById(localUserId);
      }
    }
    return this.localUser;
  }
  private async getUrl(): Promise<string> {
    return this.api_url + '/users/';
  }
  private async doGetRequest(params: string) {
    const result = await fetch(await this.getUrl() + params, {
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
    const result = await fetch(await this.getUrl() + params, {
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
