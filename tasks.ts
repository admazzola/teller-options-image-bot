
 import MongoInterface from './lib/mongo-interface'
 
import AppHelper from './lib/app-helper'

 const web3ConfigJson = require('./config/web3config')

var web3Config:any;


async function tasks(){

    web3Config = web3ConfigJson[AppHelper.getEnvironmentName()]
  


    var args = process.argv.slice(2);

    let mongoInterface = new MongoInterface()
    await mongoInterface.init(web3Config.dbName,{})
     
    if(!args[0]){
        console.log('Unable to run task: ',args[0])
    }


    let taskToRun = args[0].toLowerCase()

    switch(taskToRun){
        case 'rebuild-images': rebuildImages(mongoInterface)
    }
    
}

async function rebuildImages(mongoInterface:MongoInterface){
    console.log(`Task - Rebuild Images - ${AppHelper.getEnvironmentName()}`)
      

    await mongoInterface.updateManyOptions( {}, {$set:{imageUpdateAttemptedAt:null, imageLastUpdatedAt:null}} )



}

tasks()


