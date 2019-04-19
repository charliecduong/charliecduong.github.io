$(function(){
	var canvas = document.getElementById('particles'),
	   can_w = parseInt(canvas.getAttribute('width')),
	   can_h = parseInt(canvas.getAttribute('height')),
	   ctx = canvas.getContext('2d');
	// console.log(typeof can_w);

	var ball = {
	      x: 0,
	      y: 0,
	      vx: 0,
	      vy: 0,
	      r: 0,
	      alpha: 1,
	      phase: 0
	   },
	   ball_color = {
	       r: 15,
	       g: 113,
	       b: 225
	   },
	   R = 2,
	   balls = [],
	   alpha_f = 0.03,
	   alpha_phase = 0,

	// Line
	   link_line_width = 0.8,
	   dis_limit = 260,
	   add_mouse_point = true,
	   mouse_in = false,
	   mouse_ball = {
	      x: 0,
	      y: 0,
	      vx: 0,
	      vy: 0,
	      r: 0,
	      type: 'mouse'
	   };

	// Random speed
	function getRandomSpeed(pos){
	    var  min = -1,
	       max = 1;
	    switch(pos){
	        case 'top':
	            return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
	            break;
	        case 'right':
	            return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
	            break;
	        case 'bottom':
	            return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
	            break;
	        case 'left':
	            return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
	            break;
	        default:
	            return;
	            break;
	    }
	}
	function randomArrayItem(arr){
	    return arr[Math.floor(Math.random() * arr.length)];
	}
	function randomNumFrom(min, max){
	    return Math.random()*(max - min) + min;
	}
	console.log(randomNumFrom(0, 10));
	// Random Ball
	function getRandomBall(){
	    var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
	    switch(pos){
	        case 'top':
	            return {
	                x: randomSidePos(can_w),
	                y: -R,
	                vx: getRandomSpeed('top')[0],
	                vy: getRandomSpeed('top')[1],
	                r: R,
	                alpha: 1,
	                phase: randomNumFrom(0, 10)
	            }
	            break;
	        case 'right':
	            return {
	                x: can_w + R,
	                y: randomSidePos(can_h),
	                vx: getRandomSpeed('right')[0],
	                vy: getRandomSpeed('right')[1],
	                r: R,
	                alpha: 1,
	                phase: randomNumFrom(0, 10)
	            }
	            break;
	        case 'bottom':
	            return {
	                x: randomSidePos(can_w),
	                y: can_h + R,
	                vx: getRandomSpeed('bottom')[0],
	                vy: getRandomSpeed('bottom')[1],
	                r: R,
	                alpha: 1,
	                phase: randomNumFrom(0, 10)
	            }
	            break;
	        case 'left':
	            return {
	                x: -R,
	                y: randomSidePos(can_h),
	                vx: getRandomSpeed('left')[0],
	                vy: getRandomSpeed('left')[1],
	                r: R,
	                alpha: 1,
	                phase: randomNumFrom(0, 10)
	            }
	            break;
	    }
	}
	function randomSidePos(length){
	    return Math.ceil(Math.random() * length);
	}

	// Draw Ball
	function renderBalls(){
	    Array.prototype.forEach.call(balls, function(b){
	       if(!b.hasOwnProperty('type')){
	           ctx.fillStyle = 'rgba('+ball_color.r+','+ball_color.g+','+ball_color.b+','+b.alpha+')';
	           ctx.beginPath();
	           ctx.arc(b.x, b.y, R, 0, Math.PI*2, true);
	           ctx.closePath();
	           ctx.fill();
	       }
	    });
	}

	// Update balls
	function updateBalls(){
	    var new_balls = [];
	    Array.prototype.forEach.call(balls, function(b){
	        b.x += b.vx;
	        b.y += b.vy;

	        if(b.x > -(50) && b.x < (can_w+50) && b.y > -(50) && b.y < (can_h+50)){
	           new_balls.push(b);
	        }

	        // alpha change
	        b.phase += alpha_f;
	        b.alpha = Math.abs(Math.cos(b.phase));
	        // console.log(b.alpha);
	    });

	    balls = new_balls.slice(0);
	}

	// loop alpha
	function loopAlphaInf(){

	}

	// Draw lines
	function renderLines(){
	    var fraction, alpha;
	    for (var i = 0; i < balls.length; i++) {
	        for (var j = i + 1; j < balls.length; j++) {

	           fraction = getDisOf(balls[i], balls[j]) / dis_limit;

	           if(fraction < 1){
	               alpha = (1 - fraction).toString();

	               ctx.strokeStyle = 'rgba(130, 190, 224,'+alpha+')';
	               ctx.lineWidth = link_line_width;

	               ctx.beginPath();
	               ctx.moveTo(balls[i].x, balls[i].y);
	               ctx.lineTo(balls[j].x, balls[j].y);
	               ctx.stroke();
	               ctx.closePath();
	           }
	        }
	    }
	}

	// calculate distance between two points
	function getDisOf(b1, b2){
	    var  delta_x = Math.abs(b1.x - b2.x),
	       delta_y = Math.abs(b1.y - b2.y);

	    return Math.sqrt(delta_x*delta_x + delta_y*delta_y);
	}

	// add balls if there a little balls
	function addBallIfy(){
	    if(balls.length < 20){
	        balls.push(getRandomBall());
	    }
	}

	// Render
	function render(){
	    ctx.clearRect(0, 0, can_w, can_h);

	    renderBalls();

	    renderLines();

	    updateBalls();

	    addBallIfy();

	    window.requestAnimationFrame(render);
	}

	// Init Balls
	function initBalls(num){
	    for(var i = 1; i <= num; i++){
	        balls.push({
	            x: randomSidePos(can_w),
	            y: randomSidePos(can_h),
	            vx: getRandomSpeed('top')[0],
	            vy: getRandomSpeed('top')[1],
	            r: R,
	            alpha: 1,
	            phase: randomNumFrom(0, 10)
	        });
	    }
	}
	// Init Canvas
	function initCanvas(){
	    canvas.setAttribute('width', window.innerWidth);
	    canvas.setAttribute('height', window.innerHeight);

	    can_w = parseInt(canvas.getAttribute('width'));
	    can_h = parseInt(canvas.getAttribute('height'));
	}
	window.addEventListener('resize', function(e){
	    console.log('Window Resize...');
	    initCanvas();
	});

	function goMovie(){
	    initCanvas();
	    initBalls(20);
	    window.requestAnimationFrame(render);
	}
	goMovie();
	// Mouse effect
	canvas.addEventListener('mouseenter', function(){
	    console.log('mouseenter');
	    mouse_in = true;
	    balls.push(mouse_ball);
	});
	canvas.addEventListener('mouseleave', function(){
	    console.log('mouseleave');
	    mouse_in = false;
	    var new_balls = [];
	    Array.prototype.forEach.call(balls, function(b){
	        if(!b.hasOwnProperty('type')){
	            new_balls.push(b);
	        }
	    });
	    balls = new_balls.slice(0);
	});
	canvas.addEventListener('mousemove', function(e){
	    var e = e || window.event;
	    mouse_ball.x = e.pageX;
	    mouse_ball.y = e.pageY;
	    // console.log(mouse_ball);
	});
}); 

// Wrap each letter in a span
// $("h1").html(function(index, html) {
//   return html.replace(/\S/g, '<span>$&</span>');
// });

$(function(){
//(function($){

	$.fn.shuffleLetters = function(prop){

		var options = $.extend({
			"step"		: 25,			// How many times should the letters be changed
			"fps"		: 25,			// Frames Per Second
			"text"		: "", 			// Use this text instead of the contents
			"callback"	: function(){}	// Run once the animation is complete
		},prop)

		return this.each(function(){

			var el = $(this),
				str = "";


			// Preventing parallel animations using a flag;

			if(el.data('animated')){
				return true;
			}

			el.data('animated',true);


			if(options.text) {
				str = options.text.split('');
			}
			else {
				str = el.text().split('');
			}

			// The types array holds the type for each character;
			// Letters holds the positions of non-space characters;

			var types = [],
				letters = [];

			// Looping through all the chars of the string

			for(var i=0;i<str.length;i++){

				var ch = str[i];

				if(ch == " "){
					types[i] = "space";
					continue;
				}
				else if(/[a-z]/.test(ch)){
					types[i] = "lowerLetter";
				}
				else if(/[A-Z]/.test(ch)){
					types[i] = "upperLetter";
				}
				else {
					types[i] = "symbol";
				}

				letters.push(i);
			}

			el.html("");

			// Self executing named function expression:

			(function shuffle(start){

				// This code is run options.fps times per second
				// and updates the contents of the page element

				var i,
					len = letters.length,
					strCopy = str.slice(0);	// Fresh copy of the string

				if(start>len){

					// The animation is complete. Updating the
					// flag and triggering the callback;

					el.data('animated',false);
					options.callback(el);
					return;
				}

				// All the work gets done here
				for(i=Math.max(start,0); i < len; i++){

					// The start argument and options.step limit
					// the characters we will be working on at once

					if( i < start+options.step){
						// Generate a random character at thsi position
						strCopy[letters[i]] = randomChar(types[letters[i]]);
					}
					else {
						strCopy[letters[i]] = "";
					}
				}

				el.text(strCopy.join(""));

				setTimeout(function(){

					shuffle(start+1);

				},1000/options.fps);

			})(-options.step);


		});
	};

	function randomChar(type){
		var pool = "";

		if (type == "lowerLetter"){
			pool = "abcdefghijklmnopqrstuvwxyz0123456789";
		}
		else if (type == "upperLetter"){
			pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		}
		else if (type == "symbol"){
			pool = ",.?/\\(^)![]{}*&^%$#'\"";
		}

		var arr = pool.split('');
		return arr[Math.floor(Math.random()*arr.length)];
	}

//})(jQuery);


$(".shuffle").shuffleLetters();
});

$(function(){
	  window.sr = ScrollReveal();
		sr.reveal('#header');
	  sr.reveal('#intro');
		sr.reveal('#about');
		sr.reveal('.works');
		sr.reveal('#contact');
		sr.reveal('.content');
});

/*
$(function(){
$('.design').each(function(){
    var txt = $(this).text();
    var html = '';
    for (t in txt)
    {
        html = html + '<span>' + txt[t] + '</span>';
    }
    $(this).html(html);
  });
});

$(document).on('hover', '.design span', function(event){
  var back = ["#ddc1c6","#446ba7","#d5b5a4"];
  var rand = back[Math.floor(Math.random() * back.length)];
  console.log(rand);
  if (event.type == 'mouseenter')
      $(this).css('color', rand);
  else
      $(this).css('color', rand);
});
*/

/*
$(document).ready(function() {

    Every time the window is scrolled ...
    $(window).scroll( function(){

        Check the location of each desired element
        $('.hideme').each( function(i){

            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

             If the object is completely visible in the window, fade it it
            if( bottom_of_window > bottom_of_object ){

                $(this).animate({'opacity':'1'},1500);

            }

        });

    });

});*/
