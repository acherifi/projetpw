import {WatchlistService} from '../../src/services/WatchlistService';


test('basic', async () => {
  const u = new WatchlistService();
  const a = await (await u.getWatchlistById('cw-fvm9y08lkjqo4x6x0')).toString();
  expect(a).not.toBe('');
  console.log(a);
});