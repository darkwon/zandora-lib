export class Settings extends EventTarget {

  _game;
  _settings;
  _namespace;

  _currentState;
  get currentState(){
    return this._currentState;
  }

  /**
   * @param {String} namespace
   * @param {Array.<{name:String, config:Object}>} settings
   * */
  constructor(namespace, settings) {
    super();
    this._settings = settings;
    this._namespace = namespace;
  }

  register = (game) => {
    this._game = game;
    this._currentState = {};
    for(const setting of this._settings){
      let existingOnChange = setting.config.onChange;
      setting.config.onChange = (value) => {
        existingOnChange?.(value);
        this.handleSettingChange(game, this._namespace, setting.name, value);
      }
      game.settings.register(this._namespace, setting.name, setting.config);
      this._currentState[setting.name] = game.settings.get(this._namespace, setting.name);
    }
  }

  read = (name) => {
    return this._game.settings.get(this._namespace, name);
  }
  write = (name, value) => {
    this._game.settings.set(this._namespace, name, value);
  }

  handleSettingChange = (game, namespace, setting, value) => {
    this._currentState[setting] = value;
    this.dispatchEvent(new Event(setting, {value}));
    this.dispatchEvent(new Event('setting_change', {
      game, namespace, setting, value
    }));
  }
}

export default Settings;