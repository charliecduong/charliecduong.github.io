$(document).ready(function(){
	$("#video").fitVids();
	 $('#countdown').countdown('2014/06/18 10:00:00').on('update.countdown', function(event) {
		 var $this = $(this).html(event.strftime(''
		 + '<div><span>%-d</span> <div class="text">day%!d</div></div>'
		 + '<div><span>%H</span> <div class="text">hours</div></div>'
		 + '<div><span>%M</span> <div class="text">mins</div></div> '
		 + '<div><span>%S</span> <div class="text">secs</div></div>'));
	});
});

$(document).ready(function(){

	$('#buy_now').click(function(){
		console.log('clicked buy button');
		$('html, body').animate({
		scrollTop: $("#passes").offset().top
	}, 400);
	});
	
	$('#sizzle_reel').click(function(){
		$(this).fadeOut();
		$('#sizzle_reel').tubeplayer('stop');
		$(this).delay(300).remove();
	});
	
	$('#sizzle_reel').tubeplayer({
		width: 600, // the width of the player
		height: 450, // the height of the player
		showControls: 0,
		autoPlay: true,
		allowFullScreen: "false", // true by default, allow user to go full screen
		initialVideo: "gYBdaw4Lzs8", // the video that is loaded into the player
		onPlayerEnded: function(){
		
			$('#sizzle_reel').fadeOut('slow');	
			
		},
		preferredQuality: "hd720",// preferred quality: default, small, medium, large, hd720

	});
	
	$('nav .to_trillectro').click(function(){
		$('html, body').animate({
			scrollTop: $("#hero").offset().top}, 400);
	});
	
	$('nav .to_updates').click(function(){
		$('html, body').animate({
			scrollTop: $("#email").offset().top}, 400);
	});
	
	$('nav .to_lineup').click(function(){
		$('html, body').animate({
			scrollTop: $("#lineup").offset().top}, 400);
	});
	
	$('nav .to_passes').click(function(){
		$('html, body').animate({
			scrollTop: $("#passes").offset().top}, 400);
	});
	
	$('nav .to_transportation').click(function(){
		$('html, body').animate({
			scrollTop: $("#transportation").offset().top}, 400);
	});
	
	$('nav .to_parking').click(function(){
		$('html, body').animate({
			scrollTop: $("#parking").offset().top}, 400);
	});
	
	$('nav .to_media').click(function(){
		$('html, body').animate({
			scrollTop: $("#media").offset().top}, 400);
	});
	
	$('nav .to_vendors').click(function(){
		$('html, body').animate({
			scrollTop: $("#vendors").offset().top}, 400);
	});
	
	$('nav .to_volunteers').click(function(){
		$('html, body').animate({
			scrollTop: $("#volunteers").offset().top}, 400);
	});
	
	$('nav .to_partners').click(function(){
		$('html, body').animate({
			scrollTop: $("#partners").offset().top}, 400);
	});

	$('nav .to_faq').click(function(){
		$('html, body').animate({
			scrollTop: $("#faq").offset().top}, 400);
	});
});

$(window).load(function(){
	$("#sizzle_reel").fitVids();
});