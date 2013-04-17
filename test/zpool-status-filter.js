var zpool = require('../');
var filter = process.argv[2] || 'rpool';

zpool.status(filter, function(err, list) {
  if (err) throw err;
  console.log(JSON.stringify(list, null, 2));
});
