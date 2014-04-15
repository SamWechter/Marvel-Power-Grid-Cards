document.onload = init();

function init() {
	 //console.log("Initializing...");
	 
	 var dataFileDirectory = "data/";
	 
	 // Gets the power grid key file's name and loads the file
	 var gridKeyFileName = "gridKey.json";
	 gridKeyFileName = dataFileDirectory + gridKeyFileName;
	 loadData( gridKeyFileName, "gridKey" );
	 
	 // Gets the characters file's name and loads the file
	 var charactersFileName = "characters.json";
	 charactersFileName = dataFileDirectory + charactersFileName;
	 //console.log("Attempting to call loadData for characters...");
	 loadData( charactersFileName, "characters" );
}
// Loads a file then calls a parsing function
function loadData( fileName, dataType ) {
	 //console.log("Running loadData...");
	 $.getJSON( fileName, function( data ) {
		  //console.log(data);
		  handleData( data, dataType );
	 });
	 // $.getJSON was previously causing bugs so I briefly swapped to using .ajax
	 // This section is no longer necessary since I fixed .getJSON prior to the project's completion
	 /*jQuery.ajax({
		  url: fileName, 
		  type: "GET", 
		  dataType: "json",
		  success: function(data) {
				//console.log("Success!");
				//console.log(data);
				handleData( data, dataType );
		  },
		  error: function(xhr, ajaxOptions, thrownError) {
				alert( "An error occurred while trying to load Power Grid and Character data. Please try reloading the page.");
				console.log(xhr.status);
				console.log(xhr.readyState);
				console.log(thrownError);
		  }
	 });*/
}
// Handles the json data result from an ajax call
function handleData( data, dataType ) {
	 //console.log("Data received. Handling...");
	 if( dataType == "gridKey" ) {
		  // Sets gridKey JSON data in localStorage for later retrieval
		  localStorage.setItem( "gridKey", JSON.stringify( data ) );
		  
		  // Prepares the power grid key tooltip for the power grid key (green plus symbol) image
		  var keyImg = $( "#grid-key-img" );
		  var keyMessage = "Here you can find the Power Grid Key to determine what the different possible ratings for each attribute are.<br/>";
		  $.each( data, function( key, value ) {
				keyMessage += "<br/><strong>" + key + "</strong>";
				$.each( data[key][ "levels" ], function ( subKey, subValue ) {
					 keyMessage += "<br/>" + subKey + " - " + subValue;
				});
				keyMessage += "<br/>";
		  });
		  keyImg.data( 'powertip', keyMessage );
		  // Stores tooltip placement direction in a variable as Southeast
		  var keyPlacementDirection = 'se';
		  // Adds a mouseover tooltip to the power grid key image
		  keyImg.powerTip({
				placement: keyPlacementDirection, 
				followMouse: false,
				mouseOnToPopup: true
		  });
		  
		  // Prepares the help tooltip for the help (white question mark) image
		  var helpImg = $( "#help-img" );
		  var helpMessage = "Welcome to the Marvel Power Grid Visualizer! This tool was created by Sam Wechter for the Undergraduate Seminar in <br/> Data Visualization course at the Rochester Institute of Technology taught by Joe Pietruch. This tool utilizes <br/> the jQuery (www.jQuery.com) library and the PowerTip plugin for jQuery (http://stevenbenner.github.io/jquery-powertip/).";
		  helpMessage += "<br/><br/>This tool allows you to select two characters from the Marvel Comics universe (Earth-616 continuity) to compare side by <br/>side using attribute stats based on the Marvel Power Grid."
		  helpMessage += "<br/><br/>All values for character attributes are based on those listed on the Marvel Comics Database located at marvel.wikia.com <br/>so please bear in mind that there may be occasional factual inaccuracies.";
		  helpMessage += "<br/><br/>That said, I have gone to great lengths in an attempt to please Marvel fans with even the most exacting standards. <br/>If you can't find your favorite hero or villain here, please email me at saw7456 at rit dot edu and I'll add them as soon as I can.";		  
		  helpImg.data( 'powertip', helpMessage );
		  
		  // Stores tooltip placement direction in a variable as Southwest
		  var helpPlacementDirection = 'sw';
		  // Adds a mouseover tooltip to the help image
		  helpImg.powerTip({
				placement: helpPlacementDirection, 
				followMouse: false,
				mouseOnToPopup: true
		  });
	 } else if( dataType == "characters" ) {
		  // Sets character JSON data in localStorage for later retrieval
		  localStorage.setItem("charactersJson", JSON.stringify(data));
		  
		  // Sets all select options for the team selectors to unselected
		  $(".comparison-team-select").find("option:selected").prop("selected", false);
		  
		  // Loops through the data to populate the team selects with options
		  for(var key in data) {
				var newOption = "<option value='" + key.toString() + "'>" + key + "</option>";
				$(".comparison-team-select").append( newOption );
		  };
		  
		  // Adds a changed selection event listener for the team selectors
		  $(".comparison-team-select").change( generateCharacterOptions );
	 } else {
		  console.log( "An error occurred while trying to parse the loaded data." );
	 }
}
// Generates character options for the character selectors and adds appropriate properties and event handles to them
function generateCharacterOptions() {
	 // Removes the default option ("Select a character affiliation.") from the team selector because it is no longer needed
	 $( this ).find( ".default-option" ).remove();
	 // Shows the default character select option
	 $( this ).parent().find( "comparison-character-select" ).find( ".default-option" ).css( "display", "none" );
	 //checkDefaultOption( this );
	 // Disables the default team select option ("Select a character affiliation.")
	 
	 
	 // Gets the appropriate character select element
	 var targetCharacterSelect = $( this ).parent().parent().find( ".comparison-character-select" );
	 
	 // Removes any previously existing character selection options
	 var characterOptionClassName = "character-option";
	 targetCharacterSelect.find( "." + characterOptionClassName ).remove();
	 
	 // Loads character data from localStorage and parses it into JSON
	 var characterList = JSON.parse( localStorage.getItem( "charactersJson" ) );
	 
	 // Gets the selected team's name from the team selector's selected option
	 var team = $( this ).find( ":selected" ).text();
	 var teamCharacters = characterList[team];
	 
	 // Loops through characters from the selected team to populate the character selector with options
	 for( var key in teamCharacters ) {
		  var newOption = "<option value='" + key + "' class=" + characterOptionClassName + ">" + key + "</option>";
		  targetCharacterSelect.append( newOption );
		  // Makes the character selector visible since it is hidden prior to selecting a team
		  targetCharacterSelect.css( "visibility", "visible" );
	 }
	 
	 // Removes the old change event listener from the character select element if one exists
	 targetCharacterSelect.unbind( "change" );
	 
	 // Adds a change event listener to the character select element to display appropriate character data when an option
	 // 	is selected
	 targetCharacterSelect.change(  function( event ) {
		  displayCharacterData( team, characterList );
	 });
	 //console.log(teamCharacters);
}
// Displays character data for the selected character
function displayCharacterData( aTeam, aCharacterList ) {
	 // Hides the default select option. It is not removed because it will be displayed again when a different team is selected
	 $( event.target ).find( ".default-option" ).css( "display", "none" );
	 // Gets the character's name from the character selector's selected option
	 var characterName = $( event.target ).find( ":selected" ).val();
	 
	 // Gets the character's team name and JSON data
	 var characterTeam = aTeam;
	 var characterData = aCharacterList[aTeam][characterName];
	 
	 // Gets the last character of the event target's parent element to determine the character slot number (1 = Left, 2 = Right)
	 // 	I wrote my code this way to leave myself the option of potentially enabling more than two character cards at a time
	 var characterNumber = $( event.target ).parent().parent().attr("id").slice(-1);
	 
	 // Gets the card's character portrait holder and loads the appropriate character portrait directly from the Marvel Wiki
	 var portraitImageID = "#character-image-" + characterNumber;
	 //console.log(portraitImageID);
	 var portraitImg = $( portraitImageID );
	 var portraitImageURL = characterData["Image Link"];
	 portraitImg.onError = function(){
		  console.log( "An error occurred while trying to load the image at " + portraitImageURL );
	 }
	 portraitImg.onLoad = function(){
		  //console.log( "Character portrait successfully loaded!" );
	 }
	 portraitImg.attr( "src", portraitImageURL );
	 //console.log( portraitImg.attr("src") );
	 
	 // Gets the character's wiki biography URL and displays it in an anchor tag
	 var portraitURL = characterData["Profile Link"];
	 var biographyAnchorID = "#character-profile-link-" + characterNumber;
	 var biographyAnchor = $( biographyAnchorID );
	 biographyAnchor.attr( "href", portraitURL );
	 biographyAnchor.html( "Click here to check out " + characterName + "'s story on the Marvel Wiki!" );
	 
	 // Stores character attribute names
	 var characterAttributes = [ "Intelligence", "Strength", "Speed", "Durability", "Energy Projection", "Fighting Ability" ];
	 // Stores shorthand attribute names for finding appropriate spans
	 var shortAttributes = [ "intelligence", "strength", "speed", "durability", "energy", "fighting" ];
	 
	 // Loops through the characters attributes to display appropriate readouts
	 for( var i = 0; i < characterAttributes.length; i++ ) {
		  // Creates the readout message for a given character attribute
		  var attributeReadout = characterAttributes[i] + " - " + characterData[ characterAttributes[i] ];
		  var attributeNode = $( "#" + shortAttributes[i] + "-" + characterNumber );
		  // Removes any previous child (text, in this case) nodes from the attribute holder divs
		  attributeNode.empty();
		  // Appends the readout message to the attribute span
		  attributeNode.append( attributeReadout );
		  // Unbinds the mouseover eventListener in preparation for adding a new one
		  attributeNode.unbind( "mouseover" );
		  
		  var gridKey = JSON.parse( localStorage.getItem( "gridKey" ) );
		  //console.log(gridKey);
		  //console.log( gridKey[ characterAttributes[i] ] );
		  
		  // Adds a tooltip to the attribute readout so users can mouse over it to see what an attribute value means
		  attributeNode.data( 'powertip', gridKey[ characterAttributes[i] ].levels[ characterData[ characterAttributes[i] ] ] );
		  // Stores tooltip placement direction in a variable as East so tooltips show up to the right of attribute readouts
		  var placementDirection = 'e';
		  // Adds a mouseover tooltip to the attribute span
		  attributeNode.powerTip({
				placement: placementDirection
		  });
		  
		  // Sets placementDirection in the Southwest-Alternate or Southeast-Alternate position depending on card number
		  //var placementDirection = ( characterNumber == 1 ) ? 'sw' : 'se';
	 }
	 
	 // Gets the character's given quote and displays it in a span tag
	 var characterQuote = characterData["Quote"];
	 var characterQuoteSpanID = "#character-quote-" + characterNumber;
	 var characterQuoteSpan = $( characterQuoteSpanID );
	 characterQuoteSpan.html( characterQuote );
}

/*function checkDefaultOption( targetSelect ) {
	 var defaultOption = $( targetSelect ).find( ".default-option" );
	 // Checks that the default option is no longer selected
	 if( !( defaultOption.is(":selected") ) ){
		  console.log("It isn't selected");
	 }
}*/