import { FETCH } from 'redux-effects-fetch';

function cache() {
  const _cache = {};

  return {
    check: url => _cache.hasOwnProperty(url),
    set: (url, payload) => { _cache[url] = payload; },
    get: url => _cache[url],
  };
}

function isRequestType({ type }) {
  return type === FETCH;
}

function isGetRequest({ payload: { params } }) {
  return params.method === 'GET';
}

export default function httpCache() {
  const { get, set, check } = cache();

  return next => action => {
    if (!isRequestType(action) || !isGetRequest(action)) {
      return next(action);
    }

    if (check(action.payload.url)) {
      return get(action.payload.url);
    }

    const nextAction = next(action);

    // Cache the action!
    set(action.payload.url, nextAction);

    return nextAction;
  };
}
