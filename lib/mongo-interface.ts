 
import  {FilterQuery, Mongoose, Document, UpdateQuery, Query, AnyKeys, AnyObject, Model} from 'mongoose'; 
import { UnknownType } from 'typechain';
 
let mongoose = new Mongoose()

var db;

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
  nftContractAddress: String,
  imageUpdateAttemptedAt: Number,
  imageLastUpdatedAt: Number
})


var tellerOptionsModel:Model<unknown>//= mongoose.model('teller_options', TellerOption);

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

      
 
   //   await   mongoose.connect(url,{  }) 


      db = await mongoose.createConnection( url );
      /*db.on(`error`, console.error.bind(console, `connection error:`));
      db.once(`open`, function () {
        // we`re connected!
        console.log(`MongoDB connected on "  ${ url }`);
      });*/


        tellerOptionsModel = db.model('teller_options', TellerOption);


      console.log('connected to ', url, dbName )
   

    }
 

    async findOption(query: FilterQuery<UnknownType>|undefined ) : Promise< any > {
       const instance = await tellerOptionsModel.findOne(query );
      
      return instance;
    }

    async findManyOptions(query: FilterQuery<UnknownType> ) : Promise< any > {
      const instance = await tellerOptionsModel.find(query);
     
     return instance;
   }



    async updateOption(query: FilterQuery<UnknownType>|undefined ,update: UpdateQuery<UnknownType>|undefined ) : Promise< any > {
      const instance = await tellerOptionsModel.findOneAndUpdate(query,update);
      console.log('update', instance)
     return instance;
   }


    async insertOption( params: AnyKeys<unknown> & AnyObject ){

      const instance = new tellerOptionsModel(params) 
        
     return await instance.save() 
    }
    


    
     getMongoClient()
     {
       return mongoose;
     }



}
 
