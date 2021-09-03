import MongoInterface from "./mongo-interface";

var mongoInterface:MongoInterface;
var optionIdToRead = 0;  

export default class Web3Reader{

    constructor(mInterface:MongoInterface){
        mongoInterface = mInterface;
        console.log('meep',mongoInterface)
    }


    async run(){
        console.log('run web3 readerss ', mongoInterface)


        let optionData = await mongoInterface.findOption( {optionId: optionIdToRead} )

        console.log('optionData',optionData)


    }


}