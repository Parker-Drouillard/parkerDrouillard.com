window.onload = function(){
	setTimeout(function() {makeNameTextLookCool();}, 9000);
}

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