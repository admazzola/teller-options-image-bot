
import OptionDataCollector from './lib/option-data-collector'

import ImageProcessor from './lib/image-processor'

import MongoInterface from './lib/mongo-interface'

const web3Config = require('./config/web3config')

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

    const mongoConfig = {
        host: web3Config.dbURI,
        port: parseInt(web3Config.dbPort)
    }

    let mongoInterface = new MongoInterface()
    await mongoInterface.init(web3Config.dbName,mongoConfig)
    
    const optionDataCollector = new OptionDataCollector(mongoInterface)
    optionDataCollector.init() 
    
    const imageProcessor = new ImageProcessor(mongoInterface)
    imageProcessor.init()
     
      
    console.log('Booting Teller Options Image Bot')
    
}


start()