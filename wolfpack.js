
const Web3 = require('web3')

const web3Config = require('./config/web3config')
const WolfPack = require('wolfpack')

const IndexerTellerOptions = require('./IndexerTellerOptions')
const TellerOptionsABI = require('./abi/TellerOptionsABI')

async function init(){
    let web3 = new Web3( web3Config.web3provider  )

    let wolfPackConfig = {
        contracts:[{
            address:"0x145ca117C3030bC6019532b410AEa31174791b97",
            startBlock:   9257224, type:'TellerOptions'
            }],
        suffix:"dev",
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
    console.log('meeeep')
    let wolfPack = new WolfPack()
    await wolfPack.init( {suffix: wolfPackConfig.suffix} )
    wolfPack.startIndexing( web3, wolfPackConfig )  
    
}


init()