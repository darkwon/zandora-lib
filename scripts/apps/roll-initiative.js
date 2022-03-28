import actorStats from "./actor-stats.js";

export default class CombatTracker{
    static _rollInitative(app, html, data){
        game.combat.data.combatants.forEach(combatant => {
        const stats = actorStats._getActor(combatant.data.actorId);
        const init = stats.map(i => i.init);
        //const initAdv = stats.map(i => i.initAdv);
        const size = CombatTracker.initSizeMod(stats.map(i => i.size));
        var rollFormula = '1d20+' + init + '+' + size;

        //game.combat.rollInitiative([combatant.data._id], {formula: '1d20+'+init+'+'+size,updateTurn: false, messageOptions: {rollMode: "gmroll", create: "false"}});
        game.combat.rollInitiative([combatant.data._id], {formula: rollFormula,updateTurn: false, messageOptions: {rollMode: "gmroll", create: "false"}});
        });
    this.announceRound();
    } 

    static initSizeMod(combatant){
        if (combatant == 'tiny'){
            return 5;
        }
        else if (combatant == 'sm'){
            return 2;
        }
        else if (combatant == 'med'){
            return 0;
        }
        else if (combatant == 'lg'){
            return -2;
        }
        else if (combatant == 'huge'){
            return -5;
        }
        else if (combatant == 'grg'){
            return -8;
        }
        else{
            console.log('debug: could not find size modifier')
            return 0;
        }
    };
    static announceRound(){
        // Announces the current round to chat
        let messageContent = `<hr><div style="color: black; font-size: 1.75em; font-weight: bold;">ROUND ${game.combat.round}</div><hr>`
        ChatMessage.create({content: messageContent});
    }

    static popoutCombat(){
        // If setting is enabled, automatically pops the combat tab out
        ui.combat.createPopout().render(true);
    }
}
