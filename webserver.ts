const express = require('express');
const app = express();
const PORT = 3000;
 
app.use(express.static('dist/formattedimages'));


app.listen(PORT);
console.log(`Serving static files at port ${PORT}.`)