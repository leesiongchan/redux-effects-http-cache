import { FETCH } from 'redux-effects-fetch';

function cache() {
  const _cache = {};

  return {
    check: url => _cache.hasOwnProperty(url),
    set: (url, payload) => { _cache[url] = payload; },
    get: url => _cache[url],
    clear: url =>
      Object.keys(_cache).forEach(key => {
        let listUrl = key.substr(0, key.lastIndexOf('?'));
        let getByIdUrl = key.substr(0, key.lastIndexOf('/'));
        if (key.includes('?') && key.includes(listUrl)) {
          delete _cache[key];
        } else if (key.includes(getByIdUrl)) {
          delete _cache[key];
        }
      })
  };
}

function isRequestType({ type }) {
  return type === FETCH;
}

function isGetRequest({ payload: { params } }) {
  return params.method === 'GET';
}

function isPostRequest({ payload: { params } }) {
  return params.method === 'POST';
}

function isPutRequest({ payload: { params } }) {
  return params.method === 'PUT';
}

export default function httpCache() {
  const { get, set, check, clear } = cache();

  return next => action => {

    let url;

    if (isRequestType(action)) {
      url = action.payload.url;
      if (isPostRequest(action) || isPutRequest(action)) {
        clear(url);
      }
    }

    if (!isRequestType(action) || !isGetRequest(action)) {
      return next(action);
    }

    if (check(url)) {
      return get(url);
    }

    const nextAction = next(action);

    // Cache the action!
    set(url, nextAction);

    return nextAction;
  };
}
