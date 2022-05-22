//import {BackpackHotbar} from "./components/BackpackHotbar/BackpackHotbar.js";

class UI {

  _ui;
  _module;
  _settings;

  /**@var {BackpackHotbar}*/
  _backpackHotbar;

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
  }
  setup = () => {
    console.log('UI Setup');
  }
  ready = () => {
    //this._backpackHotbar = new BackpackHotbar();
    //this._backpackHotbar.init();
    console.debug('UI Ready!');
  }
}

export default new UI();