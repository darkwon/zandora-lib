//import {registerSettings, SETTINGS} from "./apps/settings.js";
import zandoralib from "./zandora-lib-api.js";
import XPAward from "./apps/XPaward.js";
import CombatTracker from "./apps/roll-initiative.js";
import actorStats from "./apps/actor-stats.js";
//import libSettings from "../settings/libsettings.js";

// Comment out to turn off debugging
//config.debug.hooks = true;

const namespace = '';
Hooks.once('init', () => {
    // Register are library settings
    //registerSettings()
    // once set up, we create our API object
    //game.modules.get(SETTINGS.module.name).api = {
        // Expose API functions
    //    getActivePlayers: zandoralib.getActivePlayers,
    //    getActors: actorStats.getPcs,
    //    awardXP: zandoralib.awardXP,
    //    preparePcData: zandoralib.preparePcData,
    //    _rollInitative: CombatTracker._rollInitative
    //};

    // now that we've created our API, inform other modules we are ready
    // provide a reference to the module api as the hook arguments for good measure
    //Hooks.callAll('zandoraLibReady', game.modules.get(SETTINGS.module.name).api);
    //game.modules.get('zandora-lib')?.api?.getActivePlayers()
});


/* ------------------- Chat ------------------- */

Hooks.on("renderChatMessage", (app, html, data) => {

});

Hooks.on("renderDialog", (app, html, data) => {
    if (app.title === game.i18n.localize("COMBAT.EndTitle")) {
        // If End of Combat Dialog, insert html before render
        XPAward._onrenderDialog(app,html,data)
    }
});

/* ------------------ Combat ------------------ */
Hooks.once("preDeleteCombat", (combat, options, userId) => {
    // Hooks on End Combat Button press
    
    // Do app XPAward
    let setting = game.settings.get(SETTINGS.module.name, 'xpAwardStyle')
    if (setting == SETTINGS.XPaward.default) {
        console.log('COMBAT: preDeleteCombat has been detected and default XP should be given')
    }
});
Hooks.on("preUpdateCombat", (combat, updateData, options, userId) => {
    // reroll initiative here with options.
    console.log('COMBAT:  next turn detected')
    console.log(game.combat.current.round)
});

let round = ''
Hooks.on("updateCombat", (combat, updateData, options, userId) => {
    console.log('COMBAT: combatant is updated')
    let newRound = game.combat.current.round
    let setting = game.settings.get(SETTINGS.module.name, 'SpeedFactorInitiative')
    if (newRound != round){
        round = newRound
        console.log('COMBAT: New round of combat detected. Round '+newRound);
        if (setting == true){
            CombatTracker._rollInitative();
        }
    }
});

Hooks.on("deleteCombat", (combat, options, userId) => {
    console.log('COMBAT: Combat has ended')
});

Hooks.on("deleteCombatant", (combatant, options, userId) => {
    console.log('COMBAT: combatantant has been deleted')
});


// if I need to do something as soon as the module is ready
//Hooks.on('zandoraLibReady', (api) => {
    // do what I need with their api
//});
  
// alternatively if I know that the API should be populated when I need it,
// I can defensively use the api on game.modules
// game.modules.get('zandora-lib')?.api?.getActivePlayers()
// game.modules.get('zandora-lib')?.api?.getPcs()