const CharSpecies = {
	"Beast":"Beast",
	"Humanoid":"Humanoid",
	"Insect":"Insect",
	"Astral":"Astral"
}

const CharRace = {
	"Human":"Human"
}

const CharClass = {
	"Adventurer":"Adventurer",
	"Fighter":"Fighter",
	"Mage":"Mage",
	"Cleric":"Cleric",
	"Ranger":"Ranger",
	"Bard":"Bard",
	"Summoner":"Summoner",
	"Warmage":"Warmage",
	"Peasant":"Peasant",
	"Hunter":"Hunter",
	"Farmer":"Farmer",
	"Builder":"Builder",
	"Mayor":"Mayor",
	"Knight":"Knight",
	"Guard":"Guard",
	"King":"King",
	"Queen":"Queen",
	"Prince":"Prince",
	"Princess":"Princess",
	"Noble":"Noble",
	"Jailer":"Jailer"
}

const ItemAttributes = {
	"Flammable":"Flammable",
	"Fragile":"Fragile",
	"Dissolves":"Dissolves",
	"Rusts":"Rusts",
	"Combustible":"Combustible",
	"Summoned":"Summoned"
}

// Indestructible, Ethereal, Ghostly

const MapObjectAttributes = {
	"Solid":"Solid",
	"Flammable":"Flammable", // Burning
	"Combustible":"Combustible", // Explosive
	"Dissolves":"Dissolves", // Acidic
	"Rusts":"Rusts", // Wet 
}

function generateCharacterStats(charRace, charClass, charLevel){
	return {
		hp: 10,
		mp: 10
	};
}

function generatePlayerParams(){
	return {
		handSize: 1
	};
}
