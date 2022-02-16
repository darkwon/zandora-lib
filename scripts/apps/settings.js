export const moduleName = "zandora-lib";
export function registerSettings() {
    // select how you will award experience points.
    game.settings.register(moduleName, "xpAwardStyle", {
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