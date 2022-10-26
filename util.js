function directionToNewCoords(direction, position, gridWidth, gridHeight){
	var i = position.i;
	var j = position.j;
	

	var newI = i;
	var newJ = j;
	switch(direction) {
		case "left":
			newI = Math.max(0, i-1);
		    break;
		case "right":
			newI = Math.min(gridWidth-1, i+1);
		    break;
		case "up":
			newJ = Math.max(0, j-1);
		    break;
		case "down":
			newJ = Math.min(gridHeight-1, j+1);
		    break;
		case "up-left":
			if (i !== 0 && j !== 0){
				newI = i - 1;
				newJ = j - 1;
			}
		    break;
		case "up-right":
			if (i !== (gridWidth-1) && j !== 0){
				newI = i + 1;
				newJ = j - 1;
			}
		    break;
		case "down-left":
			if (i !== 0 && (j !== gridHeight-1)){
				newI = i - 1;
				newJ = j + 1;
			}
		    break;
		case "down-right":
			if ((i !== gridWidth-1) && (j !== gridHeight-1)){
				newI = i + 1;
				newJ = j + 1;
			}
		    break;
	} 

	return {"i":newI, "j":newJ};
}

// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

function createFrameBoundsFromPosition(i, j, mapWidth, mapHeight, frameWidth, frameHeight){
	var frameLeft;
	var frameRight;
	var frameTop;
	var frameBottom;
	// if we're closer than floor(frameWidth/2) to left-right walls, build frame from wall
	if (i < Math.floor(frameWidth/2)){ // left
		frameLeft = 0;
		frameRight = Math.min(frameWidth, mapWidth);
	} else if (i > mapWidth - 1 - (Math.floor(frameWidth/2))){ // right
		frameLeft = Math.max(0, mapWidth - frameWidth);
		frameRight = mapWidth;
	} else {
		frameLeft = i-Math.floor(frameWidth/2);
		frameRight = i+Math.ceil(frameWidth/2);
	}

	// if we're closer than floor(frameHeight/2) to top-bottom walls, build frame from wall
	if (j < Math.floor(frameHeight/2)){ // top
		frameTop = 0;
		frameBottom = Math.min(frameHeight, mapHeight);
	} else if (j > mapHeight - 1 - (Math.floor(frameHeight/2))){ // bottom
		frameTop = Math.max(0, mapHeight - frameHeight);
		frameBottom = mapHeight;
	} else {
		var frameTop = j-Math.floor(frameHeight/2);
		var frameBottom = j+Math.ceil(frameHeight/2);
	}

	console.log("util.createFrameBoundsFromPos: L "+frameLeft+", R "+frameRight+", T "+frameTop+", B "+frameBottom);

	return {"left":frameLeft, "right":frameRight,"top":frameTop,"bottom":frameBottom};
}

// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

function isKeyInDict(dict, entry){
    for (const [key, value] of Object.entries(dict)){
        if (key == entry){
            return true;
        }
    }
    return false;
}

// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

function mapCoordinatesToFrameCoordinates(i, j, frameLeft, frameTop, frameWidth, frameHeight, mapWidth, mapHeight){
	return null;
}

function frameCoordinatesToMapCoordinates(position, frameBoundaries){
	var i = position.i;
	var j = position.j;

	var frameLeft = frameBoundaries.left;
	var frameTop = frameBoundaries.top;

	return {
		"i":i+frameLeft,
		"j":j+frameTop
	}
}

// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~
