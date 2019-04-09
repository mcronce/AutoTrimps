MODULES["fight"] = {};
MODULES["fight"].breedTimerCutoff1 = 2;
MODULES["fight"].breedTimerCutoff2 = 0.5;
MODULES["fight"].enableDebug = true;

function shouldWeFight() {
	if(game.global.challengeActive == 'Life') {
		if(game.global.mapsActive) {
			return 1;
		}
		if(game.global.gridArray.length < game.global.lastClearedCell + 1) {
			return 0;
		}
		if(game.global.gridArray[game.global.lastClearedCell + 1].mutation == 'Living') {
			if(game.challenges.Life.stacks == 150) {
				return 1;
			} else if(game.challenges.Life.stacks > 125) {
				return 0;
			} else {
				return -1;
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
    if (!game.global.fighting) {
        if (newSquadRdy || game.global.soldierHealth > 0 || lowLevelFight || game.global.challengeActive == 'Watch') {
            fightMaybe();
        }
    }
}

function betterAutoFight2() {
    var customVars = MODULES["fight"];
    if (game.global.autoBattle && !game.global.pauseFight) {
        pauseFight();
    }
    if (game.global.gridArray.length === 0 || game.global.preMapsActive || !game.upgrades.Battle.done || game.global.fighting) {
        return;
    }
    var spireBreed = getPageSetting('SpireBreedTimer');
    var breeding = (game.resources.trimps.owned - game.resources.trimps.employed);
    var newSquadRdy = game.resources.trimps.realMax() <= game.resources.trimps.owned + 1;
    var adjustedMax = (game.portal.Coordinated.level) ? game.portal.Coordinated.currentSend : trimps.maxSoldiers;
    var potencyMod = getPotencyMod();
    var tps = breeding * potencyMod;
    var addTime = adjustedMax / tps;
    var lowLevelFight = game.resources.trimps.maxSoldiers < 0.5*breeding && breeding > 0.1*game.resources.trimps.realMax() && game.global.world <= 6 && game.global.sLevel < 1;
    if (!game.global.fighting) { 
        if (game.global.SpireActive){
            if((game.global.lastBreedtime/1000)>=targetBreed && (game.global.lastBreedtime/1000)>=breedTimerLimit) {
                fightMaybe();
            }
        } else if (game.global.soldierHealth > 0 && getPageSetting('AutoMaps') == 1) {
            fightMaybe();
        }
        if (newSquadRdy || lowLevelFight || game.global.challengeActive == 'Watch') {
            fightMaybe();
        }
    }
}

function betterAutoFight3() {
    var customVars = MODULES["fight"];
    if (game.global.autoBattle && game.global.pauseFight && !game.global.spireActive) {
        pauseFight();
    }
    if (game.global.gridArray.length === 0 || game.global.preMapsActive || !game.upgrades.Battle.done || game.global.fighting || game.global.spireActive) {
        return;
    }
    if (game.global.world == 1 && !game.global.fighting) {
        fightMaybe();
    }
}
