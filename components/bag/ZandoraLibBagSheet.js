import ItemSheet5e from "../../../../systems/dnd5e/module/item/sheet.js";
export default class ZandoraLibBagSheet extends ItemSheet5e{
    get template() {
        return `modules/zandora-lib/templates/item/item-sheet.hbs`;
    }

	static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
              classes: ["dnd5e", "zandora5e", "sheet", "actor", "character"],
          });
      }
      activateListeners(html){	
        super.activateListeners(html);
      }  
    static init(){
        //Items.registerSheet("dnd5e", bag, { makeDefault: false });
    }
}

Items.registerSheet("dnd5e", ZandoraLibBagSheet, { makeDefault: false, label:"Zandora Bag Sheet" });

Hooks.on("renderZandoraLibBagSheet", (app, html, data) => {
    addEditorHeadline(app, html, data);
});