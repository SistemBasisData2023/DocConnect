const Pool = require('pg').Pool;

// Connect to database
const pool = new Pool({
  user: 'suhailialeeee',
  host: 'ep-mute-scene-183386.ap-southeast-1.aws.neon.tech',
  database: 'docconnect',
  password: '2MyFK8NibXAV',
  port: 5432,
  ssl: require,
});

module.exports = pool;