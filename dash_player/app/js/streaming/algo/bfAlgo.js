MediaPlayer.dependencies.bfAlgo = function() {
    "use strict";

    var getBitrate = function(B_h, bfVar, bfLevel, sc, st) {
        //$('#txt_log').append("SC: " + sc + "\n");
        // Initialize constants and variables needed for algorithm
        if(bfLevel <= 4.2){
            //X[sc] = bfVar.X_0[1];
            return 0;

        }
        
        var self = this,
            sumFetched = 0,
            delta = 0.000001,
            maxShift=2,
            s = bfVar.s,
            L = bfVar.L,
            C = bfVar.C,
            W = bfVar.W,
            Bm = bfVar.Bm,
            bfLayerQuality = [1400, 2400, 4000, 8000, 12000],
            d = bfVar.d,
            deadline = bfVar.deadline,
            X = [], //X_0, //bfVar.X,
            x = [], //bfVar.x,
            ft = bfVar.ft,
            I0 = bfVar.I0,
            bwLen = C + 500;


            
        for (var i = 1; i <= C; i++) {
            X[i] = bfVar.X_0[i];
        }

        for (var i = 1; i <= C; i++) {
            for (var j = 1; j <= C + 60; j++) {
                x[i, j] = 0;
            }
        }

        if(B_h < 100){
            B_h=100;

        }
        //$('#txt_log').append(bfLevel + "\n");
        //$('#txt_log').append(B_h + "\n");
        var tempValue=Math.ceil((Bm-bfLevel)/L);
        var tempValue2=Math.floor(bfLevel/L);
        //if(W > tempValue){
            //W=tempValue;
        //}
        var ec = Math.min(sc + W, C);
        deadline[sc]=st+tempValue2;
        for (var i=sc+1; i <= C; i++){
            deadline[i]=deadline[i-1]+L;
            d[i]=d[sc];
        }
        var totBw=B_h / 2;
        
        for (var i = st+1; i <= deadline[sc]; i++) {
            totBw = totBw+B_h;
            //alert(B_h);
            //alert(B[i]);
        }
        
        //$('#txt_log').append("hi from AnisbfLevel" + "\n");
       
        if(totBw < bfLayerQuality[0]){
            //for (var k = sc; k < C; k++) {
                    //d[k] = d[k] + maxShift;
                    //deadline[k] = deadline[k] + maxShift;

                //}
               // $('#txt_log').append("inside low bandwidth\n");
            return 1;
        }

        else if (sc > ec) {
            //X[sc] = bfVar.X_4[1];
            //$('#txt_log').append("inside return 4: ");
            return 4;
            //return bfVar.X[sc];
            //else if{

           // }
        } else {

            
            //$('#txt_log').append("before base forward\n");

            //BaseforwardAlgo(B_h, X, ec, d, deadline, Bm, bfLevel, sc, st, C, bwLen, x, ft);

            //$('#txt_log').append("after base forward\n");
            
            //bf.d = r[0];
            //deadline = r[1];
            //x = r[2];

            //[d, deadline, x(sc:ec,st:et)]=noSkip_forwardAlgo(B, X_0, ec, d, deadline, buf,bf,sc,st,C, videoLen);
            var et = deadline[ec];

            //alert(et);

            //for (i = sc; i <= C; i++) {
                //d[i] = d[ec];
                //deadline[i] = (i - 1) * L + s + d[ec];
            //}
            for (var i = 1; i <= C; i++) {
                X[i] = bfVar.X_0[i];
            }


            for (var i = 1; i <= C; i++) {
                for (var j = 1; j <= C + 60; j++) {
                    x[i, j] = 0;
                }
            }

            for (i = sc; i <= C; i++) {
                ft[i] = st;
            }

            //[d, deadline]=noSkip_backAlgo(B, X_0, x, ec, d, deadline, buf, bf, ft,sc,st,C);
            //BaseBackAlgo(B_h, X, x, ec, d, deadline, Bm, bfLevel, ft, sc, st, C);
            //$('#txt_log').append("after base backward\n");
            //return 0;

            //et = deadline[ec];

            //bfVar.X[sc] = bfVar.X_0[sc];

            //for (var i = 1; i <= bfVar.C; i++) {
                //X[i] = bfVar.X_0[i];
            //}

            //for (var i = 1; i <= C; i++) {
                //for (var j = 1; j <= C + 60; j++) {
                    //x[i, j] = 0;
                //}
            //}


            forwardAlgo(B_h, sc, ec, X, deadline, Bm, I0, bfLevel, st, et, C, ft, x);
            //$('#txt_log').append("after forward\n");


            //$('#txt_log').append("ft: \t");
            //for (i = sc; i <= ec; i++) {
               // $('#txt_log').append(ft[i] + ", ");
            //}
           // $('#txt_log').append("\n");


            //return 4;


            //alert(bfVar.X_1[1]);
            //alert("anis");
            //for(i=1; i <= C; i++){
            //alert("fetched at " + ft[i]);
            //alert("quality is " + X[i]);
            //}
            

            backwardAlgo(B_h, sc, ec, X, bfVar.X_1, deadline, Bm, bfLevel, ft, x, st, C);
            //$('#txt_log').append("after backward\n");
            //return 0;
            
            for (var i = 1; i <= C; i++) {
                for (var j = 1; j <= 1000; j++) {
                    x[i, j] = 0;
                }
            }

            forwardAlgo(B_h, sc, ec, X, deadline, Bm, I0, bfLevel, st, et, C, ft, x);
            
            backwardAlgo(B_h, sc, ec, X, bfVar.X_2, deadline, Bm, bfLevel, ft, x, st, C);
            
            for (var i = 1; i <= C; i++) {
                for (var j = 1; j <= 1000; j++) {
                    x[i, j] = 0;
                }
            }

            forwardAlgo(B_h, sc, ec, X, deadline, Bm, I0, bfLevel, st, et, C, ft, x);

            backwardAlgo(B_h, sc, ec, X, bfVar.X_3, deadline, Bm, bfLevel, ft, x, st, C);

            for (var i = 1; i <= C; i++) {
                for (var j = 1; j <= 1000; j++) {
                    x[i, j] = 0;
                }
            }


            forwardAlgo(B_h, sc, ec, X, deadline, Bm, I0, bfLevel, st, et, C, ft, x);

            backwardAlgo(B_h, sc, ec, X, bfVar.X_4, deadline, Bm, bfLevel, ft, x, st, C);

            for (var i = 1; i <= C; i++) {
                for (var j = 1; j <= 1000; j++) {
                    x[i, j] = 0;
                }
            }

            //[ft, x(sc: ec, st: et), bff] = forwardAlgoV4(B, sc, ec, X, deadline, buf, I0, bf, st, et, C);
            // [X, I3(sc: ec), bft, bfr] = backwardAlgoV4(B, sc, ec, X, X_3, deadline, buf, bf, ft, x, st, C);
            // [ft, x(sc: ec, st: et), bff] = forwardAlgoV4(B, sc, ec, X, deadline, buf, I0, bf, st, et, C);
            // [X, I4(sc: ec), bft, bfr] = backwardAlgoV4(B, sc, ec, X, X_4, deadline, buf, bf, ft, x, st, C);
            //  [ft, x(sc: ec, st: et), bff] = forwardAlgoV4(B, sc, ec, X, deadline, buf, I0, bf, st, et, C);

        }

        //alert("after");
        //alert(X[sc]);
        //alert();
        //$('#txt_log').append(bfLevel + " here down \n");
        if (Math.abs(X[sc] - bfLayerQuality[0]) < delta) {
            return 1;
        } else if (Math.abs(X[sc] - bfLayerQuality[1]) < delta) {
            //if(bfLevel > 8){
                return 1;
            //}else{
                //return 1;
            //}
        } else if (Math.abs(X[sc] - bfLayerQuality[2]) < delta) {
            //if(bfLevel < 8){
                return 2;
            //}else{
                //return 3;
            //}
        } else if (Math.abs(X[sc] - bfLayerQuality[3]) < delta) {
            //if(bfLevel >= 8){
                return 3;
           // }else{
               // return 3;
            //}
        } else if (Math.abs(X[sc] - bfLayerQuality[4]) < delta) {
            if(bfLevel >= 8){
                return 4;
            }else{
                return 3;
            }
        }

    };

    var BaseforwardAlgo = function(B_h, Xt, ec, d, deadline, Bm, bfLevel, sc, st, C, bwLen, x, ft) {
        // TODO
        
        var delta = 0.000001,
            rows = C,
            //maxShift=4,
            cols = C + 60,
            ffFlag = [],
            fetchFlag = [],
            B = [],
            bf = [],
            X = [],
            tmp,
            j = st,
            i = sc;
        //alert(ft[st]);
        //ft = [],
        //x = [],
        // row = [];

        // while (cols--) row.push(0);
        // while (rows--) x.push(row);

        //
        for (i = sc; i <= ec; i++) {
            X[i] = Xt[i];
        }

        for (var k = sc; k <= C; k++) {
            fetchFlag[k] = 0;
            ffFlag[k] = 0;
        }

        for (i = st; i <= deadline[ec] + 360; i++) {
            B[i] = B_h;
            //alert(B_h);
            //alert(B[i]);
        }
        B[st] = B[st] / 2; // - sumFetched;
        //alert(st);
        //alert(B[st]);

        bf[st] = Math.floor(bfLevel / 4);
        bf[st + 1] = Math.floor(bfLevel / 4);
        for (i = st + 2; i <= C + 100; i = i + 4) {
            for (var k = 0; k <= 3; k++) {
                bf[i + k] = Math.max(Math.floor(bfLevel / 4) - 1, 0);
            }

        }
        j = st;
        i = sc;

        while (i <= ec && fetchFlag[ec] == 0) {


            if (bf[j] >= Bm) {
                j = j + 1;
                continue;
            }

            var fetched = Math.min(B[j], X[i]);
            //alert(fetched);
            if (ffFlag[i] == 0 && fetched > delta) {
                ft[i] = j;
                ffFlag[i] = 1;
            }


            x[i, j] = x[i, j] + fetched;
            B[j] = B[j] - fetched;
            X[i] = X[i] - fetched;
            if (X[i] < delta && fetchFlag[i] == 0 && j <= deadline[i]) {

                for (var k = ft[i]; k <= deadline[i]; k++) {
                    bf[k] = bf[k] + 1;
                }
                fetchFlag[i] = 1;
                i = i + 1;
            } else if (X[i] < delta && fetchFlag[i] == 0 && j > deadline[i]) {
                tmp = j - deadline[i];
                //  d[i: C] = d[i: C] + tmp;
                // deadline[i: C] = deadline[i: C] + tmp;

                //bf[ft[i]: deadline[i]] = bf[ft[i]: deadline[i]] + 1;
                
                for (var k = i; k <= C; k++) {
                    d[k] = d[k] + tmp;
                    deadline[k] = deadline[k] + tmp;

                }
                
                for (var k = ft[i]; k <= deadline[i]; k++) {
                    bf[k] = bf[k] + 1;
                }

                fetchFlag[i] = 1;

                i = i + 1;

            }

            if (B[j] < delta) {
                j = j + 1;


            }


        }




        //xx = x[sc: ec, st: videoLen];

        //return [d, deadline, x]
    };


    var BaseBackAlgo = function(B_h, Xl, x, ec, d, deadline, Bm, bfLevel, ft, sc, st, C) {
        var delta = 0.000001,
            i = ec,
            j = deadline[ec],
            xSum,
            rem,
            BSum,
            fetched,
            B = [],
            bf = [],
            fetchFlag = [];

        for (var k = 1; k <= C; k++) {
            fetchFlag[k] = 0;
        }
        

        for (i = st; i <= j + 60; i++) {
            B[i] = B_h;
            //alert(B_h);
            //alert(B[i]);
        }
        B[st] = B[st] / 2; // - sumFetched;
        //alert(st);
        //alert(B[st]);
        bf[st] = Math.floor(bfLevel / 4);
        bf[st + 1] = Math.floor(bfLevel / 4);
        for (var i = st + 2; i <= C + 100; i = i + 4) {
            for (var k = 0; k <= 3; k++) {
                bf[i + k] = Math.max(Math.floor(bfLevel / 4) - 1, 0);
            }

        }

        i = ec;
        

        while (j >= st) {
            if (i < sc) {
                break;
            }


            if (j <= deadline[i]) {

                if (bf[deadline[i]] >= Bm && fetchFlag[i] == 0) {
                    //d(sc:i)=d(sc:i)-1;
                    //deadline(sc:i)=deadline(sc:i)-1;
                    
                    for (var k = sc; k <= i; k++) {
                        d[k] = d[k] - 1;
                        deadline[k] = deadline[k] - 1;

                    }
                    continue;
                }

                if (fetchFlag[i] == 0) {
                    if (ft[i] > 0) {

                        xSum = 0;
                        for (var k = sc; k < i; k++) {
                            xSum = xSum + x[k, ft[i]];
                        }
                        rem = Math.max(B[ft[i]] - xSum, 0);

                    } else {
                        rem = 0;
                    }

                    BSum = 0;
                    for (var k = ft[i] + 1; k <= j; k++) {
                        BSum = BSum + B[k];
                    }
                    if (BSum + rem >= Xl[i] - delta) {
                        fetchFlag[i] = 1;
                    }


                }

                fetched = Math.min(B[j], Xl[i]);

                

                B[j] = B[j] - fetched;
                Xl[i] = Xl[i] - fetched;


                if (Xl[i] < delta) {
                    
                    //bf(j:deadline(i))=bf(j:deadline(i))+1;
                    for (var k = j; k <= deadline[i]; k++) {
                        bf[k] = bf[k] + 1;
                    }

                    i = i - 1;
                }

                if (B[j] < delta) {
                    j = j - 1;
                }

            } else {

                j = j - 1;
            }


        }
    };



    var forwardAlgo = function(B_h, sc, ec, Xt, deadline, Bm, I, bfLevel, st, et, C, ft, x) {

        //x=zeros(C,deadline(C));
        var j = st,
            delta = 0.000001,
            i = sc, //%iidx;
            fetched,
            B = [],
            bf = [],
            X = [],
            ffFlag = []; //zeros(1,C);
        for (var k = sc; k <= C; k++) {
            // fetchFlag[k] = 0;
            ffFlag[k] = 0;
        }

        for (i = sc; i <= ec; i++) {
            X[i] = Xt[i];
        }

        for (var k = st; k <= deadline[ec] + 60; k++) {
            B[k] = B_h;
            //alert(B_h);
            //alert(B[i]);
        }
        B[st] = B[st] / 2; // - sumFetched;
        //alert(st);
        //alert(B[st]);

        bf[st] = Math.floor(bfLevel / 4);
        bf[st + 1] = Math.floor(bfLevel / 4);
        for (var h = st + 2; h <= C + 100; h = h + 4) {
            for (var k = 0; k <= 3; k++) {
                bf[h + k] = Math.max(Math.floor(bfLevel / 4) - 1, 0);
            }

        }

        i = sc;
        while (j <= deadline[ec]) {
            //alert(j);
            if (i > ec) {
                break;
            }

            if (j <= deadline[i]) {
                if (bf[j] >= Bm) {
                    // alert("buffer is full");
                    j = j + 1;
                    continue;
                }

                fetched = Math.min(B[j], X[i]);
                //alert(i);

                //alert("bandwidth: " + B[j]);
                //alert("fetched: " + fetched);
                if (ffFlag[i] == 0 && fetched > delta) {
                    ft[i] = j;

                    ffFlag[i] = 1;

                }

                x[i, j] = x[i, j] + fetched;
                B[j] = B[j] - fetched;
                X[i] = X[i] - fetched;
                //%bf(j)=bf(j)+1;


                if (X[i] < delta) {
                    // bf(ft(i):deadline(i))=bf(ft(i):deadline(i))+1;
                    for (var k = ft[i]; k <= deadline[i]; k++) {
                        bf[k] = bf[k] + 1;
                    }
                    i = i + 1;
                    //%continue;
                }

                if (B[j] < delta) {
                    j = j + 1;
                    //alert("increment " + j)
                    //%continue;
                }


            } else {
                i = i + 1;
            }


        }
        //xx=x(sc:ec,st:et);
    };






    var backwardAlgo = function(B_h, sc, ec, X, Xll, deadline, Bm, bfLevel, ft, x, st, C) {
        //alert(ft[10]);
        //I=zeros(1,ec);
        var delta = 0.000001,
            //k=1;
            i = ec,
            fetched,
            rem,
            xSum,
            BSum,
            B = [],
            bf = [],
            Xl = [],
            j = deadline[ec],
            fetchFlag = [],
            ffFlag = [];

        for (var k = sc; k <= C; k++) {
            fetchFlag[k] = 0;
            ffFlag[k] = 0;
        }

        for (i = 1; i <= C; i++) {
            Xl[i] = Xll[i];
        }

        for (var i = st; i <= deadline[ec] + 60; i++) {
            B[i] = B_h;
            //alert(B_h);
            //alert(B[i]);
        }
        B[st] = B[st] / 2; // - sumFetched;
        //alert(st);
        //alert(B[st]);
        bf[st] = Math.floor(bfLevel / 4);
        bf[st + 1] = Math.floor(bfLevel / 4);
        for (var i = st + 2; i <= C + 100; i = i + 4) {
            for (var k = 0; k <= 3; k++) {
                bf[i + k] = Math.max(Math.floor(bfLevel / 4) - 1, 0);
            }

        }
        //$('#txt_log').append("inside back1:\n");
        
        i = ec;

        while (j >= st) {
            //alert("inside while");
            //alert(i);
            //alert(j);
            if (i < sc) {
                break;
            }

            if (j <= deadline[i]) {
                //alert("inside while2");
                if (bf[deadline[i]] >= Bm && fetchFlag[i] == 0) {
                    //rem(j)=B(j);
                    //alert("inside while3");
                    i = i - 1;
                    //j=j-1;
                    continue;
                }
                //alert("inside while4");
                if (fetchFlag[i] == 0) {
                    // alert("inside while5");   
                    if (ft[i] > 0) {
                        //alert(ft[i]);
                        //rem=max(B(ft(i))-sum(x(sc:i-1,ft(i))),0);
                        xSum = 0;
                        for (var k = sc; k < i; k++) {
                            xSum = xSum + x[k, ft[i]];
                        }
                        rem = Math.max(B[ft[i]] - xSum, 0);
                    } else {
                        rem = 0;
                    }

                    BSum = 0;
                    for (var k = ft[i] + 1; k <= j; k++) {
                        BSum = BSum + B[k];
                    }
                    //alert("finding...");
                    //alert(BSum+rem);
                    //alert(Xl[i]);
                    //$('#txt_log').append("inside back2:\n");
                    if (BSum + rem >= Xl[i] - delta) {
                        X[i] = Xl[i];
                        // alert(X[i]);
                        fetchFlag[i] = 1;
                        //alert("inside while6");
                        //I(i)=i;
                        //%k=k+1;
                        //bft[i] = j;
                        //% bf(j:deadline(i))=bf(j:deadline(i))+1;
                        ffFlag[i] = 1;
                    } else if ((BSum + rem >= X[i] - delta) && (X[i] > delta)) {
                        Xl[i] = X[i];
                        //alert("inside while7");
                        fetchFlag[i] = 1;
                        //%I(i)=i;
                        //bft(i)=j;
                        //% bf(j:deadline(i))=bf(j:deadline(i))+1;
                        ffFlag[i] = 1;
                    } else if (X[i] < delta) {
                        i = i - 1;
                        //alert("inside while8");
                        continue;
                    }
                }

                //alert("inside while9");
                //$('#txt_log').append("inside back3:\n");
                fetched = Math.min(B[j], Xl[i]);
                B[j] = B[j] - fetched;
                Xl[i] = Xl[i] - fetched;

                if (Xl[i] < delta) {
                    //alert("inside while10");
                    //%bf(j:bft(i)-1)=bf(j:bft(i)-1)+1;
                    //bf(j:deadline(i))=bf(j:deadline(i))+1;
                    for (var k = j; k <= deadline[i]; k++) {
                        bf[k] = bf[k] + 1;
                    }
                    i = i - 1;
                }
                //%continue;
                if (B[j] < delta) {
                    j = j - 1;
                    //alert("inside while11");
                }
                //%continue
                //$('#txt_log').append("i: " + i + "\n");
                //$('#txt_log').append("j: " + j + "\n");
                //$('#txt_log').append("fetched: " + fetched + "\n");
                //$('#txt_log').append("SC: " + sc + "\n");
            } else {
                //alert("inside while12");
                j = j - 1;
            }
        }
    };

    return {
        debug: undefined,
        abrRulesCollection: undefined,
        manifestExt: undefined,
        metricsModel: undefined,
        getBitrate: getBitrate
    };
};

MediaPlayer.dependencies.bfAlgo.prototype = {
    constructor: MediaPlayer.dependencies.bfAlgo
};
