PlayerEvents.loggedIn(event => {
    // 1. Registro do Nome
    const player = event.player;
    const name = player.username;
    const server = event.server;

    // 2. Conferência da Facção (via NeoForge Attachments)
    const nbt = player.nbt;
    if (!nbt || !nbt["neoforge:attachments"]) return;

    const attachments = nbt["neoforge:attachments"];
    let faction = null;

    // Acessa o Handler do Vampirism/Werewolves
    if (attachments["vampirism:faction_player_handler"]) {
        let factionHandler = attachments["vampirism:faction_player_handler"];
        if (factionHandler && factionHandler.faction) {
            faction = factionHandler.faction; // Salva a facção
        }
    }

    // Se não tiver facção, para aqui.
    if (!faction) return;

    // 3. Conferência dos Efeitos
    // Definimos os efeitos proibidos
    const forbidden = ["toxony:beast_mutagen", "toxony:infernal_mutagen"];
    
    // Filtramos apenas os que o jogador REALMENTE tem
    let activeForbiddenEffects = forbidden.filter(effect => player.potionEffects.isActive(effect));

    // Se não tiver os efeitos, para aqui.
    if (activeForbiddenEffects.length === 0) return;

    // 4. Execução (Somente se for Lobisomem ou Vampiro e tiver os efeitos)
    if (faction === "vampirism:vampire" || faction === "werewolves:werewolf") {
        
        activeForbiddenEffects.forEach(effect => {
            // Comando A: Limpar o efeito específico
            server.runCommandSilent(`effect clear ${name} ${effect}`);
        });

        // Comando B: Reset de Tolerância
        server.runCommandSilent(`tolerance set ${name} 10`);

        // Comando C: Reset de Toxicidade
        server.runCommandSilent(`tox set ${name} 0`);

        // Feedback e Log
        player.tell(Text.red("Your supernatural blood purged the toxic mutations!"));
        console.log(`[Toxony-Purge] Player ${name} (${faction}) was cleared of ${activeForbiddenEffects.join(", ")}`);
    }
});