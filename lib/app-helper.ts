

export default class AppHelper {


    static getEnvironmentName(){

        if(process.env.NODE_ENV == 'staging'){
            return 'staging'
        }

        if(process.env.NODE_ENV == 'test'){
            return 'test'
        }

        return 'production'
    }

}