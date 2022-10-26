function startGame(){
    console.log("main.startGame(): Initializing game.");
    game = new Game();

    document.addEventListener('keypress', function(event) {
        game.processInput(event.key); 
    });
}

// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~
// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~
// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

const GameMode = {
    "Move":"Move",
    "Look":"Look"
}

// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

const Direction = {
    "h":"left",
    "l":"right",
    "k":"up",
    "j":"down",
    "y":"up-left",
    "u":"up-right",
    "n":"down-left",
    "m":"down-right"
}

const ChangeMode = {
    "q":"Quit",
    "s":"Look"
}

// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~
// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~
// ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

class Game{
    constructor(){

        var canvas = document.getElementById("gameCanvas");
        this.context = canvas.getContext("2d");

        this.mapWidth = 20;
        this.mapHeight = 20;
        this.frameWidth = 15;
        this.frameHeight = 15;

        this.mapXPos = 0;
        this.mapYPos = 50;
        this.mapCellWidth = 32;
        this.mapCellHeight = 32;

        this.curAreaName = "Test Area";
        this.curRegionName = "Test Region";

        this.lookTarget = {"i":0,"j":0};
        this.lookTargetDescription = null;

        this.mode = GameMode.Move;

        this.map = new GameMap(this.mapWidth, this.mapHeight, this.frameWidth, this.frameHeight, this.curAreaName);

        this.draw();
    }

    // https://stackoverflow.com/questions/64920641/flickering-images-with-javascript

    // ~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~___~

    processInput(input){
        if (isKeyInDict(ChangeMode, input)){
            this.mode = this.inputToMode(input);
        } else {
            this.inputToAction(input);
        }
        this.draw();       
    }

    inputToMode(input){
        if (input == "s" && this.mode !== GameMode.Look){
            this.lookTarget = {"i":this.map.player.position.i-this.map.frame.left, "j":this.map.player.position.j-this.map.frame.top};
            this.lookTargetMap = frameCoordinatesToMapCoordinates(this.lookTarget, this.map.getFrameBoundaries());
            this.lookTargetDescription = this.map.getCellDescription(this.lookTargetMap);
            return GameMode.Look;
        }

        if (input == "q" && this.mode !== GameMode.Move){
            this.lookTargetDescription = null;
            return GameMode.Move;
        }
    }

    inputToAction(input){
        if (this.mode == GameMode.Move && isKeyInDict(Direction,input)){
            console.log("Game.processInput: [Move] '"+input+"' parsed to direction "+Direction[input]);
            this.map.move(this.map.getPlayer(),  Direction[input]);        
        }

        if (this.mode == GameMode.Look && isKeyInDict(Direction,input)){
            console.log("Game.processInput: [Look] '"+input+"' parsed to direction "+Direction[input]);
            
            this.lookTarget = directionToNewCoords(Direction[input], this.lookTarget, this.frameWidth, this.frameWidth);
            this.lookTargetMap = frameCoordinatesToMapCoordinates(this.lookTarget, this.map.getFrameBoundaries());
            this.lookTargetDescription = this.map.getCellDescription(this.lookTargetMap);
        }
    }

    draw(){
        drawCharInfo(this.context, this.map.getPlayerStatsSnapshot(), 0, 0);
        drawMap(this.context, this.map.getMapSnapshot(), this.mapXPos, this.mapYPos, this.mapCellWidth, this.mapCellHeight);
        drawMiniMap(this.context, this.map.getMapSnapshot());
        drawMiscUI1(this.context);
        drawMiscUI2(this.context, this.lookTargetDescription);
        drawMiscUI3(this.context);     

        if (this.mode == GameMode.Look){
            drawLookTarget(this.context, this.mapCellWidth, this.mapCellHeight, this.lookTarget);
        }
    }   
}
