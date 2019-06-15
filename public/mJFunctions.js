/***
Meat Judging Functions (mJFunctions.js)
Edited by: Jeevan Rajagopal
Original Material from: Sketchfab Developer
Date Edited: 1/26/2017
Purpose: Decoupling of the example code given on Sketchfab Developer website in order to create a more modular set of functions that can be used to dynaimcally generate iFrames with the same functionalities
Issues: Currently (1/31/2017) the biggest issue lies in the fact that while all iFrames do gain camera manipulation via buttons, the slider functionality seems to only affect the most recently generated iFrame.
***/

var iFrameNum = 0;//Create global integer to help generate new IDs for each iFrame generated.

/*
createIFrame is used to create the html portion of the iframe component. The iframe is given a specific height, though other properties of an iframe can be listed here.
The frame is then appended to the end of the list of iFrames and then the function calls sketchInitialize to begin creating the content for the frame.
*/

function createIFrame(urlid){
	var oIFrameElement = document.createElement("iframe");
	oIFrameElement.height = 500;
	oIFrameElement.frameBorder = 0;
	oIFrameElement.id = "api-frame-"+iFrameNum;
	document.getElementById("frameList").appendChild(oIFrameElement);
	sketchInitialize(urlid,oIFrameElement);
	iFrameNum++;
}
var error = function() {
    console.error('Error api Sketchfab !');
};

/*
The sketchInitialize function is rather straightforward, as it initializes content by creating a new Sktechfab client object (which is defined in their Javascript file).
Afterwards the .init function is called on the client, with the url passed in as an argument. Upon success, the next function sketchCamera is called. Upon failure, the error function is called instead.
*/

function sketchInitialize(urlid,iFrameElement){
	var version = '1.0.0';
	var iframe = document.getElementById( iFrameElement.id );
	console.log("iframe = " + iframe);
	//var iframe_1 = $('#api-frame-1')[0]; Example of what I'm trying to do
	var url = urlid;
	var client = new Sketchfab(version, iframe);
	client.init(url, {
		success: sketchCamera,
		error: error
	});
}

/*
sketchCamera is the function that gives the camera control to the newly created Sketchfab iframe. 
The two major control schemes implemented are camera manipulation and rotation, through the use of buttons and a slider respectively.
The camera manipulation uses tuples representing the x y and z coordinates, and their distance from the origin, as well as their target (what coordinates will the camera look at).
More about these functions can be found on the Sketchfab Developer website
*/


//May need sketchCamera to act on a for loop to control all of the iframes effectively, but this may lead to issues due to iterative functions being linear
var sketchCamera = function(api) {

    var camApi = api;

    var target = [0.0, 0.0, 0.0];

    var cameraList = [{ //Tuples are represented as [y,x,z] coordinates
        eye: [0, -7, 0],
        text: 'front view'
    }, {
        eye: [-7, 0, 0],
        text: 'right view'
    }, {
        eye: [0, 7, 0],
        text: 'back view'
    }, {
        eye: [7, 0, 0],
        text: 'left view'
    }, {
        eye: [0, 0, 7],
        text: 'up view'
    }, {
        eye: [0, 0, -7],
        text: 'down view'
    }];

        camApi.start(function() {

            $('#front').click(function() {
                camApi.lookat(cameraList[0].eye, target, 3);
            });

            $('#right').click(function() {
                camApi.lookat(cameraList[1].eye, target, 3);
            });

            $('#back').click(function() {
                camApi.lookat(cameraList[2].eye, target, 3);
            });

            $('#left').click(function() {
                camApi.lookat(cameraList[3].eye, target, 3);
            });

            $('#up').click(function() {
                camApi.lookat(cameraList[4].eye, target, 3);
            });

            $('#down').click(function() {
                camApi.lookat(cameraList[5].eye, target, 3);
            });

        

			$("#slider").slider({
				slide: function(event, ui) {
					var val = $('#slider').slider("value");
					var x = Math.cos(val * .01 * 6.28) * 6;
					var y = Math.sin(val * .01 * 6.28) * 6;
					var z = 0;
					camApi.lookat([y, -x, z], [0, 0, 0], 0);
				}
			});
		});
};
