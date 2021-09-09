
const Web3 = require('web3')

const web3Config = require('./config/web3config')
const WolfPack = require('wolfpack')

const IndexerTellerOptions = require('./IndexerTellerOptions')
const TellerOptionsABI = require('./abi/TellerOptionsABI')

async function init(){
    let web3 = new Web3( web3Config.web3provider  )

    let wolfPackConfig = {
        contracts:[{
            address: web3Config.tellerOptionsContractAddress,
            startBlock:   web3Config.tellerOptionsContractStartBlock,
            type:'TellerOptions'
            }],
         
        dbName: web3Config.dbName,
        indexRate: 10*1000,
        courseBlockGap: 8000,
        logging:true,
        reScale: false,
        customIndexers:[{
            type:'TellerOptions', 
            abi: TellerOptionsABI ,  
            handler: IndexerTellerOptions 
         }]
    }
  
    let wolfPack = new WolfPack()
    await wolfPack.init( wolfPackConfig )
    wolfPack.startIndexing( web3, wolfPackConfig )  
    
}


init()