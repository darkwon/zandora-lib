//import {BackpackHotbar} from "./components/BackpackHotbar/BackpackHotbar.js";
//import {bagbar} from "./components/bagbar/bagbar.js";
import bag from "./components/bag/ZandoraLibBagSheet.js";

class UI {

  _ui;
  _module;
  _settings;

  /**@var {BackpackHotbar}*/
  //_backpackHotbar;
  _utilityBar;

  /**
   * @param {Object<Module>} module
   * @param {Object<Application>} ui
   * @param {Object<String, Settings>} settings
   * */
  init = (module, ui, settings) => {
    console.log('UI Init');
    this._ui = ui;
    this._module = module;
    this._settings = settings;
    bag.init();
  }
  setup = () => {
    console.log('UI Setup');
  }
  ready = () => {
    //this._backpackHotbar = new BackpackHotbar();
    //this._backpackHotbar.init();
    //this._utilityBar = new bagbar();
    //this._utilityBar.init();
    
    console.debug('UI Ready!');
  }
}

export default new UI();