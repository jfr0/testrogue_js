// ~___~___~___~___~___~___~___~___~ BASE CLASS ~___~___~___~___~___~___~___~___~

class MapObject{
	constructor(name, spritePath, solid, properties){
		this.name = name;
		this.spritePath = spritePath;
		this.solid = solid;
		this.properties = properties;
		this.resistance = 1;
	}

	isSolid(){
		return this.solid;
	}

	equals(){
		return false;
	}

	describe(){
		return  "A "+this.name+".";
	}
}

// ~___~___~___~___~___~___~___~___~ GROUND ~___~___~___~___~___~___~___~___~

class Ground extends MapObject{
	constructor(name, spritePath, properties){
		super(name, spritePath, false, properties);
	}

	describe(){
		return "The ground is made from ???";
	}
}

class Grass extends Ground{
	constructor(){
		super("Grass","images/grass.png", [MapObjectAttributes.Flammable]);
	}

	describe(){
		return "The ground is grass.";
	}
}

class Dirt extends Ground{
	constructor(){
		super("Dirt","images/dirt.jpg", []);
	}

	describe(){
		return "The ground is dirt."; 
	}
}

// ~___~___~___~___~___~___~___~___~ OBSTACLES ~___~___~___~___~___~___~___~___~

class Obstacle extends MapObject{
	constructor(name, spritePath, solid, properties){
		super(name, spritePath, solid, properties);
	}
}

class Tree extends Obstacle{
	constructor(){
		super("Tree","images/tree.png",true, [MapObjectAttributes.Flammable]);
	}
}

// ~___~___~___~___~___~___~___~___~ ITEMS ~___~___~___~___~___~___~___~___~


class Item extends MapObject{
	constructor(){

	}
}

// ~___~___~___~___~___~___~___~___~ EFFECTS ~___~___~___~___~___~___~___~___~

class Effect extends MapObject{
	constructor(){

	}
}

class Fire extends Effect {
	constructor(){

	}
}

// ~___~___~___~___~___~___~___~___~ CHARACTERS ~___~___~___~___~___~___~___~___~


class Character extends MapObject{
	constructor(name, spritePath, solid, position){
		super(name, spritePath, solid);
		this.position = position;
		this.hp = 10;
		this.maxHP = 10;

		this.mp = 10;
		this.maxMP = 10;

		this.level = 1;
		this.xp = 0;
		this.xpToLevel = 100;

		this.weight = 0;
		this.maxWeight = 100;
	}

	describe(){
		return "A living being.";
	}
}

class Player extends Character{
	constructor(position){
		super("Player", "images/player2.png", true, position);
		this.handSize = 1;
		this.deck = [];
		this.discard = [];
	}
}