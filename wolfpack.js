
const Web3 = require('web3')

const web3Config = require('./config/web3config')
const WolfPack = require('wolfpack')

async function init(){
    let web3 = new Web3( web3Config.web3provider  )

    let wolfPackConfig = {
        contracts:[{address:"0x39ec448b891c476e166b3c3242a90830db556661", startBlock: 4465713, type:'ERC721'},
                        {address:"0x7cea7e61f8be415bee361799f19644b9889713cd", startBlock: 4528636, type:'ERC721'}],
            
        suffix:"dev",
        indexRate: 10*1000,
        courseBlockGap: 8000,
        logging:true,
        reScale: false
    }
    
    let wolfPack = new WolfPack()
    await wolfPack.init( {suffix: wolfPackConfig.suffix} )
    wolfPack.startIndexing( web3, wolfPackConfig )  
    
}


init()