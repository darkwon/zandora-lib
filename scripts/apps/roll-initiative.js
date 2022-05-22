import actorStats from "./actor-stats.js";

export default class CombatTracker extends Combat{
    /**
     * If Speedfactor initiative is enabled, use this _rollInitiative() method instead of the default
     */  
    static _rollInitative(app, html, data){
        game.combat.data.combatants.forEach(combatant => {
        const stats = actorStats._getActor(combatant.data.actorId);
        const init = stats.map(i => i.init);
        const size = CombatTracker.initSizeMod(stats.map(i => i.size));
        var rollFormula = '1d20+' + init + '+' + size;

        game.combat.rollInitiative([combatant.data._id], {formula: rollFormula, updateTurn: false, messageOptions: {rollMode: "gmroll", create: "false"}});
        });
        setTimeout(function(){
            if (game.combat.turn != 0){
                CombatTracker.announceRound();
                CombatTracker.combatUpdate();
            }
            else{
                CombatTracker.announceRound();
            }
        }, 500);
    } 

    /**
     * 
     * @param {String} combatant - Get the size category of the combatant
     * @returns - Returns Initiative modifier by size category.
     */
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

    /**
     * Announce the current round to chat
     */
    static announceRound(){
        let messageContent = `<hr><div style="color: black; font-size: 1.75em; font-weight: bold;">ROUND ${game.combat.round}</div><hr>`
        ChatMessage.create({content: messageContent});
    }

    /**
     * Reset Combat turn to 0, fixing Foundry rollInitiative() bug
     */
    static combatUpdate(){
        console.log('za-lib: Preparing to update combatant')
        try {
            let turn = game.combat.turn;
            turn = 0;
            game.combat.update({turn}); 
        } catch (error) {
            console.log('za-lib: Combat Update Error....\n'+error);
        }

    }

    /**
     * Combat Tracker UI popout from sidebar
     */
    static popoutCombat(){
        ui.combat.createPopout().render(true);
    }
    
    /**
     * @param {string} Source -   The FoundryVTT/URL path to our play file
     * @param {number} Volume - A number from 0.1 to 1.0, default is 1.
     * @param {boolean} start - Start the sound, default is true
     * @param {boolean} repeat -  Loop this sound, default false
     */    
    static playSound(Source, Volume, start, repeat){
        try {
            let _source = Source;
            let _volume = Volume;
            let _start = start;
            let _repeat = repeat;

            if (_source === null){
                _source = 'sounds/drums.wav';
            };
            if (_volume === null){
                _volume = 1.0;
            };
            if (_start === null){
                _start = true;
            };
            if (_repeat === null){
                _repeat = false;
            };
            AudioHelper.play({src: _source, _volume: _volume, autoplay: _start, loop: _repeat}, true);
        } catch (error) {
            
        }
        
    };
}
