// Custom Javascript
// -----------------------------------------

var navWidth,
	navHeight;
var html = document.documentElement;
var body = document.body;

$(document).ready(function(){
	navWidth = $(window).width();
	navHeight = $(window).height();

	$('.navigation').css({height:navHeight-140});
	$('.container,.project-nav,.projects').css({height:navHeight});
	$('.case-bg').css({width:navWidth, height:navHeight});
	// $('#maintenance').css({height:navHeight});

	$('.js-tilt').tilt({
		maxTilt:        10,
		perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
		easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
		scale:          .98,      // 2 = 200%, 1.5 = 150%, etc..
		speed:          700,    // Speed of the enter/exit transition.
		transition:     true,   // Set a transition on enter/exit.
		reset:          true,   // If the tilt effect has to be reset on exit.
		disableAxis: 		null,
		glare:          false,  // Enables glare effect
		maxGlare:       0       // From 0 - 1.
	});

	$('.btn,.btn-footer').on('mouseover',function(e) {
	  	TweenMax.to($(this).find('.btn-bg'), .7, {ease:Power4.easeOut,x:0, y:-52});
	});  
	$('.btn,.btn-footer').on('mouseout',function(e) {
			e.stopPropagation();
	  	TweenMax.to($(this).find('.btn-bg'), .5, {ease:Power4.easeOut,x:0, y:-104, onComplete:function(){TweenMax.set('.btn-bg', {y:0}) }});
	});

	$('.btn-about').on('mouseover',function() {
	  	TweenMax.to($(this).find('.btn-bg'), .7, {ease:Power4.easeOut,x:0, top:'0%'})
	  	TweenMax.to($(this), .1, {ease:Power4.easeOut,color:'#0c0c0c'})

	});  
	$('.btn-about').on('mouseout',function() {
			TweenMax.to($(this), .1, {ease:Power4.easeOut,color:'#ffffff'})
	  	TweenMax.to($(this).find('.btn-bg'), .5, {ease:Power4.easeOut,x:0, top:'-100%', onComplete:function(){TweenMax.set('.btn-bg', {top:'100%'}) }});
	});
});

$(window).on('resize',function(){
	$('.navigation').css({height:navHeight-140});
	$('.container,.project-nav,.projects').css({height:navHeight});
});
