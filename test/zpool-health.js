var zpool = require('../');

zpool.health(function(err, info) {
  if (err) throw err;
  console.log(JSON.stringify(info, null, 2));
});
