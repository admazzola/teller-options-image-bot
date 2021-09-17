
const Web3 = require('web3')

 
const WolfPack = require('wolfpack')

const web3ConfigJson = require('./config/web3config')

var web3Config:any;


import AppHelper from './lib/app-helper'



const IndexerNiftyOptions = require('./lib/IndexerNiftyOptions')
const NiftyOptionsABI = require('./abi/NiftyOptionsABI')

async function init(){

    console.log(`Booting Wolfpack Web3 Event Collector - ${AppHelper.getEnvironmentName()}`)
     

    web3Config = web3ConfigJson[AppHelper.getEnvironmentName()]
  

    let web3 = new Web3( web3Config.web3provider  )
     
    let wolfPackConfig = {  
        contracts:[{
            address: web3Config.niftyOptionsContractAddress,
            startBlock:   web3Config.niftyOptionsContractStartBlock,
            type:'NiftyOptions'
            }],
         
        dbName: web3Config.dbName,
        url: web3Config.dbURI,
        port: parseInt(web3Config.dbPort),
        indexRate: 10*1000,
        courseBlockGap: 8000,
        logging:true,
        reScale: false,
        customIndexers:[{
            type:'NiftyOptions', 
            abi: NiftyOptionsABI ,  
            handler: IndexerNiftyOptions 
         }]
    }
  
    let wolfPack = new WolfPack()
    await wolfPack.init( wolfPackConfig )
    wolfPack.startIndexing( web3, wolfPackConfig )  
    
}


init()