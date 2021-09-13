var assert = require('assert');
var chai = require('chai');  

const web3Config = require('../config/web3config')
const expect = chai.expect;


import ImageBot from '../index'


describe('MongoDB', function() {
  
    it('can connect to MongoDB', async function() {
  
        let bot = new ImageBot()

        let mongoInterface = await bot.connectToMongo( web3Config )
          
        expect(mongoInterface).to.exist 

    });
   
});