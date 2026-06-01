PlayerEvents.loggedIn(event => {
    const player = event.player;
    const name = player.name.string;

    // --- faction detection  ---
    const nbt = player.nbt;
    if (!nbt || !nbt["neoforge:attachments"]) return;

    const attachments = nbt["neoforge:attachments"];
    let faction = null;

    if (attachments["vampirism:faction_player_handler"]) {
        let factionHandler = attachments["vampirism:faction_player_handler"];
        if (factionHandler && factionHandler.faction) {
            faction = factionHandler.faction;
        }
    }
    
    // --- cnpcs logic ---
    if (faction) {
        let allFactions = [3, 4, 5];
        let targetFactionId = -1;

        if (faction === "werewolves:werewolf") {
            targetFactionId = 3;
        } else if (faction === "vampirism:vampire") {
            targetFactionId = 4;
        } else if (faction === "vampirism:hunter") {
            targetFactionId = 5;
        }

        if (targetFactionId != -1) {
            event.server.runCommandSilent(`noppes faction ${name} ${targetFactionId} set 1500`);
            
            allFactions.forEach(id => {
                if (id != targetFactionId) {
                    event.server.runCommandSilent(`noppes faction ${name} ${id} drop`);
                }
            });
        }
    }

    // --- luckperms ---
    const factionGroups = ["vampire", "hunter", "werewolf"]; 
    let newGroup = null;

    if (faction === "vampirism:vampire") {
        newGroup = "vampire";
    } else if (faction === "vampirism:hunter") {
        newGroup = "hunter";
    } else if (faction === "werewolves:werewolf") {
        newGroup = "werewolf";
    }

    factionGroups.forEach(groupName => {
        if (groupName === newGroup) {
            event.server.runCommandSilent(`lp user ${name} permission set group.${groupName} true`);
        } else {
            event.server.runCommandSilent(`lp user ${name} permission unset group.${groupName}`);
        }
    });

    if (newGroup) {
        console.log(`[WxV] Group updated for ${name}: ${newGroup}`);
    }
});