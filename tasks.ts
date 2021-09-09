
 import MongoInterface from './lib/mongo-interface'
 
const web3Config = require('./config/web3config')

async function tasks(){

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
    console.log('rebuilding images ')

    await mongoInterface.updateManyOptions( {}, {$set:{imageUpdateAttemptedAt:null, imageLastUpdatedAt:null}} )



}

tasks()


