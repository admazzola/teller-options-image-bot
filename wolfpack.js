
const Web3 = require('web3')

const web3Config = require('./config/web3config')
const WolfPack = require('wolfpack')

const IndexerTellerOptions = require('./IndexerTellerOptions')
const TellerOptionsABI = require('./abi/TellerOptionsABI')

async function init(){
    let web3 = new Web3( web3Config.web3provider  )

    let wolfPackConfig = {
        contracts:[{address:"0xf560000371595a1c786e96b9d9ae21a5147dba31", startBlock: 9190406, type:'TellerOptions'} ],
        suffix:"dev",
        indexRate: 10*1000,
        courseBlockGap: 8000,
        logging:true,
        reScale: false,
        customIndexers:[{ type:'TellerOptions', abi: TellerOptionsABI ,  handler: IndexerTellerOptions  }]
    }
    
    let wolfPack = new WolfPack()
    await wolfPack.init( {suffix: wolfPackConfig.suffix} )
    wolfPack.startIndexing( web3, wolfPackConfig )  
    
}


init()