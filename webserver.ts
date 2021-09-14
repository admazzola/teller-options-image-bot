const express = require('express');
const app = express();
const PORT = 3000;
 
app.use('images',express.static('dist/finaltokenimages'));
app.use('metadata',express.static('dist/finaltokenmetadata'));

app.use('/static', express.static('public'))

app.listen(PORT);
console.log(`Serving static files at port ${PORT}.`)