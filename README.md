node-zpool
==========

Interface to ZFS zpools

Installation
------------

    npm install zpool

Examples
--------

### zpool.list

Like `zpool list` on the command line

``` js
var zpool = require('zpool');
zpool.list(function(err, list, out) {
  // list => an object of all zpools
  // out => the raw output from `zpool list`
  console.dir(list);
});
```

yields

``` json
{
  "goliath": {
    "size": "10.9T",
    "alloc": "3.96T",
    "free": "6.91T",
    "expandsz": "13.4E",
    "cap": "36%",
    "dedup": "1.00x",
    "health": "ONLINE",
    "altroot": null
  },
  "rpool": {
    "size": "37G",
    "alloc": "10.1G",
    "free": "26.9G",
    "expandsz": null,
    "cap": "27%",
    "dedup": "1.00x",
    "health": "ONLINE",
    "altroot": null
  }
}
```

You can also supply a filter as the first argument

``` js
var zpool = require('zpool');
zpool.list('rpool', function(err, list, out) {
  // list => an object rpool
  // out => the raw output from `zpool list rpool`
  console.dir(list);
});
```

yields

``` json
{
  "size": "37G",
  "alloc": "10.1G",
  "free": "26.9G",
  "expandsz": null,
  "cap": "27%",
  "dedup": "1.00x",
  "health": "ONLINE",
  "altroot": null
}
```

### zpool.health

General zpool health with `zpool status -x`

``` js
var zpool = require('zpool');
zpool.health(function(err, info) {
  console.log(info);
});
```

yields

```
all pools are healthy
```

### zpool.status

**not fully implemented yet**

The parsed output of `zpool status`, prefer `zpool.list` instead

``` js
var zpool = require('zpool');
zpool.status(function(err, list, out) {
  // list => an object of all zpools
  // out => the raw output from `zpool status`
  console.dir(list);
});
```

yields

``` json
{
  "goliath": {
    "pool": "goliath",
    "state": "ONLINE",
    "scan": "scrub repaired 0 in 2h19m with 0 errors on Sun Jan 27 17:19:07 2013",
    "config": [
      "config:",
      "STATE     READ WRITE CKSUM",
      "ONLINE       0     0     0",
      "ONLINE       0     0     0",
      "ONLINE       0     0     0",
      "ONLINE       0     0     0",
      "ONLINE       0     0     0",
      "ONLINE       0     0     0",
      "ONLINE       0     0     0",
      "ONLINE       0     0     0",
      "ONLINE       0     0     0",
      "ONLINE       0     0     0",
      "logs",
      "ONLINE       0     0     0"
    ],
    "errors": "No known data errors"
  },
  "rpool": {
    "pool": "rpool",
    "state": "ONLINE",
    "scan": "scrub repaired 0 in 0h14m with 0 errors on Tue Apr 16 18:35:09 2013",
    "config": [
      "config:",
      "STATE     READ WRITE CKSUM",
      "ONLINE       0     0     0",
      "ONLINE       0     0     0"
    ],
    "errors": "No known data errors"
  }
}
```

You can also supply a filter as the first argument

``` js
var zpool = require('zpool');
zpool.status('rpool', function(err, list, out) {
  // list => an object rpool
  // out => the raw output from `zpool status rpool`
  console.dir(list);
});
```

yields

``` json
{
  "pool": "rpool",
  "state": "ONLINE",
  "scan": "scrub repaired 0 in 0h14m with 0 errors on Tue Apr 16 18:35:09 2013",
  "config": [
    "config:",
    "STATE     READ WRITE CKSUM",
    "ONLINE       0     0     0",
    "ONLINE       0     0     0"
  ],
  "errors": "No known data errors"
}
```

License
-------

MIT License
