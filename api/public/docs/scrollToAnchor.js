/*! 
ScrollToAnchor.js v1.1,0 | Paul Browne | 2015 | GNU 2.0 
Modified by: Rony Abreu | 2017 
 */


    function bodF(){
        var bod = document.getElementsByTagName("body")[0];
        var FIREFOX = /Firefox/i.test(navigator.userAgent);
        if (FIREFOX) {
            bod = document.getElementsByTagName("html")[0];
        }

        return bod;
    }

    function animate(opts) {
        var start = new Date(),
            id = setInterval(function() {
                var timePassed = new Date() - start,
                    progress = timePassed / opts.duration,
                    delta = opts.delta(progress);
                if (progress > 1) {
                    clearInterval(id);
                }
                window.addEventListener('click', function() {
                    clearInterval(id);
                });
                opts.step(delta);
            }, 1);
    }

    function move(duration, too) {
        var bod = bodF();
        animate({
            duration: duration || 1200,
            delta: quad,
            step: function(quad) {
                bod.scrollTop = bod.scrollTop + (too - bod.scrollTop) * quad;
            }
        });
    }

    function quad(progress) {
        return Math.pow(progress, 2);
    }

    function boo(section) {
         var bod = bodF();
        var thehref = section,
            idofhref = document.getElementById(thehref);
        if(idofhref){
        var disttotop = idofhref.offsetTop,
            length = Math.abs(disttotop - bod.scrollTop),
            timing;


        if (Math.abs(length) < 500) {
            timing = 1000;
        }
        if (Math.abs(length) > 2500) {
            timing = 2500;
        } else {
            timing = length;
        }
        move(timing, disttotop);
        return true;
     }else{
        console.log("nao encontrou esse id");
        return false;
     }
    }

    function anchorByUrl(refreshIntervalId){
        var url = window.location.href;   
    
        if(url.indexOf('#') !== -1){
            var anchorUrl = url.substring(url.indexOf("#")+1);
             return boo(anchorUrl);
         }else{
            clearInterval(refreshIntervalId);
            return false;
         }
       
    }
