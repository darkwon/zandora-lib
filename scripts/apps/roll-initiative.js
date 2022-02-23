import actorStats from "./actor-stats.js";

export default class CombatTracker{
    static _rollInitative(app, html, data){
        game.combat.data.combatants.forEach(combatant => {
        const stats = actorStats._getActor(combatant.data.actorId);
        const init = stats.map(i => i.init);
        const size = CombatTracker.initSizeMod(stats.map(i => i.size));
        game.combat.rollInitiative([combatant.data._id], {formula: '1d20+'+init+'+'+size,updateTurn: false,messageOptions: {rollMode: "gmroll", create: "true"}});
        });
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
}
