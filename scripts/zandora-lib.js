//"use strict";
import {registerSettings} from "./apps/settings.js";
import zandoralib from "./zandora-lib-api.js";

// Comment out to turn off debugging
//CONFIG.debug.hooks = true

Hooks.on('init', () => {
    // Register are library settings
    registerSettings()
    // once set up, we create our API object
    game.modules.get('zandora-lib').api = {
        // list of exposed API functions
        getActivePlayers: zandoralib.getActivePlayers,
        getPcs: zandoralib.getPcs,
        awardXP: zandoralib.awardXP,
        preparePcData: zandoralib.preparePcData,
    };

    // now that we've created our API, inform other modules we are ready
    // provide a reference to the module api as the hook arguments for good measure
    Hooks.callAll('zandoraLibReady', game.modules.get('zandora-lib').api);
    //game.modules.get('zandora-lib')?.api?.getActivePlayers()
});

// if I need to do something as soon as the module is ready
//Hooks.on('zandoraLibReady', (api) => {
    // do what I need with their api
//});
  
    // alternatively if I know that the API should be populated when I need it,
    // I can defensively use the api on game.modules
    //game.modules.get('zandora-lib')?.api?.getActivePlayers()
    //game.modules.get('zandora-lib')?.api?.getPcs()