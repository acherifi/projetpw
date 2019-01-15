import {UserService} from '../../src/services/UserService';
import {User} from '../../src/services/objects/User';


test('add user', async () => {
  const u = await new UserService('https://apicineweb.herokuapp.com');
  await u.addUser(await new User('test@test.com', 'test'));
  const toTest = await u.getUserByMail('test@test.com');
  expect(await toTest.getId()).not.toBe('undefined');
});
