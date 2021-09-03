 
import * as Mongoose from 'mongoose'; 
import { UnknownType } from 'typechain';
 

const Schema = Mongoose.Schema;
 
const NonFungibleToken = new Schema({ 
  tokenId: Number,
  contractAddress: String,
  hasCachedImage: Boolean,
  TokenURI: String,
  cachedMetadata: Object
});


const TellerOptionsModel = Mongoose.model('TellerOptions', NonFungibleToken);

export default class MongoInterface  {
 


    constructor(dbName:string,config:any){
      if(dbName){
        this.init(dbName,config)
      }
    }

    async init( dbName:string,config:any )
    {

      
      let host = 'localhost'
      let port = 27017

      if(config && config.url)
      {
        host = config.url
      }
      if(config && config.port)
      {
        port = config.port
      }

      let url = "mongodb://"+host+":"+port

      if(dbName == null)
      {
        console.log('WARNING: No ServerMode Specified')
        dbName = "outerspace"
      }

      //let options = { useUnifiedTopology: true   }

      
 

      var database = await new Promise((resolve, reject) => {
          Mongoose.connect(url,{
          
          }) 

         // if(config && config.apiMode == true) return //do not make indexes if api mode
          resolve(true)
        
        //set up database constraints to prevent data corruption
        //await this.createCollectionUniqueIndexes()
      });

    }
 

    async findOptionToken(filter: Mongoose.FilterQuery<UnknownType>|undefined ) : Promise< Mongoose.Document<any,any,unknown>|null > {
       const instance = await TellerOptionsModel.findOne(filter );
     //console.log(instance.my.key);  // 'hello'

      return instance;
    }

    async saveOptionToken( ){
      
    }
    


    
     getMongoClient()
     {
       return Mongoose;
     }



}
