class GameMap{
	constructor(mapWidth, mapHeight, frameWidth, frameHeight, areaName){
		// Map, frame width and height
		this.mapWidth = mapWidth;
		this.mapHeight = mapHeight;
		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;

		this.areaName = areaName; 

		// Construct width x height grid of GameMapCells
		this.grid = new Array(this.mapWidth);
		for (var i = 0; i < this.mapWidth; i++){
			this.grid[i] = new Array(this.mapHeight);
			for (var j = 0; j < this.mapHeight; j++){
				if (Math.random() < 0.5){
					this.grid[i][j] = new GameMapCell(new Grass());
				} else {
					this.grid[i][j] = new GameMapCell(new Dirt());
				}
			}
		}

		// Populate player
		this.player = new Player({"i":Math.floor(this.mapWidth/2), "j":Math.floor(this.mapHeight/2)});

		// Initialize window around player
		this.frame = createFrameBoundsFromPosition(this.player.position.i, this.player.position.j, this.mapWidth, this.mapHeight, this.frameWidth, this.frameHeight);

		// Create a list of characters
		this.characters = [];

		// Populate tree on map
		for (var i =0; i < this.mapWidth; i++){
			for (var j = 0; j < this.mapHeight; j++){
				if (Math.random() < 0.1){
					if (this.isEmpty(i,j)){
						this.grid[i][j].addObstacle(new Tree());
					}
				}
			}
		}
	}

	// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

	toASCII(){
		var ascii = "";
		for (var i =0; i < this.mapWidth; i++){
			for (var j = 0; j < this.mapHeight; j++){
				if (this.grid[i][j].containsObjectWithType(new Tree())){
					ascii += "T";
				}
				else if (this.grid[i][j].ground instanceof Dirt){
					ascii += " ";
				} else if (this.grid[i][j].ground instanceof Grass){
					ascii += ",";
				}
				ascii += " ";
			}
			ascii += "\n";
		}
		return ascii;
	}

	// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

	getFrameBoundaries(){
		return {
			"left":this.frame.left,
			"right":this.frame.right,
			"top":this.frame.top,
			"bottom":this.frame.bottom
		}
	}

	getFrameDimensions(){
		return {
			"width":this.frameWidth,
			"height":this.frameHeight
		}
	}

	getMapDimensions(){
		return {
			"width":this.mapWidth,
			"height":this.mapHeight
		}
	}

	addCharacter(character){
		this.characters.push(character)
	}

	getPlayer(){
		return this.player;
	}

	isEmpty(i, j){
		return (this.grid[i][j].isEmpty() && !(this.hasCharacterAt(i,j)) && 
			(this.player.position.i !== i && this.player.position.j !== j));
	}

	hasCharacterAt(i, j){
		for (var i=0; i<this.characters.length; i++){
			position = this.characters.position;
			if (position.i == i && position.j == j){
				return true;
			}
		}
		return false;
	}

	// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

	move(character, direction){
		var newCoords = directionToNewCoords(direction, character.position, this.mapWidth, this.mapHeight);
		var i = character.position.i;
		var j = character.position.j;
		var newI = newCoords.i;
		var newJ = newCoords.j;

		console.log("GameMap.move: (i,j)=("+i+","+j+") (newI, newJ)=("+newI+","+newJ+")");

		if (i==newI && j==newJ){
			return false;
		} else if (this.grid[newI][newJ].isSolid()){
			return false;
		} else {
			var newPos = {"i":newI, "j":newJ};
			character.position = newPos;
			this.frame = createFrameBoundsFromPosition(this.player.position.i, this.player.position.j, this.mapWidth, this.mapHeight, this.frameWidth, this.frameHeight);
			return true;
		}
	}

	// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

	propagateEffects(){
		
	}

	// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

	getPlayerStatsSnapshot(){
		return {
			"name":this.player.name,
			"hp":this.player.hp,
			"maxHP":this.player.maxHP,
			"mp":this.player.mp,
			"maxMP":this.player.maxMP,
			"level":this.player.level,
			"maxDeckSize":this.player.deck.length+this.player.discard.length,
			"curDeckSize":this.player.deck.length,
			"xp":this.player.xp,
			"xpToLevel":this.player.xpToLevel,
			"weight":this.player.weight,
			"maxWeight":this.player.maxWeight,
			"areaName":this.areaName
		};
	}

	getMapSnapshot(){
		var frameSnapshot =  new Array(this.frameWidth);
		var k;
		var l;
		for (var i = this.frame.left; i < this.frame.right; i++){
			k = i-this.frame.left;
			frameSnapshot[k] = new Array(this.frameHeight)
	        for (var j = this.frame.top; j < this.frame.bottom; j++){
	        	l = j-this.frame.top;
	        	frameSnapshot[k][l] = this.grid[i][j].getSprites();
	        }
	    }

	    var charSnapshot = [];
	    var charI;
	    var charJ;
	    var charMapPosition;
	    var charFramePosition;
	    var charFeatures;
	    for(var m=0; m < this.characters; m++){
	    	charI = this.characters[m].position.i;
	    	charJ = this.characters[m].position.j;
	    	if ((this.frame.left <= charI && charI < this.frame.right) &&
	    		(this.frame.top <= charJ && charJ < this.frame.bottom)){
	    		charMapPosition = this.characters[m].position;
	    		charFeatures = {"sprite":this.characters[m].spritePath,
	    						"position": {"i":charI-this.frame.left,"j":charJ-this.frame.top}}
	    		charSnapshot.push(charFeatures);
	    	}
	    }

	    var playerI = this.player.position.i;
	    var playerJ = this.player.position.j;
	    var playerFramePosition = {"i":playerI-this.frame.left, "j":playerJ-this.frame.top};
	   	var playerFeatures = {"sprite":this.player.spritePath, "position":playerFramePosition};
	   	charSnapshot.push(playerFeatures);

	    return {"frame": frameSnapshot, "characters":charSnapshot};
	}

	getCellDescription(position){
		var i = position.i;
		var j = position.j;

		console.log("GameMap.getCellDescription: Received position ("+i+","+j+")");

	    var mapCell = this.grid[i][j];

	    var description = "";

	    var charSnapshot = null;

	    var playerI = this.player.position.i;
	    var playerJ = this.player.position.j;
	    if ((i == playerI) && (j == playerJ)){
	    	description = this.player.describe();
	    } else {
	    	var charI;
		  	var charJ;
		    for(var k=0; k < this.characters; k++){
		    	charI = this.characters[k].position.i;
		    	charJ = this.characters[k].position.j;
		    	if ((i == charI) && (j == charJ)){
		    		description = this.characters[k].describe();
		    	}
		    }
	    }

	    description = description + " " + mapCell.describe();

	    return description;
	}
}

// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~
// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~
// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

class GameMapCell{
	constructor(ground){
		this.obstacles = [];
		this.ground = ground;
		this.items = []
	}

	describe(){
		var description = "";

		for(var i=0; i<this.obstacles.length; i++){
			description = description + this.obstacles[i].describe() + " ";
		}

		description = description + this.ground.describe()

		return description;
	}

	// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

	isEmpty(){
		return this.obstacles.length == 0;
	}

	isSolid(){
		for (var i=0; i<this.obstacles.length; i++){
			if (this.obstacles[i].isSolid()){
				return true;
			}
		}
		return false;
	}

	containsObjectWithType(obj){
		var a = obj;
		var b;
  		for(var i=0; i<this.obstacles.length; i++){
  			b = this.obstacles[i];
  			if ((a instanceof Array && b instanceof Array) ||
		    (a === null && b === null) ||
		    (typeof a === typeof b && b !== null && a !== null &&
		     	! (a instanceof Array) && ! (b instanceof Array))){

  				return true;
  			}
  		}
  		return false;
	}

	// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

	setGround(ground){
		this.ground = ground;
	}

	// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

	addObstacle(object){
		this.obstacles.push(object);
		this.drawIndex = 0;
	}

	removeObjectByValue(object){
		return null;
	}

	removeObjectByIndex(index){
		return null;
	}

	// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

	getSprites(){
		if (this.obstacles.length > 0){
			return {"ground":this.ground.spritePath, "object":this.obstacles[0].spritePath};
		} else {
			return {"ground":this.ground.spritePath, "object":null};
		}		
	}
}

// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~
// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~
// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~