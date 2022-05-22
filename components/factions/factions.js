import Module from '../../module.js';

var defaultDB = ''
export default class Factions{
    
    static database(){
        const dataFile = './modules/zandora-lib/components/factions/factions.json';

        fetch(dataFile)
        .then(response => response.json())
        .then(data => {
            defaultDB = data
        })
    };

    static test(){
        console.log(defaultDB.factions)
    }

    static award(actor, faction, renown){};

    getFaction(factionName){};

    getRenown(renown){};

    getRenownRank(rank){};
}