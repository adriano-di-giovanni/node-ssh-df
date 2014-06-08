# node-ssh-df

A Node.js module to check disk space on remote machines using ssh and df Unix program.

## Installation

```
npm install node-ssh-df
```

## Usage

### Basic

```javascript
var
    df = require('node-ssh-df'),

    config = {
        host: 'localhost',
        username: 'foo',
        password: 'bar'
    };

df(config, function (error, response) {
    if (error) { throw error; }

    console.log(JSON.stringify(response, null, 2));
});
```

See [ssh2](https://github.com/mscdex/ssh2#connection-methods) page on GitHub for more info about `config` hash.

See [node-df](https://github.com/adriano-di-giovanni/node-df) page on GitHub for more info about `df` output.

### Advanced

```javascript
var
    df = require('node-ssh-df'),

    config = {
        host: 'localhost',
        username: 'foo',
        password: 'bar'
    },
    options = {
        file: '/',
        prefixMultiplier: 'GB',
        isDisplayPrefixMultiplier: true,
        precision: 2
    };

df(config, options, function (error, response) {
    if (error) { throw error; }

    console.log(JSON.stringify(response, null, 2));
});
```

See [node-df](https://github.com/adriano-di-giovanni/node-df) page on GitHub for more info about `options` hash.