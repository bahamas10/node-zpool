var zpool = require('../');

zpool.list(function(err, list) {
  if (err) throw err;
  console.log(JSON.stringify(list, null, 2));
});
