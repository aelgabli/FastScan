# FastScan
FastScan is a rate adaptation algorithm for ABR video streaming. Note that, you need to run bandwidth shaping to shape the bandwidth according to your traces in a seperate script.
We would like to Acknowledge Xiaoqi Yin who provided us with the base code that includes both dash.js and their proposed rate adaptation scheme described in their paper titled A Control-Theoretic Approach for Dynamic Adaptive Video Streaming over HTTP, and other rate adaptation schemes. We modified the AbrController.js to include our rate adaptation scheme (FastScan). The main file's path of fastScan is dash_player/app/js/streaming/algo/bfAlgo.js 

## Dependencies
1. install nodejs
```
$ sudo apt install nodejs
```
2. install npm
```
$ sudo apt install npm
```
3. install local-web-server
```
$ npm install -g local-web-server
```

## Quick Start
1. Run a local web server in the main folder
```
$ ws
```
2. Open http://127.0.0.1:8000 in your web browser
