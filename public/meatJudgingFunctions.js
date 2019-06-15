	/***
	Meat Judging Functions (mJFunctions.js)
	Edited by: Jeevan Rajagopal
	Original Material from: Sketchfab Developer
	Date Edited: 1/26/2017
	Purpose: Decoupling of the example code given on Sketchfab Developer website in order to create a more modular set of functions that can be used to dynaimcally generate iFrames with the same functionalities
	***/
if(/meatJudge/.test(document.location)){
	var sliderReady = false; //Create global integer to help generate new IDs for each iFrame generated.
	var camPos = [0, 0, 0];
	var targetPos = [0, 0, 0];
	var CAMERA_POLLING_INTERVAL = 750;
	var CAMERA_DELTA = 0.00001;
	var numReady = 0;
	var apiArray = [undefined,undefined,undefined,undefined];//Undefined Array hardcoded to number of iFrames on meatJudging page.
	var prevCamArray = [undefined,undefined,undefined,undefined];
	var setIndex = 0;
	var index = 0;
	let currentViewer = 0;

	/*
	The sketchInitialize function is rather straightforward, as it initializes content by creating a new Sktechfab client object (which is defined in their Javascript file).
	Afterwards the .init function is called on the client, with the url passed in as an argument. Upon success, the next function sketchCamera is called. Upon failure, the error function is called instead.
	*/
	function sketchInitialize(urlid, frameNum) {
		var version = '1.0.0';
		var iframe = $('#api-frame-' + frameNum)[0];
		var client = new Sketchfab(version, iframe);
		client.init(urlid, {
			camera: 0,
			success: function(api) {
					sketchCamera(api,frameNum);
					},
			error: error
		});
	}


	var error = function() {
		console.error('Error api Sketchfab !');
	};



	function onCameraReady(){
		numReady++;
		//console.log("Ready: "+numReady);
		if(numReady === 4){
			//console.log("Starting Camera Polling");
			startCameraPolling();
		}
	}

	function startCameraPolling() {
		pollingTimer = setInterval(function() {
				// console.log("Entering pollingTimer");
			for (var x = 0; x < apiArray.length; x++) {
				(function() {
					var indx = currentViewer;
					apiArray[indx].getCameraLookAt(function(err, camera) {
						// console.log("Approaching onCameraPolled: index = "+indx);
						onCameraPolled(camera, indx);
					});
				})();
			}
		}, CAMERA_POLLING_INTERVAL);
	}
		
	function onCameraPolled(camera, indx) {
		// console.log("Entering onCameraPolled"+"\n");
		var previousCamera = prevCamArray[indx];
		if(previousCamera === undefined){
			prevCamArray[indx] = camera;
			return;
		}
		// console.log("Previous Camera = "+previousCamera+"\n");
		var positionDistance = vec3.distance(
			vec3.fromValues(camera.position[0], camera.position[1], camera.position[2]),
			vec3.fromValues(previousCamera.position[0], previousCamera.position[1], previousCamera.position[2])
		);
		// console.log("positionDistance = "+positionDistance+"\n");

		if (positionDistance > CAMERA_DELTA) {
			prevCamArray[indx] = camera;
			for (x in apiArray) {
				if(x !== indx){
					apiArray[x].setCameraLookAt(camera.position, camera.target, 0.25); //Set new positions
					console.log("Camera "+ indx + " is being moved");
				}
			}
		}
		else{
			return;
		}
	}

	/*
	sketchCamera is the function that gives the camera control to the newly created Sketchfab iframe. 
	The two major control schemes implemented are camera manipulation and rotation, through the use of buttons and a slider respectively.
	The camera manipulation uses tuples representing the x y and z coordinates, and their distance from the origin, as well as their target (what coordinates will the camera look at).
	More about these functions can be found on the Sketchfab Developer website*/

	var sketchCamera = function(api,frameNum) {
	apiArray[frameNum] = api;
	api.addEventListener('viewerready', onCameraReady);
	var target = [0.0, 0.0, 0.0];
	var cameraList = [{ //Tuples are represented as [y,x,z] coordinates
		eye: [0, -10, 0], //[0, -x, 0]
		text: 'front view'
	}, {
		eye: [-10, 0, 0], //[-x, 0, 0]
		text: 'right view'
	}, {
		eye: [0, 10, 0], //[0, x, 0]
		text: 'back view'
	}, {
		eye: [10, 0, 0], //[x, 0, 0]
		text: 'left view'
	}, {
		eye: [0, 0, 10], //[0, 0, x]
		text: 'up view'
	}, {
		eye: [0, 0, -10], //[0, 0, -x]
		text: 'down view'
	}];

	api.start(function() {});
	};

	function loadSet(data, index, setIndex){
			//console.log("Test: "+ data[0].id);
			//console.log("Set loaded");
			var testArray = data[index].allSets[setIndex].set;
			//console.log("Test Array: "+testArray[0]);
				for (var x = 0; x < testArray.length; x++) {
					sketchInitialize(testArray[x].uri, x);
				}
				
				window.ans1 = testArray[0].grade;
				window.ans2 = testArray[1].grade;
				window.ans3 = testArray[2].grade;
				window.ans4 = testArray[3].grade;	
				window.hints = data[index].allSets[setIndex].hints;
				window.reasons = data[index].allSets[setIndex].reasons;
				

	}

	function checkAns(ans1, ans2, ans3, ans4, hints, reasons){
		
		var flag = false;
		var $ = require('jquery');
		
		if (document.getElementById("drop1").value == ans1){
			document.getElementById("drop1").style.color="#4CAF50";
			document.getElementById("drop1").style.borderColor="#4CAF50";
		}else{
			document.getElementById("drop1").style.color="#f44336";
			document.getElementById("drop1").style.borderColor="#f44336";
			flag = true;
		}
		
		if(document.getElementById("drop2").value == ans2){
			document.getElementById("drop2").style.color="#4CAF50";
			document.getElementById("drop2").style.borderColor="#4CAF50";
		}else{
			document.getElementById("drop2").style.color="#f44336";
			document.getElementById("drop2").style.borderColor="#f44336";
			flag = true;
		}
		
		if(document.getElementById("drop3").value == ans3){
			document.getElementById("drop3").style.color="#4CAF50";
			document.getElementById("drop3").style.borderColor="#4CAF50";
		}else{
			document.getElementById("drop3").style.color="#f44336";
			document.getElementById("drop3").style.borderColor="#f44336";
			flag = true;
		}

		if(document.getElementById("drop4").value == ans4){
			document.getElementById("drop4").style.color="#4CAF50";
			document.getElementById("drop4").style.borderColor="#4CAF50";
		}else{
			document.getElementById("drop4").style.color="#f44336";
			document.getElementById("drop4").style.borderColor="#f44336";
			flag = true;
		}
		
		if(flag == true){
			$("#alert").empty();
			getHints(hints);
					
		}else{
			$("#alert").empty();
			getReasons(reasons);
					
		}
		
	}

	function getHints(fileName){
		var $ = require('jquery');
		$.get("/hints_and_reasons/" + fileName + ".txt", function(data) {
				$("#alert").append('<div class ="alert">Hints: <br></br>'+data+'</span> <div>').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
			}).fail(function() {
				$("#alert").empty();
			});
	}

	function getReasons(fileName){
		var $ = require('jquery');
		$.get("/hints_and_reasons/" + fileName + ".txt", function(data) {
				$("#alert").append('<div class ="alert success"> Reasons: <br></br>'+data+'</span> <div>').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
			}).fail(function() {
				$("#alert").empty();
			});
	}


	function checkUnique(elementID) {
		var elt = document.getElementById(elementID);                       
		var valCounter = {};

		var othercodes = [
			document.getElementById('drop1').value,
			document.getElementById('drop2').value,
			document.getElementById('drop3').value,
			document.getElementById('drop4').value
			
		];
		for(var i=0; i<=3; i++){
			var c = valCounter[othercodes[i]] = (valCounter[othercodes[i]] || 0) + 1;
			if(othercodes[i] == "Select Grade"){
				document.getElementById("checkButton").setAttribute("disabled","disabled"); 
				document.getElementById("notification").innerHTML = "Answer can not be empty!";
				return false;
			}
			if(c > 1){
				document.getElementById("checkButton").setAttribute("disabled","disabled"); 
				// so that it stops form submission;
				document.getElementById("notification").innerHTML = "Boxes must have unique value!";
				return false;
			}
		}
		document.getElementById("notification").innerHTML = "";
		document.getElementById("checkButton").removeAttribute("disabled");    
		// so that it allows form submission again;
	}

	$(document).ready(function() {
		$.getJSON("meatJudging.json", function(data) { //Make file pulling more dynamic
			$.each(data, function(i, field) {
				//	console.log(field);
					//console.log("Cuts: " + field.id + "\n");
				});
		var $select = $('#cutMenu');
		var listitems;
		$.each(data, function(key, value){
			//console.log("Key: "+key+"\n");
			//console.log("Value: "+value.name+"\n");
			listitems += '<option value=' + key + '>' + value.name + '</option>';
		});
		$select.append(listitems);

			$("#cutMenu").change(function () {
				console.log("Entering change function\n");
				var selectedText = $(this).find("option:selected").text();
				index = $(this).val();
				console.log("Index is now "+ index+"\n");
				setIndex = 0;
				loadSet(data,index,setIndex);
				$("#alert").empty();
				$("#drop1").each(function() { this.selectedIndex = 0; this.style.color="gray"; this.style.borderColor="gray"; });
				$("#drop2").each(function() { this.selectedIndex = 0; this.style.color="gray"; this.style.borderColor="gray"; });
				$("#drop3").each(function() { this.selectedIndex = 0; this.style.color="gray"; this.style.borderColor="gray"; });
				$("#drop4").each(function() { this.selectedIndex = 0; this.style.color="gray"; this.style.borderColor="gray"; });
				
			});
		
			
			let arrayBound = (data[index].allSets.length)-1;
			//console.log("ArrayBound : "+arrayBound +"\n");
			loadSet(data, index, setIndex);
			$("#previous").click(function() {
				setIndex--;
				if(setIndex < 0){
					setIndex = (arrayBound);
				}
				console.log("Previous clicked; Index is "+index+ " and setIndex is "+setIndex+"\n");
				loadSet(data, index, setIndex);
				$("#alert").empty();

			});
			$('#next').click(function() {
				setIndex++;
				if(setIndex > (arrayBound)){
					setIndex = 0;
				}
				console.log("Next clicked; Index is "+index+ " and setIndex is "+setIndex+"\n");
				loadSet(data, index, setIndex);
				$("#alert").empty();
				$("#drop1").each(function() { this.selectedIndex = 0; this.style.color="gray"; this.style.borderColor="gray"; });
				$("#drop2").each(function() { this.selectedIndex = 0; this.style.color="gray"; this.style.borderColor="gray"; });
				$("#drop3").each(function() { this.selectedIndex = 0; this.style.color="gray"; this.style.borderColor="gray"; });
				$("#drop4").each(function() { this.selectedIndex = 0; this.style.color="gray"; this.style.borderColor="gray"; });

				
			});
			$("#checkButton").click(function(event){
				checkAns(window.ans1, window.ans2, window.ans3, window.ans4, window.hints, window.reasons);
			});
			
			$('#api-frame-0').mouseover(function(event) {
				if(event.buttons === 0){
					currentViewer = 0;
					console.log("Current Viewer: 0");
				}
			});
			
			$('#api-frame-0').mouseup(function(event) {
				if(event.buttons === 0){
					currentViewer = 0;
					console.log("Current Viewer: 0");
				}
			});

			
			$('#api-frame-1').mouseover(function(event) {
				if(event.buttons === 0){
				currentViewer = 1;
				console.log("Current Viewer: 1");				
				}
			});
			
			$('#api-frame-1').mouseup(function(event) {
				if(event.buttons === 0){
					currentViewer = 0;
					console.log("Current Viewer: 0");
				}
			});

			
			$('#api-frame-2').mouseover(function(event) {
				if(event.buttons === 0){
				currentViewer = 2;
				console.log("Current Viewer: 2");
				}
			});
			
			$('#api-frame-2').mouseup(function(event) {
				if(event.buttons === 0){
					currentViewer = 0;
					console.log("Current Viewer: 0");
				}
			});

			
			$('#api-frame-3').mouseover(function(event) {
				if(event.buttons === 0){
				currentViewer = 3;
				console.log("Current Viewer: 3");
				}
			});
			
			$('#api-frame-3').mouseup(function(event) {
				if(event.buttons === 0){
					currentViewer = 0;
					console.log("Current Viewer: 0");
				}
			});

			
		});
	});
}