# FastScan
FastScan is a rate adaptation algorithm for ABR video streaming.

Note that you need to run bandwidth shaping to shape the bandwidth according to your traces in a separate script.

We would like to acknowledge [Xiaoqi Yin](https://www.linkedin.com/in/xiaoqi-yin-77393427/) who provided us with the base code that includes dash.js, their proposed rate adaptation scheme described in their paper ["A Control-Theoretic Approach for Dynamic Adaptive Video Streaming over HTTP"](https://dl.acm.org/citation.cfm?id=2787486), and other rate adaptation schemes.

We modified the AbrController.js to include our rate adaptation scheme (FastScan).  
The implementation can be found in [dash_player/app/js/streaming/algo/bfAlgo.js](dash_player/app/js/streaming/algo/bfAlgo.js).

For details, refer to our paper ["FastScan: Robust Low-Complexity Rate Adaptation Algorithm for Video Streaming over HTTP"](https://arxiv.org/abs/1806.02803), which can be cited as follows:
```
@article{elgabli2018fastscan,
  title={FastScan: Robust Low-Complexity Rate Adaptation Algorithm for Video Streaming over HTTP},
  author={Elgabli, Anis and Aggarwal, Vaneet},
  journal={arXiv preprint arXiv:1806.02803},
  year={2018}
}
```

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
2. Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your web browser
