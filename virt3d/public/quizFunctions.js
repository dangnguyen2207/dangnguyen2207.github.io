$(document).ready(function() {
    $.getJSON("BeefVer1.json", function(json) { //Make file pulling more dynamic
        // prepare the data
        var source = {
            datatype: "json",
            datafields: [{
                name: "id"
            }, {
                name: "parentID"
            }, {
                name: "text"
            }, {
                name: "subMenuWidth"
            }, {
                name: "uri"
            }],
            id: "id",
            localdata: json
        };
		var currentCut = generateRandCut(json);
		var otherCutNames = generateOtherCutNames(json, currentCut.text);
		shuffle(otherCutNames);
		questionList(otherCutNames);
	$("#Next").click(function(event){
		$("#alert").empty();
		$("#frmName").refresh();
		$('#textbox').val('');
		tempCut = generateRandCut(json);
		while(tempCut == currentCut){
			tempCut = generateRandCut(json);
		}
		
		currentCut = tempCut;
		otherCutNames = generateOtherCutNames(json, currentCut.text);
		shuffle(otherCutNames);
		questionList(otherCutNames);
	});
	
	$("#checkButton").click(function(event){
		check(currentCut.text);
	});
	
});

function selRandCut(animal){
    var min = 0;
    var max = animal.length;
    var random = Math.floor(Math.random()*(max-min))+min;
    return animal[random];
}

function generateRandCut(animal){
	
    var cut = selRandCut(animal);
    changeQuizFrame(cut.uri);
    return cut;
}

function changeQuizFrame(modelID) {
    var url = "https://sketchfab.com/models/" + modelID + "/embed?autostart=1&annotations_visible=0";
    $("#quizFrame").attr("src", url);
}

function questionList(cutNames){
	
	$("#list1").append('<input type="radio" name="answer" id="answer1" value="'+cutNames[0]+'" /> <label for="answer">'+cutNames[0]+'</label>');
	
	$("#list2").append('<input type="radio" name="answer" id="answer2" value="'+cutNames[1]+'" /> <label for="answer">'+cutNames[1]+'</label>');
	
	$("#list3").append('<input type="radio" name="answer" id="answer3" value="'+cutNames[2]+'" /> <label for="answer">'+cutNames[2]+'</label>');
	
	$("#list4").append('<input type="radio" name="answer" id="answer4" value="'+cutNames[3]+'" /> <label for="answer">'+cutNames[3]+'</label>');
	
}

function check(answer){
	var ans;
	if(document.getElementById("answer1").checked){
		
		ans = document.getElementById("answer1").value;
		
		if(ans == answer){
			
			$("#alert").empty();
			$("#alert").append('<div class ="alert success"> <span > <strong>Correct!</strong> </span> <div>').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
		}else{
			$("#alert").empty();
			$("#alert").append('<div class ="alert"> <span > <strong>Incorrect!</strong> </span> <div>').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
		}
	}else if(document.getElementById("answer2").checked){
		
		ans = document.getElementById("answer2").value;
		
		if(ans == answer){
			
			$("#alert").empty();
			$("#alert").append('<div class ="alert success"> <span > <strong>Correct!</strong> </span> <div>').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
		}else{
			$("#alert").empty();
			$("#alert").append('<div class ="alert"> <span > <strong>Incorrect!</strong> </span> <div>').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
		}
	}else if(document.getElementById("answer3").checked){
		
		ans = document.getElementById("answer3").value;
		
		if(ans == answer){
			
			$("#alert").empty();
			$("#alert").append('<div class ="alert success"> <span > <strong>Correct!</strong> </span> <div>').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
		}else{
			$("#alert").empty();
			$("#alert").append('<div class ="alert"> <span > <strong>Incorrect!</strong> </span> <div>').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
		}
	}else if(document.getElementById("answer4").checked){
		
		ans = document.getElementById("answer4").value;
		
		if(ans == answer){
			
			$("#alert").empty();
			$("#alert").append('<div class ="alert success"> <span > <strong>Correct!</strong> </span> <div>').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
		}else{
			$("#alert").empty();
			$("#alert").append('<div class ="alert"> <span > <strong>Incorrect!</strong> </span> <div>').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
		}
	}else{
		$("#alert").empty();
		$("#alert").append('<div class ="alert info"> <span > <strong>Please select your answer!</strong> </span> <div>').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
	}
}

function generateOtherCutNames(animal, currentName){
	var cuts = [];
	cuts.push(currentName);
	
	var otherCut1 = selRandCut(animal);
	while(cuts.includes(otherCut1.text)){
		otherCut1 = selRandCut(animal);
	}
	cuts.push(otherCut1.text);
	
	var otherCut2 = selRandCut(animal);
	while(cuts.includes(otherCut2.text)){
		otherCut2 = selRandCut(animal);
	}
	cuts.push(otherCut2.text);
	
	var otherCut3 = selRandCut(animal);
	while(cuts.includes(otherCut3.text)){
		otherCut3 = selRandCut(animal);
	}
	cuts.push(otherCut3.text);
	return cuts;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
});