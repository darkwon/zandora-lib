export const preloadZandora5eHandlebarsTemplates = async function() {

    // Define template paths to load
    const zandora5etemplatePaths = [
  
      // Actor Sheet Partials
      //"modules/zandora-suite/templates/actors/parts/active-effects.html",
      //"modules/zandora-suite/templates/actors/parts/actor-features.html",
      //"modules/zandora-suite/templates/actors/parts/actor-inventory.html",
      //"modules/zandora-suite/templates/actors/parts/actor-spellbook.html",
      //"modules/zandora-suite/templates/actors/parts/actor-traits.html",
      //"modules/zandora-suite/templates/actors/parts/actor-warnings.html",
      //"modules/zandora-suite/templates/actors/parts/actor-crafting.html",

      // UI Templates
      "modules/zandora-lib/templates/ui/ui-token-tooltip.hbs",
      "modules/zandora-lib/templates/ui/ui-bag-bar.hbs",

      // Item Sheets
      "modules/zandora-lib/templates/item/item-sheet.hbs",
    ];
  
    // Load the template parts
    return loadTemplates(zandora5etemplatePaths);
};