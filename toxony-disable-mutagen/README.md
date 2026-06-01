# Toxony Disable Mutagen

A KubeJS script that blocks specific mutations from the [Toxony](https://www.curseforge.com/minecraft/mc-mods/toxony) mod for Vampires and Werewolves to maintain game balance.

## Features
* Monitors when a player connects to the server.
* If the player is a Vampire or Werewolf and has forbidden Toxony effects (e.g., `toxony:beast_mutagen`, `toxony:infernal_mutagen`), the script automatically removes them.
* Resets the player's Toxony tolerance to 10 and toxicity to 0.
* Provides immersive feedback in the player's chat ("Your supernatural blood purged the toxic mutations!") and logs the action to the server console.

## Requirements
* [Vampirism](https://www.curseforge.com/minecraft/mc-mods/vampirism-become-a-vampire)
* [Werewolves](https://www.curseforge.com/minecraft/mc-mods/werewolves-become-a-beast)
* [Toxony](https://www.curseforge.com/minecraft/mc-mods/toxony)
* [KubeJS](https://www.curseforge.com/minecraft/mc-mods/kubejs)
