var exec = require('exec');
var strsplit = require('strsplit');

// zpool list fields
var LIST_FIELDS = [
  'name',
  'size',
  'alloc',
  'free',
  'expandsz',
  'cap',
  'dedup',
  'health',
  'altroot'
];

module.exports.list = list;
module.exports.health = health;
module.exports.status = status;

/**
 * zpool list
 */
function list(filter, cb) {
  if (typeof filter === 'function') {
    cb = filter;
    filter = null;
  }

  var cmd = ['zpool', 'list', '-H', '-o'];
  cmd.push(LIST_FIELDS.join(','));
  if (filter) cmd.push(filter);

  exec(cmd, function(err, out, code) {
    if (err || code) {
      var e = new Error(err);
      e.code = code;
      cb(e);
      return;
    }

    var ret = {};
    out.trim().split('\n').forEach(function(line) {
      var s = strsplit(line);
      var name = s[0];
      ret[name] = {};
      for (var i = 1; i < LIST_FIELDS.length; i++) {
        ret[name][LIST_FIELDS[i]] = s[i] === '-' ? null : s[i];
      }
    });
    if (filter) ret = ret[filter];
    cb(null, ret, out);
  });
}

/**
 * zpool status -x
 */
function health(cb) {
  var cmd = ['zpool', 'status', '-x'];
  exec(cmd, function(err, out, code) {
    if (err || code) {
      var e = new Error(err);
      e.code = code;
      cb(e);
      return;
    }

    cb(null, out.trim());
  });
}

/**
 * zpool status
 */
function status(filter, cb) {
  if (typeof filter === 'function') {
    cb = filter;
    filter = null;
  }

  var cmd = ['zpool', 'status'];
  if (filter) cmd.push(filter);

  exec(cmd, function(err, out, code) {
    if (err || code) {
      var e = new Error(err);
      e.code = code;
      cb(e);
      return;
    }

    var ret = {};
    var currecord, curkey;
    out.trim().split('\n').forEach(function(line) {
      if (!line) return;
      line = line.trim();
      var s = strsplit(line, undefined, 2);
      var key = s[0];

      if (key === 'pool:') {
        currecord = s[1];
        ret[currecord] = {};
      }
      if (key.slice(-1) === ':') {
        curkey = key.slice(0, key.length - 1);
      }

      var value = s[1] || line;
      var oldvalue = ret[currecord][curkey];
      if (!oldvalue) {
        ret[currecord][curkey] = value;
      } else if (typeof oldvalue === 'string') {
        var o = [oldvalue, value];
        ret[currecord][curkey] = o;
      } else {
        ret[currecord][curkey].push(value);
      }
    });
    if (filter) ret = ret[filter];
    cb(null, ret, out);
  });
}
