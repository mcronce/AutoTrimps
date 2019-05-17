MODULES["fight"] = {};
MODULES["fight"].breedTimerCutoff1 = 2;
MODULES["fight"].breedTimerCutoff2 = 0.5;
MODULES["fight"].enableDebug = true;
MODULES['fight'].deadlock_timer = 5000;
MODULES['fight'].life_alwaysFight_threshold = 100;
MODULES['fight'].life_noAction_threshold = 75;
MODULES['fight'].life_consectiveLiving_modifier = 25;

var stopped_time = 0;
function deadlockCheck() {
    var ts  = (new Date()).getTime();
    if(stopped_time == 0) {
        stopped_time = ts;
        return true;
    }
    if(ts > (stopped_time + MODULES['fight'].deadlock_timer)) {
        return false;
    } else {
        return true;
    }
}

function shouldWeFight() {
    if(game.global.challengeActive == 'Life') {
        if(game.global.mapsActive) {
            stopped_time = 0;
            return 1;
        }
        if(game.global.gridArray.length < game.global.lastClearedCell + 1) {
            stopped_time = 0;
            return 0;
        }

        if(game.global.gridArray[game.global.lastClearedCell + 1].mutation == 'Living') {
            var always_fight = MODULES['fight'].life_alwaysFight_threshold;
            var no_action = MODULES['fight'].life_noAction_threshold;
            for(var i = game.global.lastClearedCell + 2; i < 100; i++) {
                if(!(game.global.gridArray[i].mutation === 'Living')) {
                    break;
                }
                always_fight += MODULES['fight'].life_consectiveLiving_modifier;
                no_action += MODULES['fight'].life_consectiveLiving_modifier;
            }

            if(game.challenges.Life.stacks >= always_fight) {
                stopped_time = 0;
                return 1;
            } else if(game.challenges.Life.stacks >= no_action) {
                if(deadlockCheck()) {
                    return 0;
                } else {
                    return 1;
                }
            } else {
                if(deadlockCheck()) {
                    return -1;
                } else {
                    return 1;
                }
            }
        }
    }
    return 1;
}

function fightMaybe() {
    var should_fight = shouldWeFight();
    if(should_fight == 1 && !game.global.fighting) {
        fightManual();
    } else if(should_fight == -1) {
        forceAbandonTrimps();
        if(game.global.preMapsActive) {
            mapsClicked();
        }
    }
}

function betterAutoFight() {
    var customVars = MODULES["fight"];
    if (game.global.autoBattle && !game.global.pauseFight) {
        pauseFight();
    }
    if (game.global.gridArray.length === 0 || game.global.preMapsActive || !game.upgrades.Battle.done) return;
    var targetBreed = getPageSetting('GeneticistTimer');
    var breeding = (game.resources.trimps.owned - game.resources.trimps.employed);
    var newSquadRdy = game.resources.trimps.realMax() <= game.resources.trimps.owned + 1;
    var lowLevelFight = game.resources.trimps.maxSoldiers < breeding * 0.5 && breeding > game.resources.trimps.realMax() * 0.1 && game.global.world < 5;
    if (newSquadRdy || game.global.soldierHealth > 0 || lowLevelFight || game.global.challengeActive == 'Watch') {
        fightMaybe();
    }
}

function betterAutoFight2() {
    var customVars = MODULES["fight"];
    if (game.global.autoBattle && !game.global.pauseFight) {
        pauseFight();
    }
    if (game.global.gridArray.length === 0 || game.global.preMapsActive || !game.upgrades.Battle.done) {
        return;
    }
    var breeding = (game.resources.trimps.owned - game.resources.trimps.employed);
    var newSquadRdy = game.resources.trimps.realMax() <= game.resources.trimps.owned + 1;
    var adjustedMax = (game.portal.Coordinated.level) ? game.portal.Coordinated.currentSend : trimps.maxSoldiers;
    var lowLevelFight = (adjustedMax < 0.5 * breeding) && (breeding > 0.1 * game.resources.trimps.realMax());
    if (game.global.SpireActive){
        if((game.global.lastBreedtime / 1000) >= targetBreed && (game.global.lastBreedtime / 1000) >= breedTimerLimit) {
            fightMaybe();
        }
    } else if (game.global.soldierHealth > 0 && getPageSetting('AutoMaps') == 1) {
        fightMaybe();
    } else if (newSquadRdy || lowLevelFight || game.global.challengeActive == 'Watch') {
        fightMaybe();
    }
}

function betterAutoFight3() {
    var customVars = MODULES["fight"];
    if (game.global.autoBattle && game.global.pauseFight && !game.global.spireActive) {
        pauseFight();
    }
    if (game.global.gridArray.length === 0 || game.global.preMapsActive || !game.upgrades.Battle.done || game.global.spireActive) {
        return;
    }
    if (game.global.world == 1) {
        fightMaybe();
    }
}
