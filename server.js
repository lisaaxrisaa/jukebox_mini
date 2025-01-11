const express = require('express');
const app = express();
const PORT = 3001;
app.use(express.json());

app.use('/users', require('./UserPlaylist'));

app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});
