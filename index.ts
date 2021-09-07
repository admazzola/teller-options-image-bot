
 
import ImageProcessor from './lib/image-processor'

import MongoInterface from './lib/mongo-interface'

const path = require('path');
const fs = require('fs');

//generate folders for downloaded metadata assets 
try{
    fs.mkdirSync(path.resolve(__dirname, './tokenassets'))
}catch(e){}

try{
    fs.mkdirSync(path.resolve(__dirname, './formattedimages'))
}catch(e){}

 

async function start(){

    let mongoInterface = new MongoInterface()
    await mongoInterface.init('wolfpack_dev',{})
    
    
    const imageProcessor = new ImageProcessor(mongoInterface)

    imageProcessor.init()
     
     
   
    
    console.log('Booting Teller Options Image Bot')
    
}


start()