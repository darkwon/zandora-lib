import Settings from './settings.js';

const unitFrameDefault = {top: 400, left: 120};
const settings = [
  {
    name:'zl-partyframe-enable',
    config:{
      name: "Enable group frame",
      hint: "Toggles visibility of the party frame",
      scope: "client",
      type: Boolean,
      default: true,
      config: true,
    }
  },
  {
    name:"unit-frame-box-position",
    config:{
      scope: "client",
      config: false,
      default: unitFrameDefault,
    }
  },
  {
    name:'zl-partyframe-skin',
    config:{
      name: "ZandoraPUF.Settings.skin.name",
      hint: "ZandoraPUF.Settings.skin.hint",
      scope: "client",
      config: true,
      default: 'default',
      type: String,
      choices: {
        "default": "ZandoraPUF.Settings.skin.default",
        "icon": "ZandoraPUF.Settings.skin.icon",
        "warcraft": "ZandoraPUF.Settings.skin.warcraft"
      },
      onChange: value => {
        if (ui.unitFrames?.rendered) {
          ui.unitFrames.element.removeClass('default icon warcraft').addClass(value);
        }
      }
    }
  },
  {
    name:'zl-partyframe-showResourceValues',
    config:{
      name: "ZandoraPUF.Settings.showResourceValues.name",
      hint: "ZandoraPUF.Settings.showResourceValues.hint",
      scope: "world",
      config: true,
      default: false,
      type: Boolean,
      onChange: value => ui.unitFrames?.render()
    }
  },
  {
    name:'zl-partyframe-resetUnitFrames',
    config:{
      name: "ZandoraPUF.Settings.resetUnitFrames.name",
      hint: "ZandoraPUF.Settings.resetUnitFrames.hint",
      scope: "client",
      config: true,
      default: false,
      type: Boolean,
      onChange: value => {
        if (value) {
          game.settings.set(constants.moduleName, "unit-frame-box-position", unitFrameDefault);
          game.settings.set(constants.moduleName, "resetUnitFrames", false);
          if (ui.unitFrames?.rendered) ui.unitFrames.render();
        }
      }
    }
  }
]

export default class PartyFrameSettings extends Settings {
  constructor(namespace) {
    super(namespace, settings);
  }
}