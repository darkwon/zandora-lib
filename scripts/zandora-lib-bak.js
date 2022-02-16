//"use strict";
// Comment out to turn off debugging
//CONFIG.debug.hooks = true
export function preparePcData2(characters) {
    console.log('prepare PC Data')
    switch (game.system.id) {
        case "dnd5e":
            return characters.map(actor => {
                return {
                    actor: actor,
                    id: actor.data._id,
                    level: actor.data.data.details.level,
                    xp: actor.data.data.details.xp.value,
                    xpAttribute: "data.details.xp.value",
                    nextLevelXp: actor.data.data.details.xp.max,
                }
            })
    }
}
class zandoralib {
    //..
    static getActivePlayers(option){
        // does stuff you want other modules to have access to
        const user = [game.users];
        for (let i = 0; i < user[0]._source.length; i++){
            //console.log('character ID: ' + user[0]._source[i]._id + ' character: ' + user[0]._source[i].character)

        };
        switch (option){
            default:
                return user
            case "playerOnly":
                let charUser = [];
                for (let i = 0; i < user[0]._source.length; i++){
                    charUser.push(user[0]._source[i].character)  
                };
                return charUser
        }
    }
    static getPcs() {
        return game.actors.filter(actor => actor.data.type === "character").map(actor =>{return {id: actor.id, name: actor.data.name, image: actor.data.img}})
    }


    static awardXP(){
        console.log('step 1')
        const players = this.getActivePlayers('playerOnly')
        console.log('step 2')
        //const charmap = new Map();
        
        //game.actors.filter(actor => actor.data._id === 'sAFRiyU4NZStT2rZ').map(actor =>{return {id: actor.data._id, name: actor.data.name, xp: actor.data.data.details.xp.value, xpNext:actor.data.data.details.xp.max}})
        // sAFRiyU4NZStT2rZ
        // ovk0hmTG67Y4PToc
        const charXp = 100
        const pcs = this.preparePcData(game.actors.filter(actor => players.includes(actor.id)))
        console.log('character data is pulled' + players)
        try {
            console.log('trying to update XP data')
            pcs.forEach(pc => {
                console.log('step 3')
                pc.newXp = pc.xp + charXp
                console.log('newXP: ' + pc.newXp)
                const updateData = {}
                updateData[pc.xpAttribute] = pc.newXp
                console.log(updateData)
                pc.actor.update(updateData)
            });            
        } catch (error) {
            console.log(error)
        }

        console.log('step 4')
        return pcs
    }

    static preparePcData(characters) {
        console.log('prepare PC Data')
        switch (game.system.id) {
            case "dnd5e":
                return characters.map(actor => {
                    return {
                        actor: actor,
                        id: actor.data._id,
                        level: actor.data.data.details.level,
                        xp: actor.data.data.details.xp.value,
                        xpAttribute: "data.details.xp.value",
                        nextLevelXp: actor.data.data.details.xp.max,
                    }
                })
        }
    }
}

Hooks.on('init', () => {

    // once set up, we create our API object
    game.modules.get('zandora-lib').api = {
        //use the following to call the function
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