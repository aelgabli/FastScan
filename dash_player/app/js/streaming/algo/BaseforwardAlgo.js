//function [d, deadline, xx] = noSkip_forwardAlgo(B, X, ec, d, deadline, Bm, bf, sc, st, C, bwLen)
 MediaPlayer.dependencies.BaseForwardAlgo = function() {
    "use strict";

    getBitrate = function(B, X, ec, d, deadline, Bm, bf, sc, st, C, videoLen) {                                         
   var delta=10^-6,
        rows=C,
        cols=C+60,
        ffFlag=[C],
        fetchFlag=[C],
        j=st,
        i=sc,
        ft=[],
        x = [], row = [],
        while (cols--) row.push(0);
        while (rows--) x.push(row.slice());
        
        //
        
    while(i <= ec && fetchFlag(ec)==0){
       

                if(bf(j) >= Bm){
                    j=j+1;
                    continue;
                }
                
                fetched=Math.min(B[j], X[i]);
                
                if(ffFlag[i]==0 && fetched > delta){
                    ft[i]=j;
                    ffFlag[i]=1;
                    
                }
               
                
                x[i][j]=x[i][j]+fetched;
                B[j]=B[j]-fetched;
                X[i]=X[i]-fetched;
                if(X[i]< delta && fetchFlag[i]==0 && j <= deadline[i]){
                   
                     bf[ft[i]:deadline[i]]=bf[ft[i]:deadline[i]]+1;
                     fetchFlag[i]=1;
                        i=i+1;
                }
                        
                
                 elseif(X[i]< delta && fetchFlag[i]==0 && j > deadline[i]){
                        tmp=j-deadline[i];
                        d[i:C]=d[i:C]+tmp;
                        deadline[i:C]=deadline[i:C]+tmp;
                        
                        bf[ft[i]:deadline[i]]=bf[ft[i]:deadline[i]]+1;
                        fetchFlag(i)=1;
                        
                            i=i+1;
                           
                }
                
                if(B[j] < delta){
                    j=j+1;
                }
                   
                
    }
                
      
    
    
xx=x[sc:ec,st:videoLen];
}
}
