# pixi-to-web
## Build
* browserify public/javascripts/startpixi.js -o public/bundle.js
* I used webstorm so if you are in WS, just run and the node server will serve @ <ip>:3000
## Controls
* All done in compiled code, too bad, just a perf test hack
* numSprites = <number of actively moving sprites>
* singleBunny = false => do multiple posters
* useTicker = false to use RAF, true to use app.ticker callback
  * RAF seems more performant
## Tested on
* MacBook
* LG Smart TV
