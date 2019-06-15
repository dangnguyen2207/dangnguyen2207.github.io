/***
Model Viewing Function (functions.js)
Written By: Jeevan Rajagopal, Spencer Kulwicki, Ben Frodyma, Dang Nguyen
Edited By: Brady Garvin
Written on: 12/9/2016
Purpose: Create dynamically generated cascading menu structures using the JQXMenu as a base framework, then building off of it using JSON to establish cut heirarchy (Primal > Sub-Primal > Retail). The JSON file itself contains a small list of cuts, but also serves as a template by which further additions are simplified.
		 Furthermore, improvements to user experience through the creation of dynamic breadcrumbs which can be used to navigate the cut hierarchy were implemented in this page, along with a rudimentary display for mobile devices.
		 Finally, accordion widgets, which provided detailed information about a given cut was given dynamic functionality, each cut having separately generated accordions. A template was also attached to allow easy customization and further additions when necessary.
***/


"use strict";

/*
changeSketchFab is straightforward in that it literally changes the url to what the argument is (assumnig an existing model is passed in)
The frame is then updated to show this change.
*/


function changeSketchFab(modelURL,modelID) {
    var version = '1.0.0';
	$("#anno").empty();
	console.log("Frame before: "+iframe+"\n");
    var iframe = $("#sketchFrame")[0];
	console.log("Frame After: "+iframe+"\n");
    var client = new Sketchfab(version, iframe);
    client.init(modelURL, {
        camera: 0,
        success:function(api) {
			console.log("entered");
                annoSync(api,iframe,modelID);
                },
        error: error
    });
};

var error = function() {
    console.error('Error api Sketchfab !');
};

var annoSync = function(api,iframe,modelID) {
	
	api.addEventListener('viewerready',function(){
		api.addEventListener('annotationFocus', function(index) {
			
			var currentAnnotation = 1 + index;
			api.getAnnotationList( function( err, annotations ){
				var annoName = annotations[index].name;
				getAnno(modelID, currentAnnotation, annoName);
			});
			
			
			
});
	});
	api.start(function() {});
};

function getAnno(modelID, fileName, annoName){
	var $ = require('jquery');
	$.get("/annoSync/"+modelID+"/" + fileName + ".html", function(data) {
			$("#anno").empty();
			$("#anno").append(''+annoName+' <br></br>'+data+'</span></div>');
        }).fail(function() {
            $("#anno").empty();
        });
}

/*
Self-explanatory, but the function returns a boolean for if the webpage is being viewed through a mobile device or not.
*/

function checkMobile() {

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

}

/*
Function is mainly used to adapt the cascading menu to work in a mobile setting where jqxwidgets has different functionality.
This function maintains functionality across mobile and desktop workspaces, ensuring that one tap on mobile opens the next level in the hierarchy and the second tap changes the sketchfab model.5
*/

function isReadyToOpenMobile(callingID) {
    return (!$('#' + callingID).children('span').size() && !$('#' + callingID).is('.jqx-menu-item-top')) || $('#' + callingID).is('.jqx-menu-item-selected') || $('#' + callingID).is('.jqx-menu-item-top-selected');
}

/*
menuResponse is the primary method by which the dynamically generated cascading menu updates the iFrame below it, the accordion below that, and the breadcrumbs above the menu.
The first argument refers to the JSON file that is passed in, and the second argument refers to the desired ID. This function then performs a linear search through all IDs until the proper one is found,
then calls the necessary functions to update relevant information.
*/

function menuResponse(animal, modelID) {
    for (var i = 0; i < animal.length; i++) {
        if (animal[i].id === modelID) {
            changeSketchFab(animal[i].uri, animal[i].id);
            changeAccordion(animal[i].id);
            buildCrumbs(animal, animal[i].id);
            return true;
        }
    }
    return false;
}

function changeAccordion(id) {
    WDN.initializePlugin('jqueryui', [function() {
        var $ = require('jquery');
        $.get("accordion/" + id + ".html", function(data) {
            $("#accordion").html(data);
            $("#accordion").accordion({
                heightStyle: "content"
            }).accordion("refresh");
        }).fail(function() {
            $("#accordion").empty();
        });

    }]);
}

/*
	Rehashing part of the menuResponse function, this function looks for and compares the cut that was clicked on, and then returns the object.
	This function is only used for the generation of the breadcrumb-list.
*/

function findCut(animal, cutID) { //Args is array of objects and integer
    if (cutID === -1) { //If we've already exited the tree structure
        return;
    }
    for (var x = 0; x < animal.length; x++) {
        if (animal[x].id === cutID) {
            return animal[x]; //Returns object
        }
    }
    return undefined;//If the cut is not found.
}
/*
	This function simply calls the findCut function (to keep code DRY), and then returns the parent cut (the cut that is one level above it in the hierarchy).
	This function is only used for the generation of the breadcrumb-list.
*/

function getParentCut(animal, currentCut) {
    var parentCut = findCut(animal, currentCut.parentID);
    return parentCut;
}
/*
	This function is the primary generator for the dynamic breadcrumbs. Each time menuResponse is called, the current breadcrumb-list is emptied, and then a new one, starting from bottom to top in the cut hierarchy is created.
	Each crumb is then given the same functionality as a menu item, creating an easier method for backtracking.
	This function is only used for the generation of the breadcrumb-list.
*/


function buildCrumbs(animal, cutID) {
	
    $("#breadcrumb-list").empty();
    for (var currentCut = findCut(animal, cutID); currentCut !== undefined; currentCut = getParentCut(animal, currentCut)) {
        var crumb;
        (function() { //Anonymous function creation to change scope
            var currentID = currentCut.id;
            crumb = $('<li><a href="#">' + currentCut.text + '</a></li>').on('click', function() {
                menuResponse(animal, currentID); //Changes iFrame/Sketchfab
            });
        })();
        $("#breadcrumb-list").prepend(crumb);
    }

}

$(document).ready(function() {
    $.getJSON("/public/BeefVer1.json", function(json) { //Make file pulling more dynamic
        // prepare the data
        var source = {
            datatype: "json",
            datafields: [{
                name: 'id'
            }, {
                name: 'parentID'
            }, {
                name: 'text'
            }, {
                name: 'subMenuWidth'
            }, {
                name: 'uri'
            }],
            id: 'id',
            localdata: json
        };
        // create data adapter.
        var dataAdapter = new $.jqx.dataAdapter(source);
        // perform Data Binding.
        dataAdapter.dataBind();
        var records = dataAdapter.getRecordsHierarchy('id', 'parentID', undefined, [{
            name: 'text',
            map: 'html'
        }]);
        $('#jqxWidget').jqxMenu({
            source: records,
            height: 30,
            clickToOpen: checkMobile(),
        }).on('itemclick', function(event) {
            var id = event.args.id;
            // Check if the id is a leaf node or an already open parent or an already open top level item.
            // Checking for leaf nodes involves checking if the node has any children and also a check to make sure that
            // the node is not a top level node, since the top level doesn't have "span" children either.
            if (isReadyToOpenMobile()) {
                menuResponse(json, id); //Finds URL of clicked item AND changes the iFrame accordingly.
            }
        });
		var firstID = undefined;
		for(var i = 0; i < json.length; i++){
			console.log(i);
			if(json[i].parentID == -1){
				
				firstID = json[i].id;
				break;
			}
		}
		
		if(firstID === undefined){
			console.log("There is no root level that has a parentID of -1 in the Json file.");
		}else{
			menuResponse(json, firstID);
			changeAccordion(firstID);
		}
		
		
    });

});


//Testing Annotation Sync




