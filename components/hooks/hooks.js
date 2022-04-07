export default class LibHooks{
    /**
    * @param {string} html -   Optional parameter, not yet used
    */   
   static register(html){
       hookRollMode();
       //hookActionMacro();
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
    // Create ActionBar Macro hooks  
    const ActionBar = document.getElementById('macro-list');
    //ActionBar.addEventListener('mouseover', function(){
    //this.getAttribute('data-macro-id');
    //});
    const ActionMacro = ActionBar.getElementsByTagName('li');

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
        console.log("Hook actionHover has fired");
    });
    console.log('fired the first hook')
    }  

    const Macros = [];
    for (var i = 0; i < ActionMacro.length; ++i){
    console.log('Pre add event listener')
    ActionMacro[i].setAttribute('id','macro-'+ i)
    //ActionMacro[i].addEventListener('mouseover', function(event){
        //console.log('Macro key '+ i + ' mouseover listener enabled');

        //ActionBarHover;
    //});
    //ActionMacro[i].addEventListener('mouseout', function(event){
        //console.log('Macro key '+ i + ' mouseout listener enabled');
    //});
    //Hooks.callAll('actionHover', function(){});
    Macros.push(ActionMacro[i]);

    };

    for (var i = 0; i < Macros.length; ++i){
    console.log('');
    let _id = document.getElementById('macro-'+i)
    _id.addEventListener('mouseover', function(item,index,arr){
        console.log(_id)
        if (_id.onmouseenter){
        console.log('testing');
        }
        Hooks.callAll('actionHover', function(item, index, arr){
        });
    });
    };
}
