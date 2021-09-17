## Nifty Options Image Bot

Generates image files for options NFTs.  This repo contains 2 separate services. 

1.  Using the command 'yarn wolfpack' will start a service which will continuously collect events from the Options contract (specified in config/web3config.json) and will then store those records in MongoDB 

2.  Using the command 'yarn start' will start a separate service which will monitor MongoDB records in order to fetch the corresponding image files from the NFT metadata URIs.   This service downloads those images, automatically scales and overlays the image with a custom overlay template, and re-saves the images inside of 'dist/formattedimages.'

It is then the responsibility of dev-ops to use NGINX or another service to host the 'dist/formattedimages' folder as a folder of static assets that will be public facing. 


#### Getting Started 

Set up configuration in config/web3config.json 




#### Commands 
`
yarn install 
`

`
yarn build 
`

`
yarn start 
`


(in another terminal)

Continuously populate the mongo db with options from web3

`
yarn wolfpack      
`



(in another terminal)

Serve the images that have been generated 

`
yarn webserver      
`


####

Rinkeby Options 
0x145ca117C3030bC6019532b410AEa31174791b97 


 
### Tasks 

Clear the cache for images so they all get rebuilt 
`
npm run task rebuild-images 
`
 