export default class LibHooks{
    /**
    * @param {string} html -   Optional parameter, not yet used
    */   
   static register(html){
       hookRollMode();
       hookActionMacroTest();
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

function hookActionMacroTest(){
    const ActionMacro = [document.querySelectorAll('.macro')]
    const ActionMacroHover = document.querySelectorAll('.macro').forEach(item => {
        Hooks.callAll('actionHover', hookMacro);
        item.addEventListener('mouseenter', event => {
            console.log('zandora-lib: mouseenter event detected')
        })
        
      });
      //const onMacroEnter = MouseEvent.onMouseEnter
      //onMacroEnter.MouseEvent = ActionMacroHover;
      console.log('zandora-lib: redner ActionMacros')
      //console.log(ActionMacro)
      ActionMacro.onMouseEnter = ActionMacroHover
}

function hookMacro(){
    console.log('we have a hook')
}
function hookActionMacro(){
    // Create ActionBar Macro hooks
    console.log('zandora-lib: Searching for macro-list');
    const ActionBar = document.getElementById('macro-list');
    //ActionBar.addEventListener('mouseover', function(){
    //this.getAttribute('data-macro-id');
    //});
    console.log(ActionBar);
    
    console.log('zandora-lib: Retrieving LI elements');
    const ActionMacro = ActionBar.getElementsByTagName('li');
    console.log(ActionMacro)

    console.log('zandora-lib: Defining CONST ActionBarHover');
    const ActionBarHover = function(myFunction){
    //Macros.forEach(element => console.log(element.getAttribute('data-macro-id')));
    //Macros.forEach(element => Hooks.callAll('actionHover', myFunction));
    //Hooks.once('actionHover', myFunction);
    //Macros.forEach(function callback(value, index) {
        //console.log(`${index}: ${value}`);
        //console.log(index + ' ' + value.getAttribute('data-macro-id')) 
        //Hooks.callAll('actionHover', function(element){});
    //});
    Hooks.callAll('actionHover', function(item, index, arr){
        console.log("zandora-lib: actionHover has fired");
    });
    console.log('zandora-lib: fired the first hook')
    }  

    console.log('zandora-lib: function onMouseEnter has been created')
    function onMouseEnter(){
        console.log('zandora-lib: onMouseEnter event fired');
    }



    const Macros = [];
    for (var i = 0; i < ActionMacro.length; ++i){
        //console.log('zandora-lib: setting ID for macro-' + i)
        //ActionMacro[i].setAttribute('id','macro-'+ i);
        //console.log('zandora-lib:' + ActionMacro)
        //console.log(document.getElementById('macro-'+i));

        console.log('zandora-lib: adding mouseenter event listener')
        ActionMacro[i].addEventListener('mouseenter', onMouseEnter);
        
        ActionMacro[i].addEventListener('click', (e)=>{
            console.log('zandora-lib: macro click event')
            console.log(e.target.id)
          })
        //ActionMacro[i].addEventListener('mouseout', function(event){
            //console.log('Macro key '+ i + ' mouseout listener enabled');
        //});
        Hooks.callAll('actionHover', function(){});
        Macros.push(ActionMacro[i]);
    };
    Macros.onMouseEnter = ActionBarHover;
}
