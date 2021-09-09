
import OptionDataCollector from './lib/option-data-collector'

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

    let wolfpackMongoInterface = new MongoInterface()
    await wolfpackMongoInterface.init('wolfpack_dev',{})

    let imageProcessingMongoInterface = new MongoInterface()
    await imageProcessingMongoInterface.init('image_bot_dev',{})
    
    const optionDataCollector = new OptionDataCollector(wolfpackMongoInterface, imageProcessingMongoInterface )
    optionDataCollector.init() 
    
    const imageProcessor = new ImageProcessor(imageProcessingMongoInterface)
    imageProcessor.init()
     
      
    console.log('Booting Teller Options Image Bot')
    
}


start()