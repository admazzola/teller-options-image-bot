const express = require('express');
const app = express();
const PORT = 3000;
 
app.use('/image/',express.static('dist/finaltokenimages'));
app.use('/metadata/token/',express.static('dist/finaltokenmetadata'));
 

app.listen(PORT);
console.log(`Serving static files at port ${PORT}.`)