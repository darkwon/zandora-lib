//import {registerSettings, SETTINGS} from "../apps/settings.js";
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

export default class XPAward{
	/**
     * Render dialog handler
     * @param {*} app 
     * @param {*} html 
     * @param {*} data 
     */
	static _onrenderDialog(app, html, data) {
		//console.log('XPaward: render checkbox')
        const dialogContent = html.find("div.dialog-content");
        const yesButton = html.find("button[data-button='yes']");
        const xpCheckboxGroup = $(`<div class="form-group"><label class="xp-checkbox">Award XP? <input type="checkbox" name="award-xp"></label></div>`);

        dialogContent.after(xpCheckboxGroup);
		app.setPosition(mergeObject(app.position, {height: app.position.height + 30}));

		yesButton.on("click", event => {
            const xpCheckbox = xpCheckboxGroup.find("input");

            // Start custom flow if giving XP, otherwise just delete combat
            if (xpCheckbox.is(":checked")) {
				XPAward._giveXP(combat);
            }
        });
	}
	/**
     * Gives XP to the living PCs in the turn tracker based on enemies killed
     * @param {Object} combat -- the combat instance being deleted
     */
	static async _giveXP(combat) {
		//const xpModifier = Sidekick.getSetting(SETTING_KEYS.giveXP.modifier);
		console.log(combat)
        const hostiles = [];
        const friendlies = [];
        const defaultSelectedFriendlies = [];

        for (const turn of combat.turns) {
            const turnData = {
                actor: turn.actor,
                token: turn.token,
                name: turn.name,
                img: turn.img
            };

            switch (turn.token.data.disposition) {
                case -1:
                    hostiles.push(turnData);
                    continue;
                
                case 1:
                    friendlies.push(turnData);
                    const deselectByDefault = turn.actor.getFlag(NAME, FLAGS.giveXP.deselectByDefault);

                    if (!deselectByDefault) defaultSelectedFriendlies.push(turnData);
                    continue;

                default:
                    continue;
            }
        }

        const combatData = { combat, xpModifier, hostiles, friendlies, defaultSelectedFriendlies };
        const content = await renderTemplate(`${SETTINGS.module.path}/templates/give-xp-dialog.hbs`, combatData);

        new Dialog({
            title: "XP",
            content,
            render: html => this._distributeDialogRender(html),
            buttons: {
                okay: {
                    label: "OK",
                    callback: html => this._distributeXP(html, combatData)
                },
                cancel: {
                    label: "Cancel",
                    callback: () => {}
                }
            }
        }).render(true);		
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
        case "default":
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
