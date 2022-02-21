// Store access to all reusable module settings here for reference
export const SETTINGS = {
  module: {
    name: 'zandora-lib'
  },
  XPaward: {
    default: 'default',
    session: 'session',
    milestone: 'milestone'
  },
}
export const moduleName = "zandora-lib";

export function registerSettings() {
    // select how you will award experience points.
    game.settings.register(SETTINGS.module.name, "xpAwardStyle", {
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
      });
}