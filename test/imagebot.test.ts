var assert = require('assert');
var chai = require('chai');  



const fs = require('fs');
const path = require('path');


import AppHelper from '../lib/app-helper'
import OptionDataCollector from '../lib/option-data-collector'
import ImageProcessor from '../lib/image-processor'

const web3Config = require('../config/web3config')[AppHelper.getEnvironmentName()]
const expect = chai.expect;
const should = chai.should;

should()


import ImageBot from '../index'
import MongoInterface from '../lib/mongo-interface';

import IndexerTellerOptions from '../lib/IndexerTellerOptions'

var mongoInterface:MongoInterface

describe('MongoDB', function() {
  
    it('can connect to MongoDB', async function() {
  
        let bot = new ImageBot()

         mongoInterface = await bot.connectToMongo( web3Config )
          
        expect(mongoInterface).to.exist 

    });
   
});


describe('Web3 Data Collection', function() {
  

    it('should use testing config', async function() {
  
        
        expect(AppHelper.getEnvironmentName()).to.eql('test') 


        expect(web3Config.tellerOptionsContractAddress).to.eql('0x145ca117C3030bC6019532b410AEa31174791b97')

    });

    it('can delete records', async function() {
         
        await mongoInterface.deleteManyOptions({})

        let existingOptions = await mongoInterface.findManyOptions({})

        expect(existingOptions.length).to.eql(0) 

    });


    it('can stub a new record', async function() {
         
        await mongoInterface.insertOption({ optionId:0, creator:'0xd59e99927018b995ee9ad6b9003677f1e7393f8a'} )

        let existingOptions = await mongoInterface.findManyOptions({})

        expect(existingOptions.length).to.eql(1) 

    });


    it('can collect web3 data for option', async function() {
         
        const optionDataCollector = new OptionDataCollector(web3Config, mongoInterface) 

        await optionDataCollector.run() 

        let existingOption = await mongoInterface.findOption({optionId: 0 })
        
        expect(existingOption.nftContractAddress).to.eql('0xc981faC0275727ce45E503D6a748192Bb084ef24') 
        expect(existingOption.nftTokenId).to.eql(4) 
 

    });


    it('can collect image uri data', async function() {
         
        const imageProcessor = new ImageProcessor(web3Config, mongoInterface) 

        await imageProcessor.run() 

        let existingOption = await mongoInterface.findOption({optionId: 0 })

        let formattedImagePath = path.resolve(__dirname,  '../dist/finaltokenimages',existingOption.optionId.toString().concat('.jpg'))
        
        let savedFormattedImage = fs.readFileSync(formattedImagePath);
        
        savedFormattedImage.should.exist 
        
    });


   
});