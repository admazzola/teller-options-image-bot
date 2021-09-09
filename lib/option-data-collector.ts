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


var wolfpackMongoInterface:MongoInterface
var imageProcessingMongoInterface:MongoInterface
var optionIndexToRead = 0

 
var optionsCount:Number = 0;

  
    
 
export default class ImageProcessor{

    constructor(wpMongoInterface:MongoInterface,ipMongoInterface:MongoInterface){
        wolfpackMongoInterface = wpMongoInterface
        imageProcessingMongoInterface = ipMongoInterface
    }
 

    async init(){
        await this.updateOptionsCount()
        setInterval( this.updateOptionsCount , 30000 );
        setInterval( this.run.bind(this) , 8000 )
    }


    async updateOptionsCount( ){
         
        let TellerOptionsContract = new web3.eth.Contract(TellerOptionsABI, web3config.tellerOptionsContractAddress )
        optionsCount = await TellerOptionsContract.methods.optionsCount().call()

         
    }


    async run(){

        console.log('options count', optionsCount )

        if(optionsCount == 0)return;

        
        console.log('optionIndexToRead', optionIndexToRead )


        let existingOptionData = await wolfpackMongoInterface.findOption( {optionId: optionIndexToRead} )

        if(!existingOptionData){
            optionIndexToRead = 0
            return 
        }

        console.log('existingOptionData', existingOptionData )


        //copy the options data to our local collection 
        let matchingOptionData = await imageProcessingMongoInterface.findOption( {optionId: optionIndexToRead} )
       
        if(!matchingOptionData){
            await imageProcessingMongoInterface.insertOption( existingOptionData ) 
        }

      

        //let optionData = optionsMissingData[optionIndexToRead] // await mongoInterface.findOption( {optionId: optionIndexToRead} )
  

        if(existingOptionData){

            let optionId = existingOptionData.optionId
           
            try{
                let optionsContract = new web3.eth.Contract(TellerOptionsABI, web3config.tellerOptionsContractAddress )
 
                let bundleData = await optionsContract.methods.bundleOf( optionId ).call()
                
                console.log(bundleData) 


                let nftContractAddress = bundleData.addresses[0]
                let nftTokenId = bundleData.ids[0]

                let existingRow = imageProcessingMongoInterface.findOption( {optionId: optionId} )
                
                if(!existingRow){
                    await imageProcessingMongoInterface.insertOption( {optionId: optionId, nftContractAddress:nftContractAddress, nftTokenId:nftTokenId} )
                } 
              
            }catch(e){
                console.error(e)
            } 
        
        }

        
        optionIndexToRead+=1;
        if(optionIndexToRead >= optionsCount){
            optionIndexToRead = 0
        } 
       


    }

    


}