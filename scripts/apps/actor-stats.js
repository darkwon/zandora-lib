export default class actorStats{
    static getPcs() {
        // returns all actors that are of type character and not NPC then maps data from json to object
        return game.actors.filter(actor => actor.data.type === "character").map(actor =>{return {id: actor.id, name: actor.data.name, image: actor.data.img}})
    }

    static _getActor(ActorID){
        const combatant = game.actors.filter(actor => actor.data._id === ActorID).map(actor =>{return {
            id: actor.id, 
            name: actor.data.name, 
            init: actor.data.data.attributes.init.total,
            size: actor.data.data.traits.size}})
        return combatant
    }
}