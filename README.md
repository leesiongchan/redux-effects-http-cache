# redux-effects-http-cache

Cache HTTP requests to fetch requests to prevent duplicated requests.

## Installation

```
$ npm install redux-effects-http-cache
```

## Usage

Add the http cache middleware to the effects stack before the `fetch` middleware.

```javascript
import effects from 'redux-effects';
import fetch from 'redux-effects-fetch';
import httpCache from 'redux-effects-http-cache';

applyMiddleware(effects, httpCache, fetch)(createStore);
```
