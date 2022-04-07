import Settings from './settings.js';

const settings = [
  {
    name:'xpAwardStyle',
    config:{
      name: "zandora-lib.settings.xp-style",
      hint: "zandora-lib.settings.xp-style-hint",
      scope: "world",
      config: true,
      default: 'default',
      type: String,
      choices: {
        "default": "zandora-lib.settings.xp-styles.xp-encounter",
        "session": "zandora-lib.settings.xp-styles.xp-session",
        "milestone": "zandora-lib.settings.xp-styles.xp-milestone"
      }
    }
  },
  {
    name:'SpeedFactorInitiative',
    config:{
      name: "zandora-lib.combat.initiative.speed-init",
      hint: "zandora-lib.combat.initiative.speed-hint",
      scope: "world",
      config: true,
      default: false,
      type: Boolean
    }
  },
  {
    name:'tooltips',
    config:{
      name: "zandora-lib.ui.tooltips.tooltip-name",
      hint: "zandora-lib.ui.tooltips.tooltip-hint",
      scope: "world",
      config: true,
      default: false,
      type: Boolean
    }
  },
]

export default class libSettings extends Settings {
    constructor(namespace) {
      super(namespace, settings);
    }
  }