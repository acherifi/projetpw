import { User } from './objects/User';
import { WatchlistService } from './WatchlistService';

export class UserService {
  private connectedUser: User;
  private url = 'http://localhost:4000/users/';

  async getUserByMail(email: string): Promise<User> {
    const resultRequest =  await this.doGetRequest('');
    for (let i = 0; i < resultRequest.length; ++i) {
      if (resultRequest[i].email === email) {
        const user = await new User(email, resultRequest[i].password);
        await user.setId(resultRequest[i].id);
        await user.setWatchlist(await (await new WatchlistService()).getWatchlistById(resultRequest[i].idwatch));
        return user;
      }
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
  async addUser(user: User): Promise<boolean> {
    return await this.doPostRequest('add',
    {email: await user.getEmail(), password: await user.getPassword()});
  }
  async setConnectedUser(user: User) {
    this.connectedUser = user;
  }
  async getConnectedUser() {
    return this.connectedUser;
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
