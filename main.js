CONFIG.debug.hooks = true;

import Module from './module.js';
import UI from './ui.js';
import PartyFrameSettings from "./settings/PartyFrame.js";
import zandoralib from "./scripts/zandora-lib-api.js";
import libSettings from "./settings/libsettings.js";
import actorStats from "./scripts/apps/actor-stats.js";
import XPAward from "./scripts/apps/XPaward.js";
import CombatTracker from "./scripts/apps/roll-initiative.js";
import ToolTip from "./components/za-tooltip/za_tooltip.js";
import LibHooks from "./components/hooks/hooks.js";
import Factions from "./components/Factions/Factions.js";
import soundlab from "./components/soundlab/soundlab.js";
import ui from './ui.js';
//import bagbar from "./components/bagbar/bagbar.js";
const namespace = 'zandora-lib';
const settings = {
  librarySettings:new libSettings(namespace),
  //partyframe:new PartyFrameSettings(namespace),
}


Hooks.once('init', () => {
  // TO-DO INIT FUNCTIONS
  UI.init(Module.init(game, settings), UI, settings);
  Handlebars.registerPartial('myPartial', '{{>"modules/zandora-lib/templates/ui/ui-token-tooltip.hbs"}}');
  game.modules.get(namespace).api = {
    // Expose API functions
    getActivePlayers: zandoralib.getActivePlayers,
    getActors: actorStats.getPcs,
    awardXP: zandoralib.awardXP,
    preparePcData: zandoralib.preparePcData,
    _rollInitative: CombatTracker._rollInitative
  };
  // now that we've created our API, inform other modules we are ready
  // provide a reference to the module api as the hook arguments for good measure
  Hooks.callAll('zandoraLibReady', game.modules.get(namespace).api);

  // Define our Handlebars helpers
  Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
        
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
  });
});

Hooks.once('setup', () => {
  // TO-DO SETUP FUNCTIONS
  Module.setup();
  UI.setup();
});

Hooks.once('ready', () => {
  // TO-DO SETTINGS REGISTER CLASS  
  for(const settingConfig of Object.values(settings)){
    settingConfig.register(game);
  }

  //TO-DO: MODULE READY HOOK
  Module.ready();
  UI.ready();
  // Create custom hooks
  LibHooks.register();
  Factions.database();
  //bagbar.init();
});

Hooks.on("canvasReady", () => {
  //if (ui.bagFrames) ui.bagFrames.render();

  //Hooks.callAll(`${constants.moduleName}:afterCanvasReady`);
});

Hooks.on('controlToken', (object, controlled) => {
  //UI._backpackHotbar.actorId = object.data.actorId;
  //console.log(object);
  //Factions.test();
});
Hooks.on('deleteItem', ([,,data]) => {
  //if(UI._backpackHotbar.actorId === data.actorId){
  //  UI._backpackHotbar.render();
  //}
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
    let setting = game.settings.get(namespace, 'xpAwardStyle')
    if (setting == 'default') {
        console.log('COMBAT: preDeleteCombat has been detected and default XP should be given')
    }
});

Hooks.on("preUpdateCombat", (combat, updateData, options, userId) => {
    // reroll initiative here with options.
    console.log('Combat: preUpdateCombat event')
    try {
      let setting = game.settings.get(namespace, 'SpeedFactorInitiative')
      let turn = game.combat.turn
      let turns = game.combat.turns.length -1
      //console.log('zandora-lib: Current turn ' + turn + ' of ' + turns)
      if (turn == turns){
        if (setting == true){
          CombatTracker._rollInitative();
        }        
      }
    } catch (error) {
      console.log('zandora-lib: ' + error)
    }
});

Hooks.on("updateCombat", (combat, updateData, options, userId) => {
    console.log('COMBAT: combatant is updated')
});

Hooks.on("deleteCombat", (combat, options, userId) => {
  console.log('COMBAT: Combat has ended')
  let sound = game.settings.get(namespace, 'combatFinishedSound')
  if (sound !== null){
    //CombatTracker.playSound(sound,0.8, true, false)
    soundlab.play(sound, 0.4);
  };
});

Hooks.on("deleteCombatant", (combatant, options, userId) => {
    console.log('COMBAT: combatantant has been deleted')
});


/* ------------------ Token ------------------ */
Hooks.on("hoverToken", (token, options, evt) => {
  //const elem = document.getElementById('board');

  let setting = game.settings.get(namespace, 'tooltips');
  let template = 'modules/zandora-lib/templates/ui/ui-token-tooltip.hbs';
  if (setting == true){
    if (options == false){
      ToolTip.delete('za-tooltip-default');
    }

    if(options == true){
      ToolTip.create(token, 'board','za-tooltip-default', template);
    }    
  }
});

/* ------------------ ActionBar Hooks ------------------ */
Hooks.on("actionHover", (macro) => {
  console.log('Our first hook')
});

/* ------------------ UI Functions ------------------ */
Hooks.on("preUpdateWall", (document, obj, render, type) => {
  const _isDoor = document.data.door;
  const _doorOpen = game.settings.get(namespace, 'doorOpenSound');
  const _doorClose = game.settings.get(namespace, 'doorCloseSound');
  const _doorUnlocked = game.settings.get(namespace, 'doorUnlockSound');
  
  // Check state of door, states are 0 "closed", 1 "open", 2 "locked"
  const _doorstate = canvas.walls.doors.filter(d => d.document.data._id === document.data._id);
  const currentState = _doorstate.map(d => ({_id: d.id, ds: d.data.ds}));

  if (_isDoor === 1){
    if (obj.ds === 0){
      if (currentState[0].ds === 2){
        // Doo something if player unlocks door
        console.log('zandora-lib: Door Unlocked');
        soundlab.play(_doorUnlocked);
      } else{
        console.log('zandora-lib: Door Closed');
        soundlab.play(_doorClose);        
      }
    };
    if (obj.ds === 1){
      console.log('zandora-lib: Door Open');
      soundlab.play(_doorOpen);
    };
    if (obj.ds === 2){
      console.log('zandora-lib: Door is Locked');
    }
  };
  
});
// if I need to do something as soon as the module is ready
//Hooks.on('zandoraLibReady', (api) => {
    // do what I need with their api
//});
  
// alternatively if I know that the API should be populated when I need it,
//game.modules.get('zandora-lib')?.api?.function()
