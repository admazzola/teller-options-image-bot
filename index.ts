
import ImageBuilder from './lib/image-builder'
import Web3Reader from './lib/web3-reader'

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

try{
    fs.mkdirSync(path.resolve(__dirname, './generatedimages'))
}catch(e){}

async function start(){

    let mongoInterface = new MongoInterface()
    await mongoInterface.init('wolfpack_dev',{})
    
    const imageBuilder = new ImageBuilder()
    const web3Reader = new Web3Reader(mongoInterface)

    web3Reader.init()
     
     
    setInterval( imageBuilder.run , 8000 );
    
    console.log('Booting Teller Options Image Bot')
    
}


start()