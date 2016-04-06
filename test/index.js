import test from 'tape';
import { fetch } from 'redux-effects-fetch';

import httpCache from '../src';

test('should work', ({ equal, plan }) => {
  const hc = httpCache();
  const mw = hc(effect => {
    equal(effect.payload.url, 'http://test/');
  });

  plan(1);
  mw(fetch('http://test/'));
});
