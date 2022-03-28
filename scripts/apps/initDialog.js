export class initDialog extends Dialog{
    constructor (data,options){
        super(options);
        this.data = data;

        this.data.buttons = {
            Submit : { label : settings.i18n("wd.dialog.button.submit"), icon : ``, },
            Cancel : { label : settings.i18n("wd.dialog.button.cancel"), icon : ``, },
          };
          this.data.default = "Submit";
          this.data.users = this.data?.users ?? [];
          logger.debug(this.data);
          this.data.users = game.users
            .filter(user => user.active && user.id !== game.userId)
            .map(user => {
              let data = { id : user.id, checked : "", name : user.name };
              if((this.data.users).includes(user.id))
                data.checked = "checked";
              return data;
            });

        this.actions = {
            "Medium Action                   (+0)" : +0,
            "Melee, Heavy Weapon             (-2)" : -2,
            "Melee, Light or Finesse Weapon  (+2)" : +2,
            "Melee, Two-Handed Weapon        (-2)" : -2,
            "Ranged, Loading Weapon          (-5)" : -5,
            "Spellcasting, 1st level         (-1)" : -1,
            "Spellcasting, 2nd level         (-2)" : -2,
            "Spellcasting, 3rd level         (-3)" : -3,
            "Spellcasting, 4th level         (-4)" : -4,
            "Spellcasting, 5th level         (-5)" : -5,
            "Spellcasting, 6th level         (-6)" : -6,
            "Spellcasting, 7th level         (-7)" : -7,
            "Spellcasting, 8th level         (-8)" : -8,
            "Spellcasting, 9th level         (-9)" : -9
        }; 

        this.options = new Array ()
        for (var key in actions) {
            options.push(key);
        }
    }
}