var baseWidth = 2000;
var numPages = 4;
var scrollDiv;
var debug = true;

window.onload = function(){
    document.body.style.width = window.screen.availWidth;
    // document.body.style.height = window.screen.availHeight * 3;
    setTimeout(function() {makeNameTextLookCool(); }, 9000);
    initializeHorizontalScroll();
    initializeNavBar();
    console.log("window loaded");
    scrollDiv  = document.getElementById("scroll-0");

    if(debug){
        initializeDebug();
    }

}

        // INITIALIZATIONS
        
// SETUP FUNCTION FOR DEBUGGER
function initializeDebug(){
    var debugWindow = document.getElementById("debugger-window");

    if(!debugWindow){
        console.log("DEBUG WINDOW NOT FOUND. HAS IT BEEN REMOVED FROM HTML OR COMMENTED?");
    } else {
        debugWindow.style.display = "block";
        
        var fps = document.getElementById("debug-FPS");
        var height = document.getElementById("debug-H");
        var width = document.getElementById("debug-W");

        height.innerHTML = "H: " + window.screen.availHeight + "px";
        width.innerHTML = "W: " + window.screen.availWidth + "px";
        fps.innerHTML = "FPS: <>";
        posUpdate();
    }

}

//Handles navbar initialization
function initializeNavBar(){
    var navButtons = document.getElementsByClassName("button-Header");
    for(var i = 0; i < navButtons.length; i++){
        navButtons[i].classList.add("show");
        //Navbar function
        navButtons[i].addEventListener("click", function() {
            scrollToSection(this);
        });
    }
}

//Horizontal scrolling
function initializeHorizontalScroll(){
    
    var $horizontal = $('.hIndex-0');
    var startPosition = $horizontal.position().left;
    var speed = 100;
    $(window).scroll(function () {
        var st = $(this).scrollTop();
        var newPos = -(st * (speed/100)) + startPosition;

        $horizontal.css({
            'left': newPos 
        });
        // if(debug){
        posUpdate();
        // }

        var windowWidth = window.screen.availWidth;

        if (newPos > -windowWidth){
            activateButton(document.getElementById("navHome"));
        } else if (newPos <= -windowWidth && newPos > -windowWidth * 2){
            activateButton(document.getElementById("navAbout"));
        } else if(newPos <= -windowWidth * 2 && newPos > -windowWidth * 3){
            activateButton(document.getElementById("navHackathons"));
        } else if(newPos <= -windowWidth * 3){
            activateButton(document.getElementById("navProjects"));
        }

    });
}

    //NAVBAR
function deactivateButtons(){
    var navButtons = document.getElementsByClassName("button-Header");

    for(var i = 0; i < navButtons.length; i++){
        var activeButtons = navButtons[i].getElementsByClassName("active-bar");
        for(var j = 0; j < activeButtons.length; j++){
            activeButtons[j].classList.remove("active");
        }
        navButtons[i].classList.remove("active");
    }

}

function activateButton(button){
    if(!button){
        console.log("No button called.");
    } else {
        deactivateButtons();    
            
        button.classList.add("active")

        var activeBar = button.getElementsByClassName("active-bar");
        activeBar[0].classList.add("active");
    }
}

function scrollToSection(button){
    if(button.id == "navHome"){
        window.scrollTo(0,0);
    } else if(button.id == "navAbout"){
        window.scrollTo(0, window.screen.availWidth);
    } else if(button.id == "navHackathons"){
        window.scrollTo(0, window.screen.availWidth * 2);
    } else if(button.id == "navProjects"){
        window.scrollTo(0, window.screen.availWidth * 3);
    }

    activateButton(button);
}


    // VISUAL FUNCTIONS

function makeNameTextLookCool(){
    // For troubleshooting
    if(arguments.length > 0){
        var attemptNum = arguments[0];
    } else {
        var attemptNum = 1;
    }

    var textType = document.getElementById("typeName");
    var actualTextType = document.getElementById("actualTypeName");

    if(textType && actualTextType){
        // textType.setAttribute("style", "opacity: 0;");
        textType.classList.add('hide');
        actualTextType.style.opacity = 1;

    } else {
        console.log("Error - typeName or actualTypeName not found." + attemptNum);
        attemptNum++;
        if(attemptNum < 10){
			setTimeout(function() { makeNameTextLookCool(attemptNum); }, 200); 
		} else {
			console.log("Error - Maximum number of attempts to retrieve typeName or actualTypeName. Is server busy?");
		}
    }
}





function posUpdate(){

    if(debug){
        var left = document.getElementById("debug-L");
        left.innerHTML = "L: " + scrollDiv.style.left;

    }

    if(scrollDiv.style.left > 3000){
        activateButton(navButton[0]);
    }
}