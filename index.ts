
import OptionDataCollector from './lib/option-data-collector'

import ImageProcessor from './lib/image-processor'

import MongoInterface from './lib/mongo-interface'

import AppHelper from './lib/app-helper'

const web3ConfigJson = require('./config/web3config')

var web3Config:any;

const path = require('path');
const fs = require('fs');

//generate folders for downloaded metadata assets 

try{
    fs.mkdirSync(path.resolve(__dirname, './dist'))
}catch(e){}

try{
    fs.mkdirSync(path.resolve(__dirname, './dist/tokenassets'))
}catch(e){} 
 
try{
    fs.mkdirSync(path.resolve(__dirname, './dist/finaltokenmetadata'))
}catch(e){}

try{
    fs.mkdirSync(path.resolve(__dirname, './dist/finaltokenimages'))
}catch(e){}





export default class ImageBot {

    async start(){

        web3Config = web3ConfigJson[AppHelper.getEnvironmentName()]
  
        let mongoInterface = await this.connectToMongo(web3Config)
        
        const optionDataCollector = new OptionDataCollector(web3Config, mongoInterface)
        optionDataCollector.init() 
        
        const imageProcessor = new ImageProcessor(web3Config, mongoInterface)
        imageProcessor.init()
         
          
        console.log(`Booting Options Image Bot - ${AppHelper.getEnvironmentName()}`)
        
    }



    async connectToMongo( w3config:any ){
        const mongoConfig = {
            host: web3Config.dbURI,
            port: parseInt(web3Config.dbPort)
        }

        let mongoInterface = new MongoInterface()
        await mongoInterface.init(web3Config.dbName,mongoConfig)

        return mongoInterface
    }
 


}

const bot = new ImageBot()
bot.start()
 