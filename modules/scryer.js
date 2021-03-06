var wantToScry = false;

function autostancefunction(auto_stance, current_enemy) {
    if(should_windstack(current_enemy)) {
        windStance();
    } else if (auto_stance == 1) {
        autoStance();
    } else if (auto_stance == 2) {
        autoStance2();
    }
}

function scryMaybe(scry_stance, auto_stance, current_enemy) {
    if(!getPageSetting('scry_cheat')) {
        setFormation(scry_stance);
        return;
    }

    if(game.global.mapsActive) {
        setFormation(scry_stance);
        return;
    }

    var roll = getRandomIntSeeded(game.global.scrySeed, 0, 100);
    if(roll == 50 || roll == 51 || roll == 52) {
        setFormation(scry_stance);
        return;
    }

    var lookahead_cells = 1 + (calcMaxOverkill() * 2);
    for(var i = 1; i <= lookahead_cells && game.global.lastClearedCell + i < 100; i++) {
        roll = getRandomIntSeeded(game.global.scrySeed + i, 0, 100);
        if(roll == 50 || roll == 51 || roll == 52) {
            setFormation(scry_stance);
            return;
        }
    }

    wantToScry = false;
    autostancefunction(auto_stance, current_enemy);
}

function useScryerStance() {
    var scry = 4;
    var curEnemy = getCurrentEnemy(1);

    if(should_windstack(curEnemy) || (game.global.uberNature == "Wind" && getEmpowerment() != "Wind")) {
        scry = 5;
    }

    var AutoStance = getPageSetting('AutoStance');

    //Never
    var never_scry = game.global.preMapsActive || game.global.gridArray.length === 0 || game.global.highestLevelCleared < 180;
    never_scry = never_scry || game.global.world <= 60;
    never_scry = never_scry || (getPageSetting('UseScryerStance') == true && game.global.mapsActive && getPageSetting('ScryerUseinMaps2') == 0 && getCurrentMapObject().location != "Void" && getCurrentMapObject().location != "Bionic" && getCurrentMapObject().level <= game.global.world);
    never_scry = never_scry || (getPageSetting('UseScryerStance') == true && game.global.mapsActive && getPageSetting('ScryerUseinPMaps') == 0 && getCurrentMapObject().level > game.global.world && getCurrentMapObject().location != "Void" && getCurrentMapObject().location != "Bionic");
    never_scry = never_scry || (getPageSetting('UseScryerStance') == true && game.global.mapsActive && getCurrentMapObject().location == "Void" && getPageSetting('ScryerUseinVoidMaps2') == 0);
    never_scry = never_scry || (getPageSetting('UseScryerStance') == true && game.global.mapsActive && getCurrentMapObject().location == "Bionic" && getPageSetting('ScryerUseinBW') == 0);
    never_scry = never_scry || (getPageSetting('UseScryerStance') == true && !game.global.mapsActive && (isActiveSpireAT() || disActiveSpireAT()) && getPageSetting('ScryerUseinSpire2') == 0);
    never_scry = never_scry || (getPageSetting('UseScryerStance') == true && !game.global.mapsActive && getPageSetting('ScryerSkipBoss2') == 1 && game.global.world < getPageSetting('VoidMaps') && game.global.lastClearedCell == 98) || (getPageSetting('ScryerSkipBoss2') == 0 && game.global.lastClearedCell == 98);
    never_scry = never_scry || (getPageSetting('UseScryerStance') == true && !game.global.mapsActive && (getEmpowerment() == "Poison" && (getPageSetting('ScryUseinPoison') == 0 || (getPageSetting('ScryUseinPoison') > 0 && game.global.world >= getPageSetting('ScryUseinPoison')))) || (getEmpowerment() == "Wind" && (getPageSetting('ScryUseinWind') == 0 || (getPageSetting('ScryUseinWind') > 0 && game.global.world >= getPageSetting('ScryUseinWind')))) || (getEmpowerment() == "Ice" && (getPageSetting('ScryUseinIce') == 0 || (getPageSetting('ScryUseinIce') > 0 && game.global.world >= getPageSetting('ScryUseinIce')))));
    never_scry = never_scry || (getPageSetting('UseScryerStance') == true && !game.global.mapsActive && getPageSetting('screwessence') == true && countRemainingEssenceDrops() < 1);

    //check Corrupted Never
    var iscorrupt = curEnemy && curEnemy.mutation == "Corruption";
    if (((never_scry) || getPageSetting('UseScryerStance') == true && !game.global.mapsActive && (iscorrupt && getPageSetting('ScryerSkipCorrupteds2') == 0))) {
        wantToScry = false;
        autostancefunction(AutoStance, curEnemy);
        return;
    }
    //check Healthy never
    var ishealthy = curEnemy && curEnemy.mutation == "Healthy";
    if (((never_scry) || getPageSetting('UseScryerStance') == true && !game.global.mapsActive && (ishealthy && getPageSetting('ScryerSkipHealthy') == 0))) {
        wantToScry = false;
        autostancefunction(AutoStance, curEnemy);
        return;
    }

    //Force
    var use_scryer = use_scryer || (getPageSetting('UseScryerStance') == true && game.global.mapsActive && getPageSetting('ScryerUseinMaps2') == 1);
    use_scryer = use_scryer || (game.global.mapsActive && getCurrentMapObject().location == "Void" && ((getPageSetting('ScryerUseinVoidMaps2') == 1) || (getPageSetting('scryvoidmaps') == true && game.global.challengeActive != "Daily") || (getPageSetting('dscryvoidmaps')== true && game.global.challengeActive == "Daily")));
    use_scryer = use_scryer || (game.global.mapsActive && getCurrentMapObject().location == "Bionic" && getPageSetting('ScryerUseinBW') == 1);
    use_scryer = use_scryer || (game.global.mapsActive && getCurrentMapObject().level > game.global.world && getPageSetting('ScryerUseinPMaps') == 1 && getCurrentMapObject().location != "Bionic");
    use_scryer = use_scryer || (!game.global.mapsActive && getPageSetting('UseScryerStance') == true && (isActiveSpireAT() || disActiveSpireAT()) && getPageSetting('ScryerUseinSpire2') == 1);
    use_scryer = use_scryer || (!game.global.mapsActive && getPageSetting('UseScryerStance') == true && ((getEmpowerment() == "Poison" && getPageSetting('ScryUseinPoison') > 0 && game.global.world < getPageSetting('ScryUseinPoison')) || (getEmpowerment() == "Wind" && getPageSetting('ScryUseinWind') > 0 && game.global.world < getPageSetting('ScryUseinWind')) || (getEmpowerment() == "Ice" && getPageSetting('ScryUseinIce') > 0 && game.global.world < getPageSetting('ScryUseinIce'))));

    //check Corrupted Force
    if ((iscorrupt && getPageSetting('ScryerSkipCorrupteds2') == 1 && getPageSetting('UseScryerStance') == true) || (use_scryer)) {
        wantToScry = true;
        scryMaybe(scry, AutoStance, curEnemy);
        return;
    }
    //check healthy force
    if ((ishealthy && getPageSetting('ScryerSkipHealthy') == 1 && getPageSetting('UseScryerStance') == true) || (use_scryer)) {
        wantToScry = true;
        scryMaybe(scry, AutoStance, curEnemy);
        return;
    }

    //Calc Damage
    if (AutoStance == 1) {
        calcBaseDamageinX();
    } else if (AutoStance >= 2) {
        calcBaseDamageinX2();
    }

    //Suicide to Scry
    var missingHealth = game.global.soldierHealthMax - game.global.soldierHealth;
    var newSquadRdy = game.resources.trimps.realMax() <= game.resources.trimps.owned + 1;
    var oktoswitch = true;
    var die = (getPageSetting('ScryerDieZ') != -1 && getPageSetting('ScryerDieZ') <= game.global.world);
    var willSuicide = getPageSetting('ScryerDieZ');
    if (die && willSuicide >= 0) {
        var [dieZ, dieC] = willSuicide.toString().split(".");
        if (dieC && dieC.length == 1) {
            dieC = dieC + "0";
        }
        die = game.global.world >= dieZ && (!dieC || (game.global.lastClearedCell + 1 >= dieC));
    }
    if (game.global.formation == 0 || game.global.formation == 1) {
        oktoswitch = die || newSquadRdy || (missingHealth < (baseHealth / 2));
    }

    //Overkill
    var useoverkill = getPageSetting('ScryerUseWhenOverkill');
    if (useoverkill && game.portal.Overkill.level == 0) {
        setPageSetting('ScryerUseWhenOverkill', false);
    }
    if (useoverkill && !game.global.mapsActive && (isActiveSpireAT() || disActiveSpireAT()) && getPageSetting('ScryerUseinSpire2') == 0) {
        useoverkill = false;
    }
    if (useoverkill && game.portal.Overkill.level > 0 && getPageSetting('UseScryerStance') == true) {
        var minDamage = calcOurDmg("min",false,true);
        var Sstance = 0.5;
        if(scry == 5) {
            Sstance = 1;
        }
        var ovkldmg = minDamage * Sstance * (game.portal.Overkill.level*0.005);
        var ovklHDratio = getCurrentEnemy(1).maxHealth / ovkldmg;
        if (ovklHDratio < 2) {
            if(oktoswitch) {
                wantToScry = true;
                scryMaybe(scry, AutoStance, curEnemy);
            }
            return;
        }
    }

    //Default
    var min_zone = getPageSetting('ScryerMinZone');
    var max_zone = getPageSetting('ScryerMaxZone');
    var valid_min = game.global.world >= min_zone && game.global.world > 60;
    var valid_max = max_zone <= 0 || game.global.world < max_zone;

    if(getPageSetting('ScryerUseinMaps2') == 3 && game.global.mapsActive) {
        wantToScry = false;
        autostancefunction(AutoStance, curEnemy);
        return;
    }

    if (getPageSetting('UseScryerStance') == true && valid_min && valid_max && !(getPageSetting('onlyminmaxworld') == true && game.global.mapsActive)) {
        if (oktoswitch) {
            wantToScry = true;
            scryMaybe(scry, AutoStance, curEnemy);
            return;
        }
    } else {
        wantToScry = false;
        autostancefunction(AutoStance, curEnemy);
        return;
    }
}
