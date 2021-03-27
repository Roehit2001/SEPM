function visFunction() {
    document.getElementById("APPimg").style.display = "block";
    document.getElementById("EXAMimg").style.display = "none";
    document.getElementById("PROJimg").style.display = "none";
    document.getElementById("INTimg").style.display = "none";
    document.getElementById("RESimg").style.display = "none";
   
    document.getElementById("APPbtn").style.backgroundColor = "#0077ff";
    document.getElementById("EXAMbtn").style.backgroundColor = "#323335";
    document.getElementById("PROJbtn").style.backgroundColor = "#323335";
    document.getElementById("INTbtn").style.backgroundColor = "#323335";
    document.getElementById("RESbtn").style.backgroundColor = "#323335";
}

function visFunction1() {
    document.getElementById("APPimg").style.display = "none";
    document.getElementById("EXAMimg").style.display = "block";
    document.getElementById("PROJimg").style.display = "none";
    document.getElementById("INTimg").style.display = "none";
    document.getElementById("RESimg").style.display = "none";

    document.getElementById("APPbtn").style.backgroundColor = "#323335";
    document.getElementById("EXAMbtn").style.backgroundColor = "#0077ff";
    document.getElementById("PROJbtn").style.backgroundColor = "#323335";
    document.getElementById("INTbtn").style.backgroundColor = "#323335";
    document.getElementById("RESbtn").style.backgroundColor = "#323335";
}

function visFunction2() {
    document.getElementById("APPimg").style.display = "none";
    document.getElementById("EXAMimg").style.display = "none";
    document.getElementById("PROJimg").style.display = "block";
    document.getElementById("INTimg").style.display = "none";
    document.getElementById("RESimg").style.display = "none";

    document.getElementById("APPbtn").style.backgroundColor = "#323335";
    document.getElementById("EXAMbtn").style.backgroundColor = "#323335";
    document.getElementById("PROJbtn").style.backgroundColor = "#0077ff";
    document.getElementById("INTbtn").style.backgroundColor = "#323335";
    document.getElementById("RESbtn").style.backgroundColor = "#323335";
}

function visFunction3() {
    document.getElementById("APPimg").style.display = "none";
    document.getElementById("EXAMimg").style.display = "none";
    document.getElementById("PROJimg").style.display = "none";
    document.getElementById("INTimg").style.display = "block";
    document.getElementById("RESimg").style.display = "none";

    document.getElementById("APPbtn").style.backgroundColor = "#323335";
    document.getElementById("EXAMbtn").style.backgroundColor = "#323335";
    document.getElementById("PROJbtn").style.backgroundColor = "#323335";
    document.getElementById("INTbtn").style.backgroundColor = "#0077ff";
    document.getElementById("RESbtn").style.backgroundColor = "#323335";
}


 

function visFunction4() {
    document.getElementById("APPimg").style.display = "none";
    document.getElementById("EXAMimg").style.display = "none";
    document.getElementById("PROJimg").style.display = "none";
    document.getElementById("INTimg").style.display = "none";
    document.getElementById("RESimg").style.display = "block";

    document.getElementById("APPbtn").style.backgroundColor = "#323335";
    document.getElementById("EXAMbtn").style.backgroundColor = "#323335";
    document.getElementById("PROJbtn").style.backgroundColor = "#323335";
    document.getElementById("INTbtn").style.backgroundColor = "#323335";
    document.getElementById("RESbtn").style.backgroundColor = "#0077ff";
}

function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {
	
	/*
	    Scroll link
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), 0);
	});
   $(".scrollbutton").click(function () {
        // get the element on the page related to the button
        var scrollToId = $(this).data("scroll");
        var scrollToElement = document.getElementById(scrollToId);
        // make the page scroll down to where you want
        // ...
    });})