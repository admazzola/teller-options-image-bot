import MongoInterface from "./mongo-interface";

import Web3 from 'web3'

const fs = require('fs');
const path = require('path');
const axios = require('axios');

import Jimp = require('jimp');
 

const web3config = require('../config/web3config')
const TellerOptionsABI = require('../abi/TellerOptionsABI')
const ERC721ABI = require('../abi/ERC721ABI')

const web3 = new Web3(web3config.web3provider)


var mongoInterface:MongoInterface;
var optionIdToRead = 0;  
var optionsCount:Number = 0;


export default class Web3Reader{

    constructor(mInterface:MongoInterface){
        mongoInterface = mInterface;
        
    }

    async updateOptionsCount( ){
         
        let TellerOptionsContract = new web3.eth.Contract(TellerOptionsABI, web3config.tellerOptionsContractAddress )
        optionsCount = await TellerOptionsContract.methods.optionsCount().call()

         
    }

    async init(){
        await this.updateOptionsCount()
        setInterval( this.updateOptionsCount , 30000 );
        setInterval( this.run.bind(this) , 8000 );
    }


    async run(){
        console.log('run web3 reader ', mongoInterface)


        let optionData = await mongoInterface.findOption( {optionId: optionIdToRead} )

       

        console.log('optionData',optionData)



        if(optionData){
           
            try{
                let NFTContract = new web3.eth.Contract(ERC721ABI, optionData.nftContractAddress )
                let tokenURI = await NFTContract.methods.tokenURI( optionData.nftTokenId ).call()
                
                console.log(tokenURI)
    
                let filePath = path.resolve(__dirname,  '../tokenassets',optionIdToRead.toString().concat('.json'))
    
            
                //add tokenURI to the option record in mongo 
                await this.downloadAsset(tokenURI, filePath   )

                let metadataFile =fs.readFileSync(filePath);
                let metadataParsed = JSON.parse(metadataFile);

                let imagePath =  path.resolve(__dirname,  '../tokenassets',optionIdToRead.toString().concat('.jpg'))
                await this.downloadAsset(metadataParsed.image, imagePath   )

                let tellerBorderImagePath = path.resolve(__dirname,  '../tellerassets', 'TellerOptionsOverlay'.concat('.png'))

                Jimp.read(tellerBorderImagePath)
                    .then(tellerBorder => {
                        Jimp.read(imagePath)
                        .then(image => {
                            let formattedImagePath = path.resolve(__dirname,  '../formattedimages',optionIdToRead.toString().concat('.jpg'))
    
                            return image
                            
                            .contain(512, 512, Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP)
                            //.quality(90) // set JPEG quality 
                            .composite( tellerBorder,0,0)   
                            .write(formattedImagePath); // save
                        })
                        .catch(err => {
                            console.error(err);
                        });

                    }) .catch(err => {
                        console.error(err);
                    });

               


            }catch(e){
                console.error(e)
            } 
        
        }


        optionIdToRead+=1;
        if(optionIdToRead >= optionsCount){
            optionIdToRead = 0
        }
       


    }

    async downloadAsset(url:string,image_path:string):Promise<any> {

       //  const path = path.resolve(__dirname, 'images', 'code.jpg')
        const writer = fs.createWriteStream(image_path)
      
        const response = await axios({
          url,
          method: 'GET',
          responseType: 'stream'
        })
      
        response.data.pipe(writer)
      
        return new Promise((resolve, reject) => {
          writer.on('finish', resolve)
          writer.on('error', reject)
        })


    }

   


}