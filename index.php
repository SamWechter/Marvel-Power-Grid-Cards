<!DOCTYPE html>
<html lang="en">
<head>
   <meta http-equiv="content-type" content="text/html; charset=UTF-8"/> 
	<title>Sam Wechter's Marvel Power Grid Cards</title>
	<link href='css/styles.css' rel='stylesheet' type='text/css'>
   <link href='../../css/styles.css' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="css/jquery.powertip.css" />
</head>
<body>
<?php
	 include "../../includes/webdev_nav.php";
?>
	<div id="wrapper">
		<h1>Data Visualization Project 3: Marvel Power Grid Visualizer</h1>
		<p id="intro-span">Select a character affiliation and then a character to get started! Mouse over the white question mark box if you need any help. Mouse over the green plus box to see the power grid attribute key.</p>
		<img id="grid-key-img" class="tooltip-img" src="img/Stat_key_button.png" alt="Power grid key mouseover image">
		<img id="help-img" class="tooltip-img" src="img/Help_button.png" alt="Help mouseover image">
		<div id="comparison-wrapper-1" class="comparison-wrapper">
			<div class="selector-holder">
				<select id="comparison-team-select-1" class="comparison-team-select">
					<option class="default-option">Select a character affiliation.</option>
				</select>
				<br/>
				<select id="comparison-character-select-1" class="comparison-character-select">
					<option class="default-option">Select a character.</option>
				</select>
			</div>
			<div id="comparison-div-1" class="comparison-div">
				<div id="character-card-1" class="character-card">
					<img id="character-image-1" class="character-image" alt="Character portrait 1" src="img/Missing_character_portrait.jpg">
					<a id="character-profile-link-1" class="character-profile-link"></a>
					<div id="characters-stats-1" class="character-stats">
						<span id="intelligence-1" class="intelligence character-1 attribute-span">
							
						</span>
						<br/>
						<span id="strength-1" class="strength character-1 attribute-span">
							
						</span>
						<br/>
						<span id="speed-1" class="speed character-1 attribute-span">
							
						</span>
						<br/>
						<span id="durability-1" class="durability character-1 attribute-span">
							
						</span>
						<br/>
						<span id="energy-1" class="energy character-1 attribute-span">
							
						</span>
						<br/>
						<span id="fighting-1" class="fighting character-1 attribute-span">
							
						</span>
					</div>
					<span id="character-quote-1" class="character-quote"></span>
				</div>
			</div>
		</div>
		<div id="comparison-wrapper-2" class="comparison-wrapper">
			<div class="selector-holder">
				<select id="comparison-team-select-2" class="comparison-team-select">
					<option class="default-option">Select a character affiliation.</option>
				</select>
				<br/>
				<select id="comparison-character-select-2" class="comparison-character-select">
					<option class="default-option">Select a character.</option>
				</select>
			</div>
			<div id="comparison-div-2" class="comparison-div">
				<div id="character-card-2" class="character-card">
					<img id="character-image-2" class="character-image" alt="Character portrait 2" src="img/Missing_character_portrait.jpg">
					<a id="character-profile-link-2" class="character-profile-link"></a>
					<div id="characters-stats-2" class="character-stats">
						<span id="intelligence-2" class="intelligence character-2 attribute-span">
							
						</span>
						<br/>
						<span id="strength-2" class="strength character-2 attribute-span">
							
						</span>
						<br/>
						<span id="speed-2" class="speed character-2 attribute-span">
							
						</span>
						<br/>
						<span id="durability-2" class="durability character-2 attribute-span">
							
						</span>
						<br/>
						<span id="energy-2" class="energy character-2 attribute-span">
							
						</span>
						<br/>
						<span id="fighting-2" class="fighting character-2 attribute-span">
							
						</span>
					</div>
					<span id="character-quote-2" class="character-quote"></span>
				</div>
			</div>
		</div>
	</div>
</body>

<script src="js/jquery-1.10.2.js"></script>

<!-- This is the PowerTip jQuery plugin and can be found at http://stevenbenner.github.io/jquery-powertip/ -->
<script type="text/javascript" src="src/core.js"></script>
<script type="text/javascript" src="src/csscoordinates.js"></script>
<script type="text/javascript" src="src/displaycontroller.js"></script>
<script type="text/javascript" src="src/placementcalculator.js"></script>
<script type="text/javascript" src="src/tooltipcontroller.js"></script>
<script type="text/javascript" src="src/utility.js"></script>

<script src="js/marvelPowerComparison.js"></script>

</html>