
import ImageBuilder from './lib/image-builder'
import Web3DataReader from './lib/web3-reader'

const imageBuilder = new ImageBuilder()
const web3Reader = new Web3DataReader()

setInterval( web3Reader.run , 8000 );
 
setInterval( imageBuilder.run , 8000 );

console.log('Booting Teller Options Image Bot')
