// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~
// ~___~___~___~___~___~___~___~___~___~___~ HELPER FUNCTIONS ~___~___~___~___~___~___~___~___~___~_
// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

function setDefaultFont(context){
	context.textAlign = "left";
  	context.font = "16px Courier"; 
}

function setSmallFont(context){
	context.textAlign = "left";
  	context.font = "10px Courier";
}

// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~
// ~___~___~___~___~___~___~___~___~___~___~ DEFAULT VIEW ~___~___~___~___~___~___~___~___~___~___~_
// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

function drawCharInfo(context, charInfo, xShift, yShift){
	// Background
    context.fillStyle = "black";
  	context.fillRect(xShift, yShift, 480, 50);

  	// Basic params
	setDefaultFont(context);
	var iconSize = 26;

  	// Player info
  	context.fillStyle = "white";
	context.fillText(charInfo.name+", Level "+charInfo.level, 4+xShift, 16+yShift); 

	// Area info
	context.textAlign = "right";
	context.fillText(charInfo.areaName, 470+xShift, 16+yShift); 

  	// HP
  	context.textAlign = "left";
  	context.fillStyle = "#FF4444";
	context.fillText(charInfo.hp+"/"+charInfo.maxHP+"HP",5+xShift, 40+yShift); 

  	// MP
  	context.textAlign = "center";
  	context.fillStyle = "#00CFFF";
  	context.fillText(charInfo.mp+"/"+charInfo.maxMP+"MP", 140+xShift, 40+yShift); 

  	// XP
  	context.textAlign = "center";
	context.fillStyle = "#F5FF48";
  	context.fillText((100*charInfo.xp/charInfo.xpToLevel)+"%XP", 225+xShift, 40+yShift); 

  	// Weight
  	context.textAlign = "center";
	context.fillStyle = "#E87800";
  	context.fillText(charInfo.weight+"/"+charInfo.maxWeight+"lbs", 315+xShift, 40+yShift); 

  	// Deck size
  	context.textAlign = "right";
	context.fillStyle = "#00FF80";
  	context.fillText(charInfo.curDeckSize+"/"+charInfo.maxDeckSize+" cards", 475+xShift, 40+yShift); 
}

function drawCharInfoIcon(context, spritePath,x, y, size){
	var img = new Image;
	img.onload = function(){
		context.drawImage(this, x, y, size, size);
	}
	img.src = spritePath;
}

// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

function drawMap(context, snapshot, xPos, yPos, cellWidth, cellHeight){		
  	var frameSpriteGrid = snapshot.frame;
  	var characters = snapshot.characters;

	for (var i = 0; i < frameSpriteGrid.length; i++){
        for (var j = 0; j < frameSpriteGrid[i].length; j++){        	
        	drawCell(context, frameSpriteGrid[i][j], context, xPos, yPos, cellWidth, cellHeight, i, j);
        }
    }

    for (var i = 0; i < characters.length; i++){
		drawCharacter(context, characters[i], context, xPos, yPos, cellWidth, cellHeight);
    }
}

function coordsToPixels(cellWidth, cellHeight, i, j){
	var x = cellWidth*i;
    var y = cellHeight*j;
    return {"x":x,"y":y};
}

function drawCell(context, cellSprites, context, xPos, yPos, cellWidth, cellHeight, i, j){
	var pixels = coordsToPixels(cellWidth, cellHeight, i, j);

    var groundSpritePath = cellSprites.ground;
    var objSpritePath = cellSprites.object;

	var img = new Image;
	img.onload = function(){
		context.drawImage(this, pixels.x+xPos, pixels.y+yPos, cellWidth, cellHeight);
	}
	img.src = groundSpritePath;

	if (objSpritePath !== null){
		var img = new Image;
		img.onload = function(){
			context.drawImage(this, pixels.x+xPos, pixels.y+yPos, cellWidth, cellHeight);
		}
		img.src = objSpritePath;
	}
}

function drawCharacter(context, character, context, xPos, yPos, cellWidth, cellHeight, k){
  	var spritePath = character.sprite;
  	var position = character.position;

  	var pixels = coordsToPixels(cellWidth, cellHeight, position.i, position.j);

	var img = new Image;
	img.onload = function(){
		context.drawImage(this, pixels.x+xPos, pixels.y+yPos, cellWidth, cellHeight);
	}
	img.src = spritePath;
}

// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

function drawMiniMap(context, snapshot){  
  	context.fillStyle = "black";
  	context.fillRect(481, 0, 159, 159);

  	context.fillStyle = "white";
  	context.fillText("minimap", 600, 70); 
}

function drawMiscUI1(context){
  	context.fillStyle = "black";
  	context.fillRect(481, 160, 158, 239);

  	context.fillStyle = "white";
  	context.fillText("misc 1", 575, 230); 
}

function drawMiscUI2(context, lookTargetDescription){
  	context.fillStyle = "black";
  	context.fillRect(481, 400, 158, 239);

  	context.textAlign = "left";
  	context.fillStyle = "white";
  	if (lookTargetDescription == null){
  		context.fillText("misc 2", 500, 450); 
  	} else {
  		context.fillText(lookTargetDescription, 490, 450, 140);
  	}
}

function drawMiscUI3(context){
	setDefaultFont(context);
  	context.fillStyle = "black";
  	context.fillRect(1, 531, 479, 108);

  	context.fillStyle = "white";
  	context.fillText("misc 3", 300, 590); 
}

// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~
// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~
// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

function drawLookTarget(context, cellWidth, cellHeight, lookTarget){
  	var pixels = coordsToPixels(cellWidth, cellHeight, lookTarget.i, lookTarget.j);

  	var img = new Image;
	img.onload = function(){
		context.drawImage(this, pixels.x,pixels.y+50, cellWidth, cellHeight);
	}
	img.src = "images/look.png";
}