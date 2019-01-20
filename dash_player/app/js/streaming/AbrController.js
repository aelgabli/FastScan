/*
 * The copyright in this software is being made available under the BSD License, included below. This software may be subject to other third party and contributor rights, including patent rights, and no such rights are granted under this license.
 * 
 * Copyright (c) 2013, Digital Primates
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * •  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * •  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * •  Neither the name of the Digital Primates nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
MediaPlayer.dependencies.AbrController = function() {
    "use strict";

    var autoSwitchBitrate = true,
        qualityDict = {},
        confidenceDict = {},
        //Xiaoqi
        oldQuality = 0,
        chunkCount = 0,
        lastRequested = -1, // Xiaoqi_new
        lastQuality = -1,
        //Xiaoqi
        // Xiaoqi_new
        bufferLevelLog = [0],
        bitrateArray = [350, 600, 1000, 2000, 3000],
        reservoir = 4,
        cushion = 12,
        p_rb = 1,
        // p_rb = 0.85,
        bufferLevelAdjusted = 0,
        // Xiaoqi_new
        // Xiaoqi: Visual
        fixedQualityArray = [],

        // Xiaoqi: Visual

        // Anis BinPacking Variables
        sc = 1,
        st = 1,
        bfVar = { d: [], deadline: [], I0: [], X: [], X_0: [], X_1: [], X_2: [], X_3: [], X_4: [], x: [], ft: [], s: 1, L: 4, C: 64, Bm: 60, W: 5 },
        bfLayerQuality = [1400, 2400, 4000, 8000, 12000],


        abrAlgo = 7,
        //$('#txt_log').append("inside Abr");
        // bfC = 65,
        // bfl = 4,
        // bfst = 1,
        // bfBm = 60,
        // bfLayerQuality =  [1400, 2400, 4000, 8000, 12000],
        // bfs = 1,
        // bfsc = 1,
        // bfw = 5,
        // bfd = [0 * bfC],                             
        // bfDeadline = (i-1) * bfL + s,            
        // bfx = [][],
        // bfft = [0 * bfC],
        // bfX = [0 * bfC]
        // bfX0=bfLayerQuality(0),
        // bfX1=bfLayerQuality(1),
        // bfX2=bfLayerQuality(2),
        // bfX3=bfLayerQuality(3),
        // bfX4=bfLayerQuality(4),

        getInternalQuality = function(type) {
            var quality;

            if (!qualityDict.hasOwnProperty(type)) {
                qualityDict[type] = 0;
            }

            quality = qualityDict[type];

            return quality;
        },

        setInternalQuality = function(type, value) {
            qualityDict[type] = value;
        },

        getInternalConfidence = function(type) {
            var confidence;

            if (!confidenceDict.hasOwnProperty(type)) {
                confidenceDict[type] = 0;
            }

            confidence = confidenceDict[type];

            return confidence;
        },

        setInternalConfidence = function(type, value) {
            confidenceDict[type] = value;
        };

    // Anis BinPacking Initializations
    var stAll = new Date().getTime();
    //alert("amr");

    //bfVar.d = [];
    //bfVar.deadline = [];
    //bfVar.X = [];
    //bfVar.x = []; //[[,],[,]],
    //bfVar.ft = [];
    bfVar.s = 1;
    bfVar.L = 4;
    bfVar.C = 65;
    bfVar.Bm = 60;
    bfVar.W = 5;
    for (var i = 1; i <= bfVar.C; i++) {
        //bfVar.X[i] = 0;
        bfVar.d[i] = 0;
        bfVar.deadline[i] = (i - 1) * bfVar.L + bfVar.s;
        bfVar.ft[i] = 0;
        bfVar.X_0[i] = bfLayerQuality[0];
        bfVar.X_1[i] = bfLayerQuality[1];
        bfVar.X_2[i] = bfLayerQuality[2];
        bfVar.X_3[i] = bfLayerQuality[3];
        bfVar.X_4[i] = bfLayerQuality[4];
        bfVar.X[i] = bfVar.X_0[i];
        bfVar.I0[i] = i;
    }
    for (var i = 1; i <= bfVar.C; i++) {
        for (var j = 1; j <= bfVar.C + 120; j++) {
            bfVar.x[i, j] = 0;
        }
    }


    return {
        debug: undefined,
        abrRulesCollection: undefined,
        manifestExt: undefined,
        metricsModel: undefined,
        // Xiaoqi
        metricsExt: undefined,
        // Xiaoqi_new
        fastMPC: undefined,
        bfAlgo: undefined,
        bwPredictor: undefined,
        vbr: undefined,
        // Xiaoqi_new
        // Xiaoqi_cr
        festive: undefined,
        // Xiaoqi_cr
        // Xiaoqi

        getBitrateBB: function(bLevel) {
            var self = this,
                tmpBitrate = 0,
                tmpQuality = 0;

            if (bLevel <= reservoir) {
                tmpBitrate = bitrateArray[0];
            } else if (bLevel > reservoir + cushion) {
                tmpBitrate = bitrateArray[4];
            } else {
                tmpBitrate = bitrateArray[0] + (bitrateArray[4] - bitrateArray[0]) * (bLevel - reservoir) / cushion;
            }

            // findout matching quality level
            for (var i = 4; i >= 0; i--) {
                if (tmpBitrate >= bitrateArray[i]) {
                    tmpQuality = i;
                    break;
                }
                tmpQuality = i;
            }
            self.debug.log("----------BB: tmpBitrate=" + tmpBitrate + ", tmpQuality=" + tmpQuality + ", bufferLevel=" + bLevel);
            return tmpQuality;
            // return 0;
        },

        getBitrateRB: function(bandwidth) {
            var self = this,
                tmpBitrate = 0,
                tmpQuality = 0;

            tmpBitrate = bandwidth * p_rb;

            // findout matching quality level
            for (var i = 4; i >= 0; i--) {
                if (tmpBitrate >= bitrateArray[i]) {
                    tmpQuality = i;
                    break;
                }
                tmpQuality = i;
            }
            self.debug.log("----------RB: tmpBitrate=" + tmpBitrate + ", tmpQuality=" + tmpQuality + ", bandwidth=" + bandwidth);
            return tmpQuality;
            // return 0;
        },

        getAutoSwitchBitrate: function() {
            return autoSwitchBitrate;
        },

        setAutoSwitchBitrate: function(value) {
            autoSwitchBitrate = value;
        },

        // Xiaoqi: Visual
        setAbrAlgorithm: function(algo) {
            abrAlgo = algo;
            console.log("-----VISUAL: set abrAlgo=" + abrAlgo);
        },

        setFixedBitrateArray: function(fixedBitrateArray) {
            fixedQualityArray = fixedBitrateArray;
            console.log("-----VISUAL: set fixedBitrateArray");
        },
        // Xiaoqi: Visual

        getMetricsFor: function(data) {
            var deferred = Q.defer(),
                self = this;

            self.manifestExt.getIsVideo(data).then(
                function(isVideo) {
                    if (isVideo) {
                        deferred.resolve(self.metricsModel.getMetricsFor("video"));
                    } else {
                        self.manifestExt.getIsAudio(data).then(
                            function(isAudio) {
                                if (isAudio) {
                                    deferred.resolve(self.metricsModel.getMetricsFor("audio"));
                                } else {
                                    deferred.resolve(self.metricsModel.getMetricsFor("stream"));
                                }
                            }
                        );
                    }
                }
            );

            return deferred.promise;
        },

        getPlaybackQuality: function(type, data, /*Xiaoqi*/ lastRequestedSegmentIndex, lastBufferedSegmentIndex, bufferLevel, representation /*Xiaoqi*/ ) {
            var self = this,
                deferred = Q.defer(),
                newQuality = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE,
                newConfidence = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE,
                i,
                len,
                funcs = [],
                req,
                values,
                quality,
                confidence,
                //Xiaoqi
                lastHTTPRequest,
                downloadTime,
                bitrate,
                bandwidthEst,
                //Xiaoqi_cr
                bandwidthEstError,
                //Xiaoqi_cr
                nextBitrate;
            //Xiaoqi

            quality = getInternalQuality(type);

            confidence = getInternalConfidence(type);


            //self.debug.log("ABR enabled? (" + autoSwitchBitrate + ")");
            // Xiaoqi_new
            // self.debug.log("---------FastMPC:" + self.fastMPC.getBitrate());
            // self.debug.log("---------BandwidthPredictor:" + self.bwPredictor.getBitrate());
            // self.debug.log("---------VBR:" + self.vbr.getChunkSize(0,1));
            // self.debug.log("---------VBR:" + self.vbr.getChunkSize(64,1));
            // self.debug.log("---------VBR:" + self.vbr.getChunkSize(0,2));
            // self.debug.log("---------VBR:" + self.vbr.getChunkSize(0,3));
            // self.debug.log("---------VBR:" + self.vbr.getChunkSize(0,4));
            // self.debug.log("---------VBR:" + self.vbr.getChunkSize(0,5));
            // Xiaoqi_new


            // Xiaoqi_cr
            quality = oldQuality;
            if (lastRequestedSegmentIndex === lastBufferedSegmentIndex && lastRequested === lastRequestedSegmentIndex) {
                // Xiaoqi_cr
                if (autoSwitchBitrate) {
                    //self.debug.log("Check ABR rules.");
                    self.getMetricsFor(data).then(
                        function(metrics) {
                            self.abrRulesCollection.getRules().then(
                                function(rules) {
                                    for (i = 0, len = rules.length; i < len; i += 1) {
                                        funcs.push(rules[i].checkIndex(quality, metrics, data));
                                    }
                                    Q.all(funcs).then(
                                        function(results) {
                                            //self.debug.log(results);
                                            values = {};
                                            values[MediaPlayer.rules.SwitchRequest.prototype.STRONG] = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE;
                                            values[MediaPlayer.rules.SwitchRequest.prototype.WEAK] = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE;
                                            values[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT] = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE;

                                            for (i = 0, len = results.length; i < len; i += 1) {
                                                req = results[i];
                                                if (req.quality !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE) {
                                                    values[req.priority] = Math.min(values[req.priority], req.quality);
                                                }
                                            }

                                            if (values[MediaPlayer.rules.SwitchRequest.prototype.WEAK] !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE) {
                                                newConfidence = MediaPlayer.rules.SwitchRequest.prototype.WEAK;
                                                newQuality = values[MediaPlayer.rules.SwitchRequest.prototype.WEAK];
                                            }

                                            if (values[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT] !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE) {
                                                newConfidence = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT;
                                                newQuality = values[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT];
                                            }

                                            if (values[MediaPlayer.rules.SwitchRequest.prototype.STRONG] !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE) {
                                                newConfidence = MediaPlayer.rules.SwitchRequest.prototype.STRONG;
                                                newQuality = values[MediaPlayer.rules.SwitchRequest.prototype.STRONG];
                                            }

                                            if (newQuality !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && newQuality !== undefined) {
                                                quality = newQuality;
                                            }

                                            if (newConfidence !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && newConfidence !== undefined) {
                                                confidence = newConfidence;
                                            }
                                            // Xiaoqi_cr
                                            self.debug.log("-----Original: quality: " + quality + ", confidence: " + confidence);
                                            // Xiaoqi_cr

                                            self.manifestExt.getRepresentationCount(data).then(
                                                function(max) {
                                                    // be sure the quality valid!
                                                    if (quality < 0) {
                                                        quality = 0;
                                                    }
                                                    // zero based
                                                    if (quality >= max) {
                                                        quality = max - 1;
                                                    }

                                                    if (confidence != MediaPlayer.rules.SwitchRequest.prototype.STRONG &&
                                                        confidence != MediaPlayer.rules.SwitchRequest.prototype.WEAK) {
                                                        confidence = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT;
                                                    }

                                                    // Xiaoqi_cr
                                                    var quality_original = quality;
                                                    // Xiaoqi_cr
                                                    // Xiaoqi
                                                    //currentIndex = streamProcessor.indexHandler.getCurrentIndex();
                                                    quality = oldQuality;
                                                    nextBitrate = 0;
                                                    if (lastRequestedSegmentIndex === lastBufferedSegmentIndex && lastRequested === lastRequestedSegmentIndex) {
                                                        // Bandwidth estimation
                                                        // Xiaoqi_new
                                                        //bandwidthEst = self.bwPredictor.predictBandwidth(lastRequested, metrics, 0);
                                                        //self.debug.log("----------abrController BW Predict: "+bandwidthEst);
                                                        // Xiaoqi_new
                                                        if (lastRequested >= 0 && metrics) {

                                                            lastHTTPRequest = self.metricsExt.getCurrentHttpRequest(metrics);
                                                            if (lastHTTPRequest) {
                                                                // Xiaoqi_new
                                                                // self.debug.log("----------abrController BW Predict: lastRequested="+lastRequested+", lastQuality=" + lastQuality);
                                                                // Bandwidth Prediction
                                                                bandwidthEst = self.bwPredictor.predictBandwidth(lastRequested, lastQuality, lastHTTPRequest);
                                                                // Xiaoqi_cr
                                                                // bandwidthEstError = self.bwPredictor.getPredictionError(lastRequested);
                                                                // self.debug.log("----------abrController BW Predict: " + bandwidthEst + ", Error: " + bandwidthEstError);
                                                                // // multistep prediction error                      
                                                                // bandwidthEstError = self.bwPredictor.getCombinedPredictionError(lastRequested);
                                                                // self.debug.log("----------abrController BW Predict Combined: " + bandwidthEst + ", Error: " + bandwidthEstError);
                                                                // Xiaoqi_cr
                                                                // self.debug.log("-----FastMPC:" + self.fastMPC.getBitrate(0, 0, 350));
                                                                // self.debug.log("-----FastMPC:" + self.fastMPC.getBitrate(4, 20, 3000));
                                                                // Adjust buffer level to avoid latency, etc
                                                                var baseBuffer = 4;
                                                                bufferLevelAdjusted = bufferLevel - 0.15 - 0.4 - baseBuffer;
                                                                self.debug.log("-----abrController: baseBuffer=" + baseBuffer);
                                                                // bufferLevelAdjusted = bufferLevel-0.15-0.4; // mpc_nobuffer
                                                                // bufferLevelAdjusted = bufferLevel-0.15-0.4-2; // mpc
                                                                // bufferLevelAdjusted = bufferLevel-0.15-0.4-4; // mpc
                                                                // // Fast MPC
                                                                // quality = self.fastMPC.getBitrate(lastQuality, bufferLevelAdjusted, bandwidthEst);
                                                                // self.debug.log("-----FastMPC:" + quality);
                                                                // // Robust Fast MPC
                                                                // quality = self.fastMPC.getBitrate(lastQuality, bufferLevelAdjusted, bandwidthEst/(1+bandwidthEstError));
                                                                // self.debug.log("-----Robust FastMPC:" + quality);
                                                                // // BB
                                                                // quality = self.getBitrateBB(bufferLevelAdjusted);
                                                                // self.debug.log("-----Buffer-Based:" + quality);
                                                                // // RB
                                                                // quality = self.getBitrateRB(bandwidthEst);
                                                                // self.debug.log("-----Rate-Based:" + quality);
                                                                // // Original DASH.js
                                                                // quality = quality_original;
                                                                // self.debug.log("-----ORIGINAL DASH.js:" + quality);
                                                                // FESTIVE
                                                                // quality = self.festive.getBitrate(lastQuality, bufferLevelAdjusted, bandwidthEst, lastRequested, bitrateArray);
                                                                // self.debug.log("-----FESTIVE:" + quality);
                                                                // Xiaoqi_new
                                                                // Log bufferlevel
                                                                bufferLevelLog[lastRequested + 1] = bufferLevel;
                                                                self.debug.log("-----bufferLevelLog=" + bufferLevelLog[lastRequested + 1]);

                                                                // Xiaoqi: Visual
                                                                switch (abrAlgo) {
                                                                    case 5:
                                                                        quality = fixedQualityArray[lastRequested + 1];
                                                                        if (quality === undefined) {
                                                                            quality = 0;
                                                                            console.log("fixedQualityArray, chunk after " + lastRequested + " is undefined");
                                                                        }
                                                                        break;
                                                                    case 0:
                                                                        bandwidthEstError = self.bwPredictor.getCombinedPredictionError(lastRequested);
                                                                        quality = self.fastMPC.getBitrate(lastQuality, bufferLevelAdjusted, bandwidthEst / (1 + bandwidthEstError));
                                                                        $('#txt_log').append(quality + "\n");
                                                                        break;
                                                                    case 1:
                                                                        quality = self.getBitrateBB(bufferLevelAdjusted);
                                                                        $('#txt_log').append(quality + "\n");
                                                                        break;
                                                                    case 2:
                                                                        quality = self.getBitrateRB(bandwidthEst);
                                                                        $('#txt_log').append(quality + "\n");
                                                                        break;
                                                                    case 3:
                                                                        quality = quality_original;
                                                                        $('#txt_log').append(quality + "\n");
                                                                        break;
                                                                    case 4:
                                                                        quality = self.festive.getBitrate(lastQuality, bufferLevelAdjusted, bandwidthEst, lastRequested, bitrateArray);
                                                                        $('#txt_log').append(quality + "\n");
                                                                        break;
                                                                        //case 5: quality = 5; break;
                                                                    case -1: // same as 0
                                                                        bandwidthEstError = self.bwPredictor.getCombinedPredictionError(lastRequested);
                                                                        quality = self.fastMPC.getBitrate(lastQuality, bufferLevelAdjusted, bandwidthEst / (1 + bandwidthEstError));
                                                                        $('#txt_log').append(quality + "\n");
                                                                        //$('#txt_log').append("bfLevel: " + bufferLevel + "\t");
                                                                        //$('#txt_log').append("bandwidthEst: " + bandwidthEst + "\t");
                                                                        //$('#txt_log').append("bandwidthEstError: " + bandwidthEstError + "\t");
                                                                        //$('#txt_log').append("Quality: " + quality + "\n");
                                                                        break;
                                                                    case 7: // Anis BinPacking Algorithm
                                                                        //$('#txt_log').append("before\t");
                                                                        bandwidthEstError = self.bwPredictor.getCombinedPredictionError(lastRequested);
                                                                        //ec=min(sc + W, C);
                                                                        //alert(bandwidthEstError);
                                                                        var st = Math.floor((new Date().getTime() - stAll) / 1000) + 1;
                                                                        st = Math.floor(st);
                                                                        var anis = bandwidthEst / (1 + bandwidthEstError);
                                                                        //alert(anis);
                                                                        // alert("Buffer Level: " + bufferLevel);
                                                                        //$('#txt_log').append("SC: " + sc + "\t");
                                                                        //$('#txt_log').append("St: " + st + "\t");
                                                                        //$('#txt_log').append("bfLevel: " + bufferLevel + "\t");
                                                                        //$('#txt_log').append("bandwidthEst: " + bandwidthEst + "\t");
                                                                        //$('#txt_log').append("bandwidthEstError: " + bandwidthEstError + "\t");
                                                                        //$('#txt_log').append("before calling bfAlgo" + "\n");
                                                                        quality = self.bfAlgo.getBitrate(bandwidthEst / (1 + bandwidthEstError), bfVar, bufferLevel, sc, st);
                                                                        //$('#txt_log').append("after calling bfAlgo" + "\n");
                                                                        //$('#txt_log').append("after\n");
                                                                        $('#txt_log').append(quality + "\n");
                                                                        //$('#txt_log').append(bfVar.deadline[sc] + "\n");
                                                                        // $('#txt_log').append("Quality: " + quality + "\t");
                                                                        sc = sc + 1;
                                                                        //$('#txt_log').append("SC: " + sc + "\n");
                                                                        break;
                                                                    default:
                                                                        quality = 0;
                                                                        break;
                                                                }
                                                                // switch (abrAlgo) {
                                                                // case 0: quality = 0; break;
                                                                // case 1: quality = 1; break;
                                                                // case 2: quality = 2; break;
                                                                // case 3: quality = 3; break;
                                                                // case 4: quality = 4; break;
                                                                // //case 5: quality = 5; break;
                                                                // default: break;
                                                                // }
                                                                // Xiaoqi: Visual

                                                                // Xiaoqi_new
                                                                // Xiaoqi_new
                                                                // downloadTime = (lastHTTPRequest.tfinish.getTime() - lastHTTPRequest.tresponse.getTime()) / 1000;
                                                                // // if (representation.id === "\video1") {
                                                                // //   bitrate = 3000000;
                                                                // // } else if {
                                                                // //   bitrate = 1000000;
                                                                // // }
                                                                // switch (representation.id) {
                                                                // case "video1": bitrate = 3000000; break;
                                                                // case "video2": bitrate = 2000000; break;
                                                                // case "video3": bitrate = 1000000; break;
                                                                // case "video4": bitrate = 600000; break;
                                                                // case "video5": bitrate = 349952; break;
                                                                // default: bitrate = 0;
                                                                // }
                                                                // bandwidthEst = lastHTTPRequest.mediaduration*bitrate/downloadTime/1000;
                                                                // self.debug.log("XIAOQI: abrController lastChunk="+lastRequested+", downloadTime="+downloadTime+"s, bitrate="+ bitrate+", bufferLevel="+bufferLevel+", duration="+lastHTTPRequest.mediaduration+"s, bw="+bandwidthEst+"kb/s");
                                                                // Compute nextBitrate
                                                                // // Rate-based
                                                                // nextBitrate = 0.95*bandwidthEst;
                                                                // Buffer-based
                                                                // if (bufferLevel <10) {
                                                                //  nextBitrate = 0;
                                                                // } else {
                                                                //  nextBitrate = 350 + (bufferLevel-10)/20*(3000-350);
                                                                // }
                                                            }
                                                        }
                                                        chunkCount = chunkCount + 1;
                                                        if(chunkCount == 65) {
                                                            var stt = Math.floor((new Date().getTime() - stAll) / 1000) + 1;
                                                            stt = Math.floor(stt);
                                                            $('#txt_log').append(stt);
                                                            $('#btn_save').click();
                                                        }

                                                        lastRequested = lastRequestedSegmentIndex + 1;
                                                        // if (nextBitrate<600) {
                                                        //  quality = 0;
                                                        // } else if (nextBitrate<1000) {
                                                        //  quality = 1;
                                                        // } else if (nextBitrate<2000) {
                                                        //  quality = 2;
                                                        // } else if (nextBitrate<3000) {
                                                        //  quality = 3;
                                                        // } else {
                                                        //  quality = 4;
                                                        // }
                                                        lastQuality = quality;
                                                        // //quality = oldQuality;
                                                        // if (type === "video" && chunkCount === 10){// && currentIndex === changeIndex + 7){//currentIndex < streamProcessor.indexHandler.getCurrentIndex()) {
                                                        //  if (oldQuality <= 1) {
                                                        //      quality = 4;
                                                        //  }
                                                        //  else {
                                                        //      quality = 1;
                                                        //  }
                                                        //  // oldQuality = quality; 
                                                        //  chunkCount = 0;
                                                        //  //quality = 3;
                                                        //  //currentIndex = streamProcessor.indexHandler.getCurrentIndex();
                                                        //  //changeIndex = changeIndex + 7;
                                                        //  //self.debug.log("XXX Index: "+streamProcessor.indexHandler.getCurrentIndex());
                                                        //  //self.debug.log("XXX Quality: " + quality + ", Top quality: "+topQualityIdx + ", Type: " + type);
                                                        // }

                                                    }
                                                    oldQuality = quality;
                                                    self.debug.log("XIAOQI: abrController: lastRequested=" + lastRequestedSegmentIndex + ", lastBuffered=" + lastBufferedSegmentIndex + ", chunkCount=" + chunkCount + ", quality=" + quality);
                                                    //Xiaoqi

                                                    setInternalQuality(type, quality);
                                                    //self.debug.log("New quality of " + quality);

                                                    setInternalConfidence(type, confidence);
                                                    //self.debug.log("New confidence of " + confidence);

                                                    deferred.resolve({ quality: quality, confidence: confidence });
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        }
                    );
                } else {
                    self.debug.log("Unchanged quality of " + quality);
                    deferred.resolve({ quality: quality, confidence: confidence });
                }
                // Xiaoqi_cr
            } else {
                deferred.resolve({ quality: quality, confidence: 0.5 });
            }
            // Xiaoqi_cr

            return deferred.promise;
        },

        setPlaybackQuality: function(type, newPlaybackQuality) {
            var quality = getInternalQuality(type);

            if (newPlaybackQuality !== quality) {
                setInternalQuality(type, newPlaybackQuality);
            }
        },

        getQualityFor: function(type) {
            return getInternalQuality(type);
        }
    };
};

MediaPlayer.dependencies.AbrController.prototype = {
    constructor: MediaPlayer.dependencies.AbrController
};
