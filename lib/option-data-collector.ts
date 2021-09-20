import MongoInterface from "./mongo-interface";

import Web3 from 'web3'

const fs = require('fs');
const path = require('path');
const axios = require('axios');

import Jimp = require('jimp');
 
var web3config: any; 

//const web3config = require('../config/web3config')
const TellerOptionsABI = require('../abi/TellerOptionsABI')
const ERC721ABI = require('../abi/ERC721ABI')

var web3: Web3 


var mongoInterface:MongoInterface;
var optionIndexToRead = 0;  
 
export default class ImageProcessor{

    constructor(w3config:any, mInterface:MongoInterface){
        web3config = w3config;
        mongoInterface = mInterface;
        web3 = new Web3(web3config.web3provider)
    }
 

    async init(){
       
        setInterval( this.run.bind(this) , 8000 );
    }


    async run(){
        
        
        
        let optionsMissingData = await mongoInterface.findManyOptions( {  nftContractAddress: { $exists: false }  }  )
     
        if(optionsMissingData[optionIndexToRead] === 'undefined'){
            optionIndexToRead = 0
            return 
        }

        let optionData = optionsMissingData[optionIndexToRead] // await mongoInterface.findOption( {optionId: optionIndexToRead} )

         

        if(optionData){
           
            try{
                let optionsContract = new web3.eth.Contract(TellerOptionsABI, web3config.tellerOptionsContractAddress )
 
                let bundleData = await optionsContract.methods.bundleOf( optionData.optionId ).call()
                
                console.log(bundleData) 


                let nftContractAddress = bundleData.addresses[0]
                let nftTokenId = bundleData.ids[0]
                 
                await mongoInterface.updateOption( {optionId: optionData.optionId}, {nftContractAddress:nftContractAddress, nftTokenId:nftTokenId} )

              

            }catch(e){
                console.error(e)
            } 
        
        }

        
        optionIndexToRead+=1;
        if(optionIndexToRead >= optionsMissingData.length){
            optionIndexToRead = 0
        } 
       


    }

    


}