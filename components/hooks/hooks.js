export default class LibHooks extends Hooks{
    static on
    /**
    * @param {string} html -   Optional parameter, not yet used
    */   
    static register(html){
        hookRollMode();
        hookActionMacro();
    }
}

function hookRollMode(html){
   //adds a Hooks.call on rollMode setting change
   const onRollModeChange = function(newRollMode) {
       //ChatLog._setRollMode(newRollMode); //the original onChange function
       Hooks.callAll('updateCoreRollMode', newRollMode);
   };

   //replace the original onChange function (_setRollMode) with our own that actually provides a Hooks call
   const rollModeSetting = game.settings.settings.get('core.rollMode');
   rollModeSetting.onChange = onRollModeChange;
};

function hookActionMacro(){
    const ActionMacro = [document.querySelectorAll('.macro')]
    const onActionMacro = {
        handleEvent(){
        console.log('zandora-lib: Action Macro triggered')
        return
        }
    }    
    const ActionMacroHover = document.querySelectorAll('.macro').forEach(item => {
        
        item.addEventListener('mouseenter', event => {
            console.log('zandora-lib: mouseenter event detected')
            Hooks.callAll('actionHover', item, true);
        })
      });
}

function hookMacro(){
    console.log('we have a hook')
}
