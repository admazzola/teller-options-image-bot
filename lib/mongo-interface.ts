 
import  {FilterQuery, Mongoose, Document, UpdateQuery, Query, AnyKeys} from 'mongoose'; 
import { UnknownType } from 'typechain';
 
let mongoose = new Mongoose()

const Schema = mongoose.Schema;
 
 
const OptionSchema = new Schema({
  optionId: Number,
  nftTokenId: Number,
  status: String,
  creator: String,
  nftContractAddress: String,
  imageUpdateAttemptedAt: {
    type: Number,
    required: false},
  imageLastUpdatedAt: {
    type: Number,
    required: false} 
})


const OptionsModel = mongoose.model('nifty_options', OptionSchema);

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
 

    async findOption(query: FilterQuery<UnknownType>|undefined ) : Promise< any > {
       const instance = await OptionsModel.findOne(query );
      
      return instance;
    }

    async findManyOptions(query: FilterQuery<UnknownType> ) : Promise< any > {
      const instance = await OptionsModel.find(query);
     
     return instance;
   }



    async updateOption(query: FilterQuery<UnknownType>|undefined ,update: UpdateQuery<UnknownType>|undefined ) : Promise< any > {
      const instance = await OptionsModel.findOneAndUpdate(query,update);
      console.log('update', instance)
     return instance;
   }

   async insertOption(doc?: (AnyKeys<unknown> )) : Promise< any > {
    const instance = new OptionsModel( doc )
    await instance.save()
    console.log('update', instance)
   return instance;
 }

   async updateManyOptions(query: FilterQuery<UnknownType>|undefined ,update: UpdateQuery<UnknownType>|undefined ) : Promise< any > {
    const instance = await OptionsModel.updateMany(query,update);
    console.log('update', instance)
    return instance;
  }


  async deleteManyOptions(query: FilterQuery<UnknownType>|undefined  ) : Promise< any > {
    const instance = await OptionsModel.deleteMany(query);
    console.log('update', instance)
    return instance;
  }
 

 



}
