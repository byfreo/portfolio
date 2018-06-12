var ScrollMagic = require("scrollmagic");
require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');
require('scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators')
var gsap = require("gsap");
var scrollTo = require('gsap/src/uncompressed/plugins/ScrollToPlugin');

var master 		= 	new TimelineMax();
var sec 			= 	0.6;
var easeOut 	= 	Power2.easeOut;
var easeIn 		= 	Power2.easeIn;
var easeInOut = 	Power2.easeInOut;


var sdorange 	=  	"#f05b24",
		sdblue 		= 	"#5fc1ef",
		cbteal 		= 	"#00b2a5",
		cbpink		=		"#ff4cd5",
		mmmblack 	=  	"#1d1d1d",
		mmmgold 	= 	"#cba135",
		sinblue		= 	"#00d6d2",
		sinpink		=		"#f8b1bc",
		zenteal 	=  	"#239aaf",
		zengreen 	= 	"#0a2328",
		ppblue 		= 	"#009cde",
		pproyal		=		"#003188";

var W		          = 		$(window).width()-500,
		nHeight		    = 		$(window).height(),
		activeSlide		= 		false,
		aboutActive   = 		false;

var sdlist = ['.active .short-details ul li:nth-child(1)','.active .short-details ul li:nth-child(2)','.active .short-details ul li:nth-child(3)'],
		nxtBtn = ['.active .arrow','.active .next-button a'],
		showcase = ['.main-color', '.second-color', '.mobile-image', '.laptop-image'],
		gif = ['.gif-bg', '.gif-desc-content h4', '.gif-desc-content p'];


function init(){
	var tl = new TimelineMax()
	.set('.project-nav li', {y:140,rotationX: 90, opacity: 0, transformOrigin: "50% 50% 50%", perspective:1000, transformStyle:"preserve-3d"})
	.set(['.iam,.help h4', '.help a'], {opacity:0,y:40})	
	.add('init')
	.staggerFromTo('.project-nav li', 1,{y:140,rotationX: 90, opacity: 0},{y:0,rotationX: 0, opacity: 1, ease:Back.easeOut.config(.3)}, 0.2, 'init')
	.from('.work', 1.5, {ease: Expo.easeOut,y:nHeight}, 'init')
	.from('.about', 1.5, {ease: Expo.easeOut,y:nHeight,delay:.2}, 'init')
	.from('footer ul li', .7, {ease:easeOut,rotationX:90})
	console.log(tl.duration()+nHeight);
	return tl;
}

function logoColor(start, end){
	var tl = new TimelineMax()
	.to('.first-color',		0.7, 	{attr: {"stop-color": start}})
	.to('.second-color', 	0.7, 	{attr: {"stop-color": end}}, '-=.5');
	return tl;
}

function reset(){
	var tl = new TimelineMax()
	.set('.names h2', { y:0})
	.set('.desc-line', { width:90})
	.set('.short-desc', { y:0, opacity:1})
	.set('.arrow, .next-button a', {x:0, opacity:1})
	.set('.btn', {y:0, opacity:1})
	.set('.short-details ul li', {x:0, opacity:1});
	return tl;
}

// Fade In Animation
//______________________________________________________________________________________________________


function fadeIn(){
	var tl = new TimelineMax()
	.call(function(){activeSlide = true;})
	.set('.projects', {zIndex:2})
	.add('fadeIn')
	.from('.active .names h2', sec, {ease:easeOut,y:'+=45'}, 'fadeIn')
	.from('.active .desc-line', sec, {ease:easeOut, width:'-=90',delay:.05}, 'fadeIn')
	.from('.active .short-desc', sec, {ease:easeOut, y:'+=50', opacity:0,delay:.1},'fadeIn')
	.staggerFrom(nxtBtn, sec, {ease:easeOut,x:'-=40', opacity:0,delay:.15}, .1,'fadeIn')
	.from('.active .btn', sec, {ease:easeOut, y:'+=20', opacity:0,delay:.25},'fadeIn')
	.staggerFrom(sdlist, sec, {ease:easeOut,x:'-=25', opacity:0,delay:.25}, .2,'fadeIn');
	return tl;
}

// Fade Out Animation
//________________________________________________________________________________________

function fadeOut(){
	var tl = new TimelineMax()
	.call(function(){activeSlide = false;})
	.add('fadeOut')
	.to('.active .names h2', sec, {ease:easeOut,y:'+=45'}, 'fadeOut')
	.to('.active .desc-line', sec, {ease:easeOut, width:'-=90',delay:.05}, 'fadeOut')
	.to('.active .short-desc', sec, {ease:easeOut, y:'+=50', opacity:0,delay:.1},'fadeOut')
	.staggerTo(nxtBtn, sec, {ease:easeOut,x:'-=40', opacity:0,delay:.15}, .1,'fadeOut')
	.to('.active .btn', sec, {y:'+=15', opacity:0, ease:easeOut,delay:.2},'fadeOut')
	.staggerTo(sdlist, sec, {x:'-=25', opacity:0, ease:easeOut,delay:.25}, .2,'fadeOut')
	.to('.client', 0.01,{className: "-=active"},'fadeOut')
	.duration(1);
	return tl;
}

// Main Nav Animation
//________________________________________________________________________________________

function animateNav(){
	var tl = new TimelineMax()
	.staggerTo('.project-nav li', .5, {ease:Back.easeIn.config(2.7), y:-25, opacity:0}, .1)
	.set('.top-slant', {y:-250})
	.set('.bottom-slant', {y:1024});
	return tl;
}

// View Case Animation
//________________________________________________________________________________________

function caseIn(){
	var tl = new TimelineMax()
	.add('caseIn')
	.to('.active .names, .long-desc', 3, {ease: easeOut,x:'-=650'}, 'caseIn')
	.to('.active .desc-line', sec, {ease:easeOut, width:'-=90',delay:.05}, 'caseIn')
	.to('.active .short-desc', sec, {ease:easeOut, y:'+=50', opacity:0,delay:.1},'caseIn')
	.staggerTo(nxtBtn, sec, {ease:easeOut,x:'-=40', opacity:0,delay:.15}, .1,'caseIn')
	.to('.active .btn', sec, {y:'+=15', opacity:0, pointerEvents:'none', ease:easeOut,delay:.2},'caseIn')
	.staggerTo(sdlist, sec, {x:'-=25', opacity:0, ease:easeOut,delay:.25}, .2,'caseIn')
	.set('.projects', {overflowY:'auto'})
	.duration(1);
	return tl;
}

function caseBg(){
	var tl = new TimelineMax()
	.set('.close-btn', {display:'block', pointerEvents:'auto'})
	.set('.close-lines', {x:50, transformOrigin:'50% 50%'})

	.add('slide')
	.to('.top-slant', 1.5, {ease:Back.easeOut.config(.4), y:0, opacity:1}, 'slide')
	.to('.bottom-slant', 1.5, {ease:Back.easeOut.config(.4), y:0, opacity:1},'slide')
	.to('.about', 1.5, {ease: Expo.easeOut,y:nHeight,opacity:0}, 'slide')
	.to('.work', 1.5, {ease: Expo.easeOut,y:nHeight,opacity:0,delay:.1}, 'slide')
	.set('.navigation', {display:'none'})
	
	.add('desc', '-=.7')
	.to('.long-desc', .7, {ease:easeOut, opacity:1},'desc')
	.from('.long-desc', .7, {ease:easeOut, y:25},'desc')
	.from('.line-down', .7, {ease:easeOut, height:0, delay:0.5},'desc')
	.to('.close-lines', .7,{ease:Power4.easeOut, x:0,delay:0.5},'desc')
	.to('.close-lines:nth-child(1)', .5,{ease:Power1.easeOut, rotation:45, delay:1},'desc')
	.to('.close-lines:nth-child(2)', .5,{ease:Power1.easeOut, rotation:-45, delay:1},'desc');
	return tl;
}

// Close Case Animation
//________________________________________________________________________________________


function closeCase(){
	var tl = new TimelineMax()
	.set('.projects', {overflow:'hidden'})
	.set('.close-btn', {pointerEvents:'none'})
	
	.add('close')
	.to('.close-lines:nth-child(1)', .5,{ease:Power1.easeOut, rotation:0},'close')
	.to('.close-lines:nth-child(2)', .5,{ease:Power1.easeOut, rotation:0},'close')
	.to('.close-lines', .7,{ease:Power4.easeOut, x:50,delay:0.5},'close')
	.set('.close-btn', {display:'none'})
	.to('.line-down', .7, {ease:easeOut, height:0, delay:0.5},'close')
	.to('.long-desc', .7, {ease:easeOut, y:25,opacity:0,delay:0.7},'close')
	.set('.navigation', {display:'flex'})

	.add('slideClose')
	.to('.active .names, .long-desc', 1, {ease: easeOut,x:'+=650'}, 'slideClose')
	.to('.work', 1.5, {ease: Expo.easeOut,y:0,opacity:1}, 'slideClose')
	.to('.about', 1.5, {ease: Expo.easeOut,y:0,opacity:1,delay:.1}, 'slideClose')
	.to('.top-slant', .5, {ease:Back.easeIn.config(.4), y:-250, opacity:0}, 'slideClose')
	.to('.bottom-slant', .5, {ease:Back.easeIn.config(.4), y:1024, opacity:0},'slideClose')
	.to('.active .btn', sec, {y:'-=15', opacity:1, pointerEvents:'auto', ease:easeOut,delay:.5},'slideClose')
	.to('.active .desc-line', sec, {ease:easeOut, width:'+=90',delay:0.1}, 'slideClose')
	.to('.active .short-desc', sec, {ease:easeOut, y:'-=50', opacity:1,delay:.15},'slideClose')
	.staggerTo(nxtBtn, sec, {ease:easeOut,x:'+=40', opacity:1,delay:0.2}, .1,'slideClose')
	.staggerTo(sdlist, sec, {x:'+=25', opacity:1, ease:easeOut,delay:0.25}, .2,'slideClose')
	.set('.line-down', {height:160});
	return tl;
}

// About Page Animation
//________________________________________________________________________________________

function animateNav2(){
	var tl = new TimelineMax()
	.staggerTo('.project-nav li', .5, {ease:Back.easeIn.config(2.7), y:-25, opacity:0}, .1)
	.set('.project-nav li', {y:140,rotationX: 90, transformOrigin: "50% 50% 50%", perspective:1000, transformStyle:"preserve-3d"})
	return tl;
}
function aboutMenu(){
	var tl = new TimelineMax()
	.add('aboutMenu')
	.staggerTo('.project-nav li', .5, {ease:Back.easeIn.config(2.7), y:-25, opacity:0}, .1, 'aboutMenu')
	.to('.work-line-top', sec, {ease:Back.easeOut.config(1),height:'75%'}, 'aboutMenu')
	.to('.work-line-bottom', sec, {ease:Back.easeOut.config(1),height:'15%'}, 'aboutMenu')
	.to('.about-line-top', sec, {ease:Back.easeOut.config(1),height:'15%'}, 'aboutMenu')
	.to('.about-line-bottom', sec, {ease:Back.easeOut.config(1),height:'75%'}, 'aboutMenu')
	.to('.work-nav span', sec, {ease:easeOut,color:"#ffffff"},'aboutMenu')
	.to('.about-nav span', sec, {ease:easeOut,color:"#da7902"},'aboutMenu')
	.add( logoColor('#da7902', '#862426'),'aboutMenu');
	return tl;
}

function workMenu(){
	var tl = new TimelineMax()
	.add('workMenu')
	.to('.work-line-top', sec, {ease:Back.easeOut.config(1),height:'15%'}, 'workMenu')
	.to('.work-line-bottom', sec, {ease:Back.easeOut.config(1),height:'80%'}, 'workMenu')
	.to('.about-line-top', sec, {ease:Back.easeOut.config(1),height:'75%'}, 'workMenu')
	.to('.about-line-bottom', sec, {ease:Back.easeOut.config(1),height:'20%'}, 'workMenu')
	.to('.about-nav span', sec, {ease:easeOut,color:"#ffffff"},'workMenu')
	.to('.work-nav span', sec, {ease:easeOut,color:"#ffffff"},'workMenu')
	.add( logoColor('#ffffff', '#ffffff'),'workMenu');
	return tl;
}

function aboutIn(){
	var tl = new TimelineMax() 
	.call(function(){aboutActive=true;})
	.set('.projects', {zIndex:2})
	.staggerTo([ '.iam','.help h4', '.help a'], sec, {ease:easeOut, opacity:1,y:0,delay:.05}, .2)
	return tl;
}

function backToWork(){
	var tl = new TimelineMax()
	.call(function(){aboutActive=false;})
	.add('back')
	.staggerTo([ '.active .help a','.active .help h4','.active .iam'], sec, {ease:easeOut, opacity:0,y:'+=40',delay:.05}, .2, 'back')
	.set('.projects', {zIndex:0})
	.set('.project-nav li', {y:140,rotationX: 90, opacity: 0, transformOrigin: "50% 50% 50%", perspective:1000, transformStyle:"preserve-3d"})
	.staggerFromTo('.project-nav li', 1,{y:140,rotationX: 90, opacity: 0},{y:0,rotationX: 0, opacity: 1, ease:Back.easeOut.config(.3), onComplete:reset}, 0.2, 'back+=.3')	
	return tl;
}
$(document).ready(function(){

	$('.about-nav span').click(function(){
		if (!aboutActive) {
			master.add('about');
			master.add(aboutMenu(),'about');
			master.to('.aboutme',0.01, {className: "+=active", onComplete:aboutIn});
		}else{}

		if (activeSlide) {
			master.add('aboutOut');
			master.add(fadeOut(),'aboutOut');
			master.add(aboutMenu(),'aboutOut');
			master.to('.aboutme',0.01, {className: "+=active", onComplete:aboutIn});
		}else{}
	});

	$('.work-nav span').click(function(){
			if (aboutActive) {
				master.add('work')
				master.add(workMenu(), 'work');
				master.add(backToWork(), 'work+=.2');
				master.to('.client',0.01, {className: "-=active"},'work+=.2');
			}else{}

			if (activeSlide) {
				master.add('workOut');
				master.add(workMenu(),'workOut');
				master.add(fadeOut(),'workOut');
				master.to('.client',0.01, {className: "-=active", onComplete:backToWork},'workOut+=.5');
			}else{}

	});

	// Main Navigation
	//_________________________________________________________________________________

	$('#pp-button').click(function(){
		master.add( animateNav() );
		master.to('.paypal',0.01, {className: "+=active", onComplete:fadeIn});
		master.add( logoColor(ppblue, pproyal));
		master.to('.work-nav span', .7, {ease:easeOut,color:ppblue});
	})
	$('#mmm-button').click(function(){
		master.add( animateNav() );
		master.to('.matchmakemovein',0.01, {className: "+=active", onComplete:fadeIn});
		master.add( logoColor(mmmblack, mmmgold));
		master.to('.work-nav span', .7, {ease:easeOut,color:mmmgold});
	})
	$('#pharma-button').click(function(){
		master.add( animateNav() );
		master.to('.sinclair',0.01, {className: "+=active", onComplete:fadeIn});
		master.add( logoColor(sinblue,sinpink));
		master.to('.work-nav span', .7, {ease:easeOut,color:sinpink});
	})
	$('#zen-button').click(function(){
		master.add( animateNav() );
		master.to('.zendesk',0.01, {className: "+=active", onComplete:fadeIn});
		master.add( logoColor(zenteal, zengreen));
		master.to('.work-nav span', .7, {ease:easeOut,color:zenteal});
	})
	$('#cb-button').click(function(){
		master.add( animateNav() );
		master.to('.candy',0.01, {className: "+=active", onComplete:fadeIn});
		master.add( logoColor(cbpink, cbteal));
		master.to('.work-nav span', .7, {ease:easeOut,color:cbpink});
	})
	$('#sd-button').click(function(){
		master.add( animateNav() );
		master.to('.stinson',0.01, {className: "+=active", onComplete:fadeIn});
		master.add( logoColor(sdorange, sdblue));
		master.to('.work-nav span', .7, {ease:easeOut,color:sdorange});
	})

	// Next Button
	//_________________________________________________________________________________

	$('#clients').on('click', '.next-paypal', function(){
		master.add( fadeOut() );
		master.to('.matchmakemovein',0.01, {className: "+=active", onComplete:fadeIn});
		master.add( logoColor(mmmblack, mmmgold));
		master.to('.work-nav span', .7, {ease:easeOut,color:mmmgold});
		master.add(reset());
	});
	$('#clients').on('click', '.next-matchmakemovein', function(){
		master.add( fadeOut() );
		master.to('.sinclair',0.01, {className: "+=active", onComplete:fadeIn});
		master.add( logoColor(sinblue,sinpink));
		master.to('.work-nav span', .7, {ease:easeOut,color:sinpink});
		master.add(reset());
	});
	$('#clients').on('click', '.next-sinclair', function(){
		master.add( fadeOut() );
		master.to('.zendesk',0.01, {className: "+=active", onComplete:fadeIn});
		master.add( logoColor(zenteal, zengreen));
		master.to('.work-nav span', .7, {ease:easeOut,color:zenteal});
		master.add(reset());
	});
	$('#clients').on('click', '.next-zendesk', function(){
		master.add( fadeOut() );
		master.to('.candy',0.01, {className: "+=active", onComplete:fadeIn});
		master.add( logoColor(cbpink, cbteal));
		master.to('.work-nav span', .7, {ease:easeOut,color:cbpink});
		master.add(reset());
	});
	$('#clients').on('click', '.next-candy', function(){
		master.add( fadeOut() );
		master.to('.stinson',0.01, {className: "+=active", onComplete:fadeIn});
		master.add( logoColor(sdorange, sdblue));
		master.to('.work-nav span', .7, {ease:easeOut,color:sdorange});
		master.add(reset());
	});
	$('#clients').on('click', '.next-stinson', function(){
		master.add( fadeOut() );
		master.to('.paypal',0.01, {className: "+=active", onComplete:fadeIn});
		master.add( logoColor(ppblue, pproyal));
		master.to('.work-nav span', .7, {ease:easeOut,color:ppblue});
		master.add(reset());
	});

	// Close Button
	//_________________________________________________________________________________

	$('#clients').on('mouseover', '.close-btn',function(){
		TweenMax.to('.close-lines:nth-child(1)', .3, {ease:Back.easeOut.config(2.7), x:5, y:5});
		TweenMax.to('.close-lines:nth-child(2)', .3, {ease:Back.easeOut.config(2.7),  x:5, y:-5});
	});
	$('#clients').on('mouseout', '.close-btn',function(){
		TweenMax.to('.close-lines:nth-child(1)', .3, {ease:Back.easeOut.config(2.7), x:0, y:0});
		TweenMax.to('.close-lines:nth-child(2)', .3, {ease:Back.easeOut.config(2.7), x:0, y:0});
	});
	$('#clients').on('click', '.close-btn',function(){
		TweenMax.to('.projects', 1, {scrollTo:0, onComplete:closeCase});
	});

	// Back Button
	//_________________________________________________________________________________

	$('#clients').on('click', '.back-to-top button',function(){
		TweenMax.to('.projects', 1, {scrollTo:0, onComplete:closeCase});
	});
	

	// View Case Button
	//_________________________________________________________________________________

	$('#clients').on('click', '.view-paypal', function(){
		master.add(caseIn());
		master.add(caseBg(),'-=1');
	});

	$('#clients').on('click', '.view-matchmakemovein', function(){
		master.add(caseIn());
		master.add(caseBg(),'-=1');
	});

	$('#clients').on('click', '.view-sinclair', function(){
		master.add(caseIn());
		master.add(caseBg(),'-=1');
	});

	$('#clients').on('click', '.view-zendesk', function(){
		master.add(caseIn());
		master.add(caseBg(),'-=1');
	});

	$('#clients').on('click', '.view-candy', function(){
		master.add(caseIn());
		master.add(caseBg(),'-=1');
	});

	$('#clients').on('click', '.view-stinson', function(){
		master.add(caseIn());
		master.add(caseBg(),'-=1');
	});

  $('[data-scroll]').each(function (index, elem) {
    TweenLite.defaultOverwrite = false;
    // Init ScrollMagic Controller
    var scrollMagicController = new ScrollMagic.Controller();
		// get the current triggerHook value
     
    // Create Animations
    var details = $(elem).find('ul')
        scMain = $(elem).find('.main-color'),
        scSecond = $(elem).find('.second-color'),
        mobile = $(elem).find('.mobile-image'),
        laptop = $(elem).find('.laptop-image'),
        iso = $(elem).find('img'),
        vidGif = $(elem).find('.gif-bg'),
        featTitle = $(elem).find('.gif-desc-content h4'),
        featDesc = $(elem).find('.gif-desc-content p'),
        back = $(elem).find('button'),
        arrow = $(elem).find('button .arrow-back');
    
    var tl = new TimelineMax({pause: true});    
    tl.add("start") // add timeline label
      .staggerFromTo([scSecond,scMain], 2, { x: -500, opacity: 0 }, { x: 0, opacity: 1, ease: Power2.easeOut}, 0.2,"start")
      .staggerFromTo([mobile,laptop], 2, { x: 500, opacity: 0 }, { x: 0, opacity: 1, ease: Power2.easeOut}, 0.2,"start")
      .fromTo(iso, 3, { scale:1.1, opacity: 0 }, { scale:1, opacity: 1, ease: Power2.easeOut}, "start")
      .fromTo(vidGif, 1, { y:50, opacity: 0 }, { y:0, opacity: 1, ease: Power2.easeOut}, "start")
      .fromTo(featTitle, 1, { y:50, opacity: 0 }, { y:0, opacity: 1, ease: Power2.easeOut}, "start")
      .staggerFromTo([featTitle,featDesc], 1.5, { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: Power2.easeOut}, 0.1,"start");
    
    var tl2 = new TimelineMax({pause:true})
    .fromTo(details, 1, { y: '50px', opacity: 0 }, { y: 0, opacity: 1, ease: Power2.easeOut}, "start")
    .staggerFromTo([back,arrow], 1, { x: 50, opacity: 0 }, { x: 0, opacity: 1, ease: Power2.easeOut}, 0.1,"start");
    
    // Create the Scene and trigger when visible
    var scene = new ScrollMagic.Scene({
      triggerElement: elem,
      triggerHook:0.55,
      offset: 0
    })
    .setTween(tl)
    .addTo(scrollMagicController);

    var scene2 = new ScrollMagic.Scene({
      triggerElement: elem,
      triggerHook:0.85,
      offset: 0
    })
    .setTween(tl2)
    .addTo(scrollMagicController);
    // Add debug indicators fixed on right side
     // scene.addIndicators(); 

  });
master.add(init());
});



