# Vampirism AutoTeams

A KubeJS script that automates the assignment of groups in [LuckPerms](https://luckperms.net/) and factions in CustomNPCs based on the player's current Vampirism or Werewolves faction.

## Features
* Detects when a player joins the server and checks their current faction (`vampirism:vampire`, `vampirism:hunter` or `werewolves:werewolf`).
* Removes old permissions and automatically adds the player to the correct LuckPerms group (`vampire`, `hunter` or `werewolf`).
* CustomNPCs integration: Assigns the correct faction ID so that custom NPCs react properly to the player.

## Requirements
* [Vampirism](https://www.curseforge.com/minecraft/mc-mods/vampirism-become-a-vampire)
* [Werewolves](https://www.curseforge.com/minecraft/mc-mods/werewolves-become-a-beast)
* [KubeJS](https://www.curseforge.com/minecraft/mc-mods/kubejs)
* [LuckPerms](https://luckperms.net/)
* CustomNPCs (Optional, if using custom NPCs)
