import {XPTypes, XP_session, AwardMessage} from "./apps/XPaward.js";

export default class zandoralib {
    // ---------------------------------------------------------------------------------
    // This is the zandora-lib-api access class. All API functions are contained within.
    // ---------------------------------------------------------------------------------
    static getActivePlayers(option){
        const user = [game.users];
        switch (option){
            default:
                // return all users in the database and associated information.
                return user
            case "playerOnly":
                // return ID of users that are online and have a character selected.
                let charUser = [];
                for (let i = 0; i < user[0]._source.length; i++){
                    if (user[0].contents[i].active == true && user[0].contents[i].charname !== ''){
                        console.log('user is active')
                        charUser.push(user[0]._source[i].character)  
                    }
                };             
                return charUser
        }
    }

    static awardXP(){
        const players = this.getActivePlayers('playerOnly')
        console.log('Found these characters: ' + players)
        let sessionXP = 100
        const pcs = this.preparePcData(game.actors.filter(actor => players.includes(actor.id)))
        const textXP1 = XPTypes('session')
        console.log(XPTypes)
        try {
            pcs.forEach(pc => {
                sessionXP = XP_session(pc.level)
                console.log(pc.name + 'is level ' + pc.level + ' and earns ' + sessionXP)
                pc.newXp = pc.xp + sessionXP
                const updateData = {}
                updateData[pc.xpAttribute] = pc.newXp
                pc.actor.update(updateData)
            });            
        } catch (error) {
            console.log(error)
        }
        AwardMessage(sessionXP, pcs)
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
                        name: actor.name,
                        level: actor.data.data.details.level,
                        xp: actor.data.data.details.xp.value,
                        xpAttribute: "data.details.xp.value",
                        nextLevelXp: actor.data.data.details.xp.max,
                    }
                })
        }
    }
}