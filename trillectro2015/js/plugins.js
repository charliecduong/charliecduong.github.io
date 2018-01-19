// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/*global jQuery */
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement('div');
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );


/*!
 * The Final Countdown for jQuery v2.0.4 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2014 Edson Hilios
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a){if(a instanceof Date)return a;if(String(a).match(g))return String(a).match(/^[0-9]*$/)&&(a=Number(a)),String(a).match(/\-/)&&(a=String(a).replace(/\-/g,"/")),new Date(a);throw new Error("Couldn't cast `"+a+"` to a date object.")}function c(a){return function(b){var c=b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(c)for(var e=0,f=c.length;f>e;++e){var g=c[e].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),i=new RegExp(g[0]),j=g[1]||"",k=g[3]||"",l=null;g=g[2],h.hasOwnProperty(g)&&(l=h[g],l=Number(a[l])),null!==l&&("!"===j&&(l=d(k,l)),""===j&&10>l&&(l="0"+l.toString()),b=b.replace(i,l.toString()))}return b=b.replace(/%%/,"%")}}function d(a,b){var c="s",d="";return a&&(a=a.replace(/(:|;|\s)/gi,"").split(/\,/),1===a.length?c=a[0]:(d=a[0],c=a[1])),1===Math.abs(b)?d:c}var e=100,f=[],g=[];g.push(/^[0-9]*$/.source),g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g=new RegExp(g.join("|"));var h={Y:"years",m:"months",w:"weeks",d:"days",D:"totalDays",H:"hours",M:"minutes",S:"seconds"},i=function(b,c,d){this.el=b,this.$el=a(b),this.interval=null,this.offset={},this.instanceNumber=f.length,f.push(this),this.$el.data("countdown-instance",this.instanceNumber),d&&(this.$el.on("update.countdown",d),this.$el.on("stoped.countdown",d),this.$el.on("finish.countdown",d)),this.setFinalDate(c),this.start()};a.extend(i.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var a=this;this.update(),this.interval=setInterval(function(){a.update.call(a)},e)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},pause:function(){this.stop.call(this)},resume:function(){this.start.call(this)},remove:function(){this.stop(),f[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(a){this.finalDate=b(a)},update:function(){return 0===this.$el.closest("html").length?void this.remove():(this.totalSecsLeft=this.finalDate.getTime()-(new Date).getTime(),this.totalSecsLeft=Math.ceil(this.totalSecsLeft/1e3),this.totalSecsLeft=this.totalSecsLeft<0?0:this.totalSecsLeft,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,totalDays:Math.floor(this.totalSecsLeft/60/60/24),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),months:Math.floor(this.totalSecsLeft/60/60/24/30),years:Math.floor(this.totalSecsLeft/60/60/24/365)},void(0===this.totalSecsLeft?(this.stop(),this.dispatchEvent("finish")):this.dispatchEvent("update")))},dispatchEvent:function(b){var d=a.Event(b+".countdown");d.finalDate=this.finalDate,d.offset=a.extend({},this.offset),d.strftime=c(this.offset),this.$el.trigger(d)}}),a.fn.countdown=function(){var b=Array.prototype.slice.call(arguments,0);return this.each(function(){var c=a(this).data("countdown-instance");if(void 0!==c){var d=f[c],e=b[0];i.prototype.hasOwnProperty(e)?d[e].apply(d,b.slice(1)):null===String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(d.setFinalDate.call(d,e),d.start()):a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,e))}else new i(this,b[0],b[1])})}});

/*! jQuery TubePlayer - v1.1.6 - 2013-06-04
* https://github.com/nirvanatikku/jQuery-TubePlayer-Plugin
* Copyright (c) 2013 Nirvana Tikku; Licensed MIT */
(function(e){"use strict";function t(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=0|16*Math.random(),a="x"==e?t:8|3&t;return a.toString(16)})}var a=".tubeplayer",r="jquery-youtube-tubeplayer",n="opts"+a,o={inited:!1,ytplayers:{},inits:[],iframeScriptInited:!1,State:{UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5},Error:{BAD_INIT:0,INVALID_PARAM:2,NOT_FOUND:100,NOT_EMBEDDABLE:101,CANT_PLAY:150}};e.tubeplayer={events:{},TubePlayer:o},e.tubeplayer.defaults={afterReady:function(){},stateChange:function(t){var a=this.onPlayer;return function(r){var n=e("#"+t).parent();switch("object"==typeof r&&(r=r.data),r){case o.State.UNSTARTED:return a.unstarted[t].call(n);case o.State.ENDED:return a.ended[t].call(n);case o.State.PLAYING:return a.playing[t].call(n);case o.State.PAUSED:return a.paused[t].call(n);case o.State.BUFFERING:return a.buffering[t].call(n);case o.State.CUED:return a.cued[t].call(n);default:return null}}},onError:function(t){var a=this.onErr;return function(r){var n=e("#"+t).parent();switch("object"==typeof r&&(r=r.data),r){case o.Error.BAD_INIT:case o.Error.INVALID_PARAM:return a.invalidParameter[t].call(n);case o.Error.NOT_FOUND:return a.notFound[t].call(n);case o.Error.NOT_EMBEDDABLE:case o.Error.CANT_PLAY:return a.notEmbeddable[t].call(n);default:return a.defaultError[t].call(n)}}},qualityChange:function(t){var a=this;return function(r){var n=e("#"+t).parent();return"object"==typeof r&&(r=r.data),a.onQualityChange[t].call(n,r)}},onQualityChange:{},onPlayer:{unstarted:{},ended:{},playing:{},paused:{},buffering:{},cued:{}},onErr:{defaultError:{},notFound:{},notEmbeddable:{},invalidParameter:{}}};var l={width:425,height:355,allowFullScreen:"true",initialVideo:"DkoeNLuMbcI",start:0,preferredQuality:"auto",showControls:!0,showRelated:!1,playsinline:!1,annotations:!0,autoPlay:!1,autoHide:!0,loop:0,theme:"dark",color:"red",showinfo:!1,modestbranding:!0,protocol:"http",wmode:"transparent",swfobjectURL:"ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",loadSWFObject:!1,allowScriptAccess:"always",playerID:"tubeplayer-player-container",iframed:!0,onPlay:function(){},onPause:function(){},onStop:function(){},onSeek:function(){},onMute:function(){},onUnMute:function(){},onPlayerUnstarted:function(){},onPlayerEnded:function(){},onPlayerPlaying:function(){},onPlayerPaused:function(){},onPlayerBuffering:function(){},onPlayerCued:function(){},onQualityChange:function(){},onError:function(){},onErrorNotFound:function(){},onErrorNotEmbeddable:function(){},onErrorInvalidParameter:function(){}};e.fn.tubeplayer=function(t,r){var n=e(this),l=typeof t;return 0===arguments.length||"object"===l?n.each(function(){o.init(e(this),t)}):"string"===l?n.triggerHandler(t+a,r!==void 0?r:null):void 0};var i=function(e){return function(t,a){var r=o.getPkg(t);if(r.ytplayer){var n=e(t,a,r);return n===void 0&&(n=r.$player),n}return r.$player}};e.tubeplayer.getPlayers=function(){return o.ytplayers},o.init=function(i,d){if(i.hasClass(r))return i;var y=e.extend({},l,d);y.playerID+="-"+t(),i.addClass(r).data(n,y);for(var s in u)i.bind(s+a,i,u[s]);return o.initDefaults(e.tubeplayer.defaults,y),e("<div></div>").attr("id",y.playerID).appendTo(i),o.initPlayer(i,y),i},o.getPkg=function(e){var t=e.data,a=t.data(n),r=o.ytplayers[a.playerID];return{$player:t,opts:a,ytplayer:r}},o.iframeReady=function(t){return o.inits.push(function(){new YT.Player(t.playerID,{videoId:t.initialVideo,width:t.width,height:t.height,playerVars:{autoplay:t.autoPlay?1:0,autohide:t.autoHide?1:0,controls:t.showControls?1:0,loop:t.loop?1:0,playlist:t.loop?t.initialVideo:"",rel:t.showRelated?1:0,fs:t.allowFullScreen?1:0,wmode:t.wmode,showinfo:t.showinfo?1:0,modestbranding:t.modestbranding?1:0,iv_load_policy:t.annotations?1:3,start:t.start,theme:t.theme,color:t.color,playsinline:t.playsinline},events:{onReady:function(a){o.ytplayers[t.playerID]=a.target;var n=e(a.target.getIframe()).parents("."+r);e.tubeplayer.defaults.afterReady(n)},onPlaybackQualityChange:e.tubeplayer.defaults.qualityChange(t.playerID),onStateChange:e.tubeplayer.defaults.stateChange(t.playerID),onError:e.tubeplayer.defaults.onError(t.playerID)}})}),o.inits.length>=1&&!o.inited?function(){for(var e=0;o.inits.length>e;e++)o.inits[e]();o.inited=!0}:(o.inited&&o.inits.pop()(),window.onYouTubePlayerAPIReady)},o.initDefaults=function(e,t){var a=t.playerID,r=e.onPlayer;r.unstarted[a]=t.onPlayerUnstarted,r.ended[a]=t.onPlayerEnded,r.playing[a]=t.onPlayerPlaying,r.paused[a]=t.onPlayerPaused,r.buffering[a]=t.onPlayerBuffering,r.cued[a]=t.onPlayerCued,e.onQualityChange[a]=t.onQualityChange;var n=e.onErr;n.defaultError[a]=t.onError,n.notFound[a]=t.onErrorNotFound,n.notEmbeddable[a]=t.onErrorNotEmbeddable,n.invalidParameter[a]=t.onErrorInvalidParameter},o.initPlayer=function(e,t){t.iframed?o.initIframePlayer(e,t):o.initFlashPlayer(e,t)},o.initIframePlayer=function(e,t){if(!o.iframeScriptInited){var a=document.createElement("script");a.src=t.protocol+"://www.youtube.com/iframe_api";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(a,r),o.iframeScriptInited=!0}window.onYouTubePlayerAPIReady=o.iframeReady(t)},o.initFlashPlayer=function(t,a){a.loadSWFObject?(a.swfobjectURL=a.swfobjectURL.replace("http://",""),a.swfobjectURL=a.swfobjectURL.replace("https://",""),a.swfobjectURL=a.protocol+"://"+a.swfobjectURL,e.getScript(a.swfobjectURL,o.init_flash_player(a))):o.init_flash_player(a)()},o.init_flash_player=function(t){return function(){if(!window.swfobject)return alert("YouTube Player couldn't be initialized. Please include swfobject."),void 0;var a=["//www.youtube.com/v/"];a.push(t.initialVideo),a.push("?&enablejsapi=1&version=3"),a.push("&playerapiid="+t.playerID),a.push("&rel="+(t.showRelated?1:0)),a.push("&autoplay="+(t.autoPlay?1:0)),a.push("&autohide="+(t.autoHide?1:0)),a.push("&loop="+(t.loop?1:0)),a.push("&playlist="+(t.loop?t.initialVideo:"")),a.push("&controls="+(t.showControls?1:0)),a.push("&showinfo="+(t.showinfo?1:0)),a.push("&modestbranding="+(t.modestbranding?1:0)),a.push("&iv_load_policy="+(t.annotations?1:3)),a.push("&start="+t.start),a.push("&theme="+t.theme),a.push("&color="+t.color),a.push("&playsinline="+t.playsinline),a.push("&fs="+(t.allowFullScreen?1:0)),window.swfobject.embedSWF(a.join(""),t.playerID,t.width,t.height,"8",null,null,{allowScriptAccess:t.allowScriptAccess,wmode:t.wmode,allowFullScreen:t.allowFullScreen},{id:t.playerID}),window.onYouTubePlayerReady=function(t){var a=document.getElementById(t),n=t.replace(/-/g,""),l=e.tubeplayer.defaults;e.tubeplayer.events[n]={stateChange:l.stateChange(t),error:l.onError(t),qualityChange:l.qualityChange(t)},a.addEventListener("onStateChange","$.tubeplayer.events."+n+".stateChange"),a.addEventListener("onError","$.tubeplayer.events."+n+".error"),a.addEventListener("onPlaybackQualityChange","$.tubeplayer.events."+n+".qualityChange"),o.ytplayers[t]=a;var i=e(a).parents("."+r);e.tubeplayer.defaults.afterReady(i)}}},o.getVideoIDFromURL=function(e){e=e||"";var t=e.indexOf("?"),a=e.substring(t,e.length),r=a.indexOf("v=");if(r>-1){var n=a.indexOf("&",r);return-1===n&&(n=a.length),a.substring(r+"v=".length,n)}return""};var u={opts:i(function(e,t,a){return a.opts}),cue:i(function(e,t,a){a.ytplayer.cueVideoById(t,0,a.opts.preferredQuality)}),play:i(function(e,t,a){"object"==typeof t?a.ytplayer.loadVideoById(t.id,t.time,a.opts.preferredQuality):t!==void 0?a.ytplayer.loadVideoById(t,0,a.opts.preferredQuality):a.ytplayer.playVideo(),a.opts.onPlay(t)}),pause:i(function(e,t,a){a.ytplayer.pauseVideo(),a.opts.onPause(a)}),stop:i(function(e,t,a){a.ytplayer.stopVideo(),a.opts.onStop(a)}),seek:i(function(e,t,a){if(/:/.test(t)){var r=t.split(":").reverse();t=0;for(var n=0;r.length>n;n++)t+=Math.pow(60,n)*(0|r[n])}a.ytplayer.seekTo(t,!0),a.opts.onSeek(t)}),mute:i(function(e,t,a){a.$player.attr("data-prev-mute-volume",a.ytplayer.getVolume()),a.ytplayer.mute(),a.opts.onMute(a)}),unmute:i(function(e,t,a){a.ytplayer.unMute(),a.ytplayer.setVolume(a.$player.attr("data-prev-mute-volume")||50),a.opts.onUnMute()}),isMuted:i(function(e,t,a){return a.ytplayer.isMuted()}),volume:i(function(e,t,a){return void 0===t?a.ytplayer.getVolume()||0:(a.ytplayer.setVolume(t),a.$player.attr("data-prev-mute-volume",a.ytplayer.getVolume()),void 0)}),quality:i(function(e,t,a){return void 0===t?a.ytplayer.getPlaybackQuality():(a.ytplayer.setPlaybackQuality(t),void 0)}),playbackRate:i(function(e,t,a){return void 0===t?a.ytplayer.getPlaybackRate():(a.ytplayer.setPlaybackRate(t),void 0)}),data:i(function(e,t,a){var r={},n=a.ytplayer;return r.videoLoadedFraction=n.getVideoLoadedFraction(),r.bytesLoaded=n.getVideoBytesLoaded(),r.bytesTotal=n.getVideoBytesTotal(),r.startBytes=n.getVideoStartBytes(),r.state=n.getPlayerState(),r.currentTime=n.getCurrentTime(),r.duration=n.getDuration(),r.videoURL=n.getVideoUrl(),r.videoEmbedCode=n.getVideoEmbedCode(),r.videoID=o.getVideoIDFromURL(r.videoURL),r.availableQualityLevels=n.getAvailableQualityLevels(),r.availablePlaybackRates=n.getAvailablePlaybackRates(),r}),videoId:i(function(e,t,a){return o.getVideoIDFromURL(a.ytplayer.getVideoUrl())}),size:i(function(t,a,r){a!==void 0&&a.width&&a.height&&(r.ytplayer.setSize(a.width,a.height),e(r.ytplayer).css(a))}),destroy:i(function(t,l,i){i.$player.removeClass(r).data(n,null).unbind(a).html(""),delete o.ytplayers[i.opts.playerID];var u=e.tubeplayer.defaults,d=["unstarted","ended","playing","paused","buffering","cued"];return e.each(d,function(e,t){delete u.onPlayer[t][i.opts.playerID]}),d=["defaultError","notFound","notEmbeddable","invalidParameter"],e.each(d,function(e,t){delete u.onErr[t][i.opts.playerID]}),delete u.onQualityChange[i.opts.playerID],delete e.tubeplayer.events[i.opts.playerID],"destroy"in i.ytplayer&&i.ytplayer.destroy(),e(i.ytplayer).remove(),null}),player:i(function(e,t,a){return a.ytplayer})}})(jQuery);

