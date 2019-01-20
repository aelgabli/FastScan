//function [d, deadline]=noSkip_backAlgo(B, Xl, x, ec, d, deadline, Bm, bf, ft,sc,st,C)

 MediaPlayer.dependencies.BaseBackAlgo = function() {
    "use strict";

    getBitrate = function(B, Xl, x, ec, d, deadline, Bm, bf, ft, sc, st, C) {                                         
   var delta=10^-6;
        i=ec;
        j=deadline(ec);
        fetchFlag=[C];

    while (j >= st){}
            if(i < sc){
                break;
            }
             
          
        if(j <= deadline(i)){}
            
            if(bf[deadline[i]]>=Bm && fetchFlag[i]==0){
               d(sc:i)=d(sc:i)-1;
               deadline(sc:i)=deadline(sc:i)-1;
               continue
            }
            
            if(fetchFlag[i]==0){
                if(ft[i] > 0){
                    rem=Math.max(B[ft[i]]-sum(x[sc:i-1,ft[i]]],0);
                
                }
                else{
                    rem=0;
                }
                
                if(sum(B[ft[i]+1:j])+rem>=Xl[i]-10^(-6)){
                    fetchFlag[i]=1;
                }
                
            }

                    
                fetched=Math.min(B[j], Xl[i]);
           
                B[j]=B[j]-fetched;
                Xl[i]=Xl[i]-fetched;


                if(Xl[i] < delta){
                    bf(j:deadline(i))=bf(j:deadline(i))+1;
                    i=i-1;
                }

                if(B[j] < delta){
                    j=j-1;
                }
                
         }   
        else{
            j=j-1;
        }
        
    
}
}
