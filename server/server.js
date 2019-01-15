const app = require('./app');
const path = require('path');
const { connectMongoose } = require('./db/mongoose');

connectMongoose();

const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening on port ${port}`));
