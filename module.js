import Settings from './settings/settings.js';
import {preloadZandora5eHandlebarsTemplates} from './components/handlebars/handlebars.js';
class Module {

  _game;
  _settings;

  get activeUsers(){
    return this._game.data.activeUsers.map(this.getUser);
  }
  get currentUserId(){
    return this._game.userId;
  }
  get currentUser(){
    return this.getUser(this.currentUserId);
  }
  get currentUserCharacter(){
    return this.getCharacter(this.currentUser?.character);
  }
  get currentUserBags(){
    return this.getUserBags(this.currentUserId);
  }

  /**
   * @param {Game} game
   * @param {Object<String, Settings>} settings
   * @return {Module}
   * */
  init = (game, settings) => {
    console.log('Module Init');
    this._game = game;
    this._settings = settings;
    return this;
  }
  setup = () => {
    console.log('Module Setup');
    preloadZandora5eHandlebarsTemplates()
  }
  ready = () => {
    console.debug('Module Ready');
    const {
      currentUser,
      activeUsers,
      currentUserCharacter,
      currentUserBags
    } = this;

    console.debug({
      module:this,
      currentUser,
      activeUsers,
      currentUserCharacter,
      currentUserBags
    });
  }

  getUser = (userId) => {
    return this._game.data.users.find(user => user._id === userId);
  }
  getUserBags = (userId) => {
    const user = this.getUser(userId);
    if(!user){return}
    return this.getCharacterBags(user.character);
  }
  getCharacter = (characterId) => {
    return this._game.data.actors.find(actor => actor._id === characterId);
  }
  getCharacterBags = (characterId) => {
    const character = this.getCharacter(characterId);
    if(!character){return}
    return character.items.filter(item => {
      return item.type === 'backpack';
    });
  }
  /**
   * 
   * @param {String} itemName - get an item by name on controlled token.
   * @returns 
   */
  getItemName = (itemName) => {
    let actor;
    if ( speaker.token ) actor = game.actors.tokens[speaker.token];
    if ( !actor ) actor = game.actors.get(speaker.actor);
    const items = actor ? actor.items.filter(i => i.name === itemName) : [];
    const item = items[0];
    return item
  }
}

export default new Module();