export function XP_session(level){
	switch (level){
		default:
		case 1:
			return 300
		case 2:
			return 600
		case 3:
			return 1200
		case 4: 
			return 1700
		case 5: 
			return 3500
		case 6: 
			return 4000
		case 7:
			return 5000
		case 8: 
			return 6000
		case 9:
			return 7500
		case 10:
			return 9000
		case 11:
			return 10500
		case 12: 
			return 11500
		case 13: 
			return 13500
		case 14: 
			return 15000
		case 15: 
			return 18000
		case 16:
			return 20000
		case 17:
			return 25000
		case 18: 
			return 27000
		case 19:
			return 30000
		case 20:
			return 40000
	}
}

export function XPTypes(option){
    switch (option){
        default:
        case "session":
            return [
                [1, 300],
                [2, 600],
                [3, 1200],
                [4, 1700],
                [5, 3500],
                [6, 4000],
                [7, 5000],
                [8, 6000],
                [9, 7500],
                [10, 9000],
                [11, 10500],
                [12, 11500],
                [13, 13500],
                [14, 15000],
                [15, 18000],
                [16, 20000],
                [17, 25000],
                [18, 27000],
                [19, 30000],
                [20, 40000],
            ]
        case "perKill":
			return [
				["1/8", 25],
				[1/8, 25],
				["1/4", 50],
				[1/4, 50],
				["1/2", 100],
				[1/2, 100],
				[1, 200],
				[2, 450],
				[3, 700],
				[4, 1100],
				[5, 1800],
				[6, 2300],
				[7, 2900],
				[8, 3900],
				[9, 5000],
				[10, 5900],
				[11, 7200],
				[12, 8400],
				[13, 10000],
				[14, 11500],
				[15, 13000],
				[16, 15000],
				[17, 18000],
				[18, 20000],
				[19, 22000],
				[20, 25000],
				[21, 33000],
				[22, 41000],
				[23, 50000],
				[24, 62000],
				[25, 75000],
				[26, 90000],
				[27, 105000],
				[28, 120000],
				[29, 135000],
				[30, 155000],
			]
    };
};

export async function AwardMessage(charXp, pcs) {
	let message = {}
	message.content = await renderTemplate("modules/zandora-lib/templates/awarded_experience_message.html", {xp: charXp, characters: pcs.map(pc => {return {name: pc.actor.name}})})
	ChatMessage.create(message)
	console.log(charXp)
	const levelups = pcs.filter(pc => pc.newXp >= pc.nextLevelXp && pc.level != 20)
	if (levelups.length > 0) {
		let message = {}
		// TO-DO: add sound file to the library and trigger for players that level up.
		AudioHelper.play({src: "Assets/audio/sound_efx/ui/ui_level_up.ogg", volume: 0.8, autoplay: true, loop: false}, true);
		message.content = await renderTemplate("modules/zandora-lib/templates/levelup_message.html", {characters: levelups.map(pc => pc.actor.name)})
		ChatMessage.create(message)
	}
}
