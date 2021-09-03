 
import  {FilterQuery, Mongoose, Document} from 'mongoose'; 
import { UnknownType } from 'typechain';
 
let mongoose = new Mongoose()

const Schema = mongoose.Schema;
 
/*
const NonFungibleToken = new Schema({ 
  tokenId: Number,
  contractAddress: String,
  hasCachedImage: Boolean,
  TokenURI: String,
  cachedMetadata: Object
});*/

const TellerOption = new Schema({
  optionId: Number,
  nftTokenId: Number,
  status: String,
  creator: String,
  nftContractAddress: String
})


const TellerOptionsModel = mongoose.model('teller_options', TellerOption);

export default class MongoInterface  {
 


    constructor( ){
      
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

      

      if(dbName == null)
      {
        console.log('WARNING: No ServerMode Specified')
        dbName = "wolfpack_dev"
      }

      let url = "mongodb://"+host+":"+port+"/"+dbName

      //let options = { useUnifiedTopology: true   }

      
 
      await   mongoose.connect(url,{  }) 


      console.log('connected to ', url, dbName )
   

    }
 

    async findOption(filter: FilterQuery<UnknownType>|undefined ) : Promise< any > {
       const instance = await TellerOptionsModel.findOne(filter );
     //console.log(instance.my.key);  // 'hello'

      return instance;
    }

    async saveOption( ){
      
    }
    


    
     getMongoClient()
     {
       return mongoose;
     }



}
