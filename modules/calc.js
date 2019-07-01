var critCC = 1;
var critDD = 1;
var trimpAA = 1;

function getTrimpAttack() {
    var dmg = 6;
    var equipmentList = ["Dagger", "Mace", "Polearm", "Battleaxe", "Greatsword", "Arbalest"];
    for(var i = 0; i < equipmentList.length; i++) {
        if(game.equipment[equipmentList[i]].locked !== 0) continue;
        var attackBonus = game.equipment[equipmentList[i]].attackCalculated;
        var level       = game.equipment[equipmentList[i]].level;
        dmg += attackBonus*level;
    }
    if (mutations.Magma.active()) {
        dmg *= mutations.Magma.getTrimpDecay();
    }
    dmg *= game.resources.trimps.maxSoldiers;
    if (game.portal.Power.level > 0) {
        dmg += (dmg * game.portal.Power.level * game.portal.Power.modifier);
    }
    if (game.portal.Power_II.level > 0) {
        dmg *= (1 + (game.portal.Power_II.modifier * game.portal.Power_II.level));
    }
    if (game.global.formation !== 0) {
        dmg *= (game.global.formation == 2) ? 4 : 0.5;
    }
    return dmg;
}

function calcOurHealth(stance) {
    var health = 50;

    if (game.resources.trimps.maxSoldiers > 0) {
        var equipmentList = ["Shield", "Boots", "Helmet", "Pants", "Shoulderguards", "Breastplate", "Gambeson"];
        for(var i = 0; i < equipmentList.length; i++) {
            if(game.equipment[equipmentList[i]].locked !== 0) continue;
            var healthBonus = game.equipment[equipmentList[i]].healthCalculated;
            var level       = game.equipment[equipmentList[i]].level;
            health += healthBonus*level;
        }
    }
    health *= game.resources.trimps.maxSoldiers;
    if (game.goldenUpgrades.Battle.currentBonus > 0) {
        health *= game.goldenUpgrades.Battle.currentBonus;
    }
    if (game.portal.Toughness.level > 0) {
        health *= ((game.portal.Toughness.level * game.portal.Toughness.modifier) + 1);
    }
    if (game.portal.Toughness_II.level > 0) {
        health *= ((game.portal.Toughness_II.level * game.portal.Toughness_II.modifier) + 1);
    }
    if (game.portal.Resilience.level > 0) {
        health *= (Math.pow(game.portal.Resilience.modifier + 1, game.portal.Resilience.level));
    }
    var geneticist = game.jobs.Geneticist;
    if (geneticist.owned > 0) {
        health *= (Math.pow(1.01, game.global.lastLowGen));
    }
    if (stance && game.global.formation > 0) {
        var formStrength = 0.5;
        if (game.global.formation == 1) formStrength = 4;
        health *= formStrength;
    }
    if (game.global.challengeActive == "Life") {
        health *= game.challenges.Life.getHealthMult();
    } else if (game.global.challengeActive == "Balance") {
        health *= game.challenges.Balance.getHealthMult();
    } else if (typeof game.global.dailyChallenge.pressure !== 'undefined') {
        health *= (dailyModifiers.pressure.getMult(game.global.dailyChallenge.pressure.strength, game.global.dailyChallenge.pressure.stacks));
    }
    if (mutations.Magma.active()) {
        var mult = mutations.Magma.getTrimpDecay();
        var lvls = game.global.world - mutations.Magma.start() + 1;
        health *= mult;
    }
    var heirloomBonus = calcHeirloomBonus("Shield", "trimpHealth", 0, true);
    if (heirloomBonus > 0) {
        health *= ((heirloomBonus / 100) + 1);
    }
    if (game.global.radioStacks > 0) {
        health *= (1 - (game.global.radioStacks * 0.1));
    }
    if (game.global.totalSquaredReward > 0) {
        health *= (1 + (game.global.totalSquaredReward / 100));
    }
    if (game.jobs.Amalgamator.owned > 0) {
        health *= game.jobs.Amalgamator.getHealthMult();
    }
    if (game.talents.voidPower.purchased && game.global.voidBuff) {
        var amt = (game.talents.voidPower2.purchased) ? ((game.talents.voidPower3.purchased) ? 65 : 35) : 15;
        health *= (1 + (amt / 100));
    }
    return health;
}

function highDamageShield() {
    if (game.global.challengeActive != "Daily" && game.global.ShieldEquipped.name == getPageSetting('highdmg')) {
        critCC = getPlayerCritChance();
        critDD = getPlayerCritDamageMult();
        trimpAA = (calcHeirloomBonus("Shield", "trimpAttack", 1, true)/100);
    }
    if (game.global.challengeActive == "Daily" && game.global.ShieldEquipped.name == getPageSetting('dhighdmg')) {
        critCC = getPlayerCritChance();
        critDD = getPlayerCritDamageMult();
        trimpAA = (calcHeirloomBonus("Shield", "trimpAttack", 1, true)/100);
    }
}

function getCritMulti(high) {
    var critChance = getPlayerCritChance();
    var CritD = getPlayerCritDamageMult();

    if (
        high &&
        (getPageSetting('AutoStance') == 3 && getPageSetting('highdmg') != undefined && game.global.challengeActive != "Daily") ||
        (getPageSetting('use3daily') == true && getPageSetting('dhighdmg') != undefined && game.global.challengeActive == "Daily")
    ) {
        highDamageShield();
        critChance = critCC;
        CritD = critDD;
    }

    if (critChance < 0) {
        CritDHModifier = (1 + critChance - critChance / 5);
    }
    if (critChance >= 0 && critChance < 1) {
        CritDHModifier = (1 - critChance + critChance * CritD);
    }
    if (critChance >= 1 && critChance < 2) {
        CritDHModifier = ((critChance - 1) * getMegaCritDamageMult(2) * CritD + (2 - critChance) * CritD);
    }
    if (critChance >= 2) {
        CritDHModifier = ((critChance - 2) * Math.pow(getMegaCritDamageMult(2), 2) * CritD + (3 - critChance) * getMegaCritDamageMult(2) * CritD);
    }

    return CritDHModifier;
}

function calcOurBlock(stance) {
    var block = 0;
    var gym = game.buildings.Gym;
    if (gym.owned > 0) {
        var gymStrength = gym.owned * gym.increase.by;
        block += gymStrength;
    }
    var shield = game.equipment.Shield;
    if (shield.blockNow && shield.level > 0) {
        var shieldStrength = shield.level * shield.blockCalculated;
        block += shieldStrength;
    }
    var trainer = game.jobs.Trainer;
    if (trainer.owned > 0) {
        var trainerStrength = trainer.owned * (trainer.modifier / 100);
        trainerStrength = calcHeirloomBonus("Shield", "trainerEfficiency", trainerStrength);
        block *= (trainerStrength + 1);
    }
    block *= game.resources.trimps.maxSoldiers;
    if (stance && game.global.formation == 3) {
        block *= 4;
    }
    var heirloomBonus = calcHeirloomBonus("Shield", "trimpBlock", 0, true);
    if (heirloomBonus > 0) {
        block *= ((heirloomBonus / 100) + 1);
    }
    if (game.global.radioStacks > 0) {
        block *= (1 - (game.global.radioStacks * 0.1));
    }
    return block;
}

function calcOurDmg(minMaxAvg, incStance, incFlucts) {
    var number = getTrimpAttack();
    var fluctuation = .2;
    var maxFluct = -1;
    var minFluct = -1;
    if (game.jobs.Amalgamator.owned > 0) {
        number *= game.jobs.Amalgamator.getDamageMult();
    }
    if (game.challenges.Electricity.stacks > 0) {
        number *= (1 - (game.challenges.Electricity.stacks * 0.1));
    }
    if (getPageSetting('45stacks') == false && game.global.antiStacks > 0) {
        number *= ((game.global.antiStacks * game.portal.Anticipation.level * game.portal.Anticipation.modifier) + 1);
    }
    if (getPageSetting('45stacks') == true && game.global.antiStacks > 0) {
        number *= ((45 * game.portal.Anticipation.level * game.portal.Anticipation.modifier) + 1);
    }
    if (game.global.mapBonus > 0) {
        number *= ((game.global.mapBonus * .2) + 1);
    }
    if (game.global.achievementBonus > 0) {
        number *= (1 + (game.global.achievementBonus / 100));
    }
    if (game.global.challengeActive == "Discipline") {
        fluctuation = .995;
    } else if (game.portal.Range.level > 0) {
        minFluct = fluctuation - (.02 * game.portal.Range.level);
    }
    if (game.global.challengeActive == "Decay") {
        number *= Math.pow(0.995, game.challenges.Decay.stacks) * 5;
    }
    if (game.global.roboTrimpLevel > 0) {
        number *= ((0.2 * game.global.roboTrimpLevel) + 1);
    }
    if (game.global.challengeActive == "Lead" && ((game.global.world % 2) == 1)) {
        number *= 1.5;
    }
    if (game.goldenUpgrades.Battle.currentBonus > 0) {
        number *= game.goldenUpgrades.Battle.currentBonus + 1;
    }
    if (game.talents.voidPower.purchased && game.global.voidBuff) {
        var vpAmt = (game.talents.voidPower2.purchased) ? ((game.talents.voidPower3.purchased) ? 65 : 35) : 15;
        number *= ((vpAmt / 100) + 1);
    }
    if (game.global.totalSquaredReward > 0) {
        number *= ((game.global.totalSquaredReward / 100) + 1);
    }
    if (getPageSetting('fullice') == true && getEmpowerment() == "Ice") {
        number *= (Fluffy.isRewardActive('naturesWrath') ? 3 : 2);
    }
    if (getPageSetting('fullice') == false && getEmpowerment() == "Ice") {
        number *= (game.empowerments.Ice.getDamageModifier()+1);
    }
    if (getEmpowerment() == "Poison" && getPageSetting('addpoison') == true) {
        number *= (1 + game.empowerments.Poison.getModifier()) * 4;
    }
    if (game.talents.magmamancer.purchased) {
        number *= game.jobs.Magmamancer.getBonusPercent();
    }
    if (game.talents.stillRowing2.purchased) {
        number *= ((game.global.spireRows * 0.06) + 1);
    }
    if (game.global.voidBuff && game.talents.voidMastery.purchased) {
        number *= 5;
    }
    if (game.talents.healthStrength.purchased && mutations.Healthy.active()) {
        number *= ((0.15 * mutations.Healthy.cellCount()) + 1);
    }
    if (game.global.sugarRush > 0) {
        number *= sugarRush.getAttackStrength();
    }
    if (playerSpireTraps.Strength.owned) {
        var strBonus = playerSpireTraps.Strength.getWorldBonus();
        number *= (1 + (strBonus / 100));
    }
    if (Fluffy.isRewardActive('voidSiphon') && game.stats.totalVoidMaps.value) {
        number *= (1 + (game.stats.totalVoidMaps.value * 0.05));
    }
    if (game.global.challengeActive == "Life") {
        number *= game.challenges.Life.getHealthMult();
    }
    if (game.singleRunBonuses.sharpTrimps.owned) {
        number *= 1.5;
    }
    if (game.global.uberNature == "Poison") {
        number *= 3;
    }
    if (incStance && game.talents.scry.purchased && game.global.formation == 4 && (mutations.Healthy.active() || mutations.Corruption.active())) {
        number *= 2;
    }
    if (game.global.challengeActive == "Daily" && game.talents.daily.purchased) {
        number *= 1.5;
    }
    if (game.global.challengeActive == 'Lead' && game.global.world % 2 == 1 && game.global.world != 179) {
        number /= 1.5;
    }
    if (game.global.challengeActive == "Daily") {
        if (typeof game.global.dailyChallenge.minDamage !== 'undefined') {
            if (minFluct == -1) minFluct = fluctuation;
            minFluct += dailyModifiers.minDamage.getMult(game.global.dailyChallenge.minDamage.strength);
        }
        if (typeof game.global.dailyChallenge.maxDamage !== 'undefined') {
            if (maxFluct == -1) maxFluct = fluctuation;
            maxFluct += dailyModifiers.maxDamage.getMult(game.global.dailyChallenge.maxDamage.strength);
        }
        if (typeof game.global.dailyChallenge.oddTrimpNerf !== 'undefined' && ((game.global.world % 2) == 1)) {
            number *= dailyModifiers.oddTrimpNerf.getMult(game.global.dailyChallenge.oddTrimpNerf.strength);
        }
        if (typeof game.global.dailyChallenge.evenTrimpBuff !== 'undefined' && ((game.global.world % 2) == 0)) {
            number *= dailyModifiers.evenTrimpBuff.getMult(game.global.dailyChallenge.evenTrimpBuff.strength);
        }
        if (typeof game.global.dailyChallenge.rampage !== 'undefined') {
            number *= dailyModifiers.rampage.getMult(game.global.dailyChallenge.rampage.strength, game.global.dailyChallenge.rampage.stacks);
        }
    }
    number = calcHeirloomBonus("Shield", "trimpAttack", number);
    if (Fluffy.isActive()) {
        number *= Fluffy.getDamageModifier();
    }


    if (!incStance && game.global.formation != 0) {
        number /= (game.global.formation == 2) ? 4 : 0.5;
    }

    var min = number;
    var max = number;
    var avg = number;

    min *= (getCritMulti(false)*0.8);
    avg *= getCritMulti(false);
    max *= (getCritMulti(false)*1.2);

    if (incFlucts) {
        if (minFluct > 1) minFluct = 1;
        if (maxFluct == -1) maxFluct = fluctuation;
        if (minFluct == -1) minFluct = fluctuation;

        min *= (1 - minFluct);
        max *= (1 + maxFluct);
        avg *= 1 + (maxFluct - minFluct)/2;
    }

    if (minMaxAvg == "min") {
        return min;
    } else if (minMaxAvg == "max") {
        return max;
    } else if (minMaxAvg == "avg") {
        return avg;
    }
}

function calcDailyAttackMod(number) {
    if (game.global.challengeActive == "Daily") {
        if (typeof game.global.dailyChallenge.badStrength !== 'undefined') {
            number *= dailyModifiers.badStrength.getMult(game.global.dailyChallenge.badStrength.strength);
        }
        if (typeof game.global.dailyChallenge.badMapStrength !== 'undefined' && game.global.mapsActive) {
            number *= dailyModifiers.badMapStrength.getMult(game.global.dailyChallenge.badMapStrength.strength);
        }
        if (typeof game.global.dailyChallenge.bloodthirst !== 'undefined') {
            number *= dailyModifiers.bloodthirst.getMult(game.global.dailyChallenge.bloodthirst.strength, game.global.dailyChallenge.bloodthirst.stacks);
        }
    }
    return number;
}

function calcSpire(cell, name, what) {
    var exitCell = cell;
    if (game.global.challengeActive != "Daily" && isActiveSpireAT() && getPageSetting('ExitSpireCell') > 0 && getPageSetting('ExitSpireCell') <= 100) {
        exitCell = (getPageSetting('ExitSpireCell') - 1);
    }
    if (game.global.challengeActive == "Daily" && disActiveSpireAT() && getPageSetting('dExitSpireCell') > 0 && getPageSetting('dExitSpireCell') <= 100) {
        exitCell = (getPageSetting('dExitSpireCell') - 1);
    }
    var enemy = cell == 99 ? (exitCell == 99 ? game.global.gridArray[99].name : "Snimp") : name;
    var base = (what == "attack") ? game.global.getEnemyAttack(exitCell, enemy, false) : (calcEnemyBaseHealth(game.global.world, exitCell, enemy) * 2);
    var mod = (what == "attack") ? 1.17 : 1.14;
    var spireNum = Math.floor((game.global.world-100)/100);
    if (spireNum > 1) {
        var modRaiser = 0;
        modRaiser += ((spireNum - 1) / 100);
        if (what == "attack") modRaiser *= 8;
        if (what == "health") modRaiser *= 2;
        mod += modRaiser;
    }
    base *= Math.pow(mod, exitCell);
    base *= game.badGuys[enemy][what];
    return base;
}

function calcBadGuyDmg(enemy,attack,daily,maxormin,disableFlucts) {
    var number;
    if (enemy) {
        number = enemy.attack;
    } else {
        number = attack;
    }
    var fluctuation = .2;
    var maxFluct = -1;
    var minFluct = -1;

    if (!enemy && game.global.challengeActive) {
        if (game.global.challengeActive == "Coordinate") {
            number *= getBadCoordLevel();
        } else if (game.global.challengeActive == "Meditate") {
            number *= 1.5;
        } else if (enemy && game.global.challengeActive == "Nom" && typeof enemy.nomStacks !== 'undefined') {
            number *= Math.pow(1.25, enemy.nomStacks);
        } else if (game.global.challengeActive == "Watch") {
            number *= 1.25;
        } else if (game.global.challengeActive == "Lead") {
            number *= (1 + (game.challenges.Lead.stacks * 0.04));
        } else if (game.global.challengeActive == "Scientist" && getScientistLevel() == 5) {
            number *= 10;
        } else if (game.global.challengeActive == "Corrupted") {
            number *= 3;
        } else if (game.global.challengeActive == "Domination") {
            if (game.global.lastClearedCell == 98) {
                number *= 2.5;
            } else {
                number *= 0.1;
            }
        } else if (game.global.challengeActive == "Obliterated" || game.global.challengeActive == "Eradicated") {
            var oblitMult = (game.global.challengeActive == "Eradicated") ? game.challenges.Eradicated.scaleModifier : 1e12;
            var zoneModifier = Math.floor(game.global.world / game.challenges[game.global.challengeActive].zoneScaleFreq);
            oblitMult *= Math.pow(game.challenges[game.global.challengeActive].zoneScaling, zoneModifier);
            number *= oblitMult;
        }
        if (daily) {
            number = calcDailyAttackMod(number);
        }
    }
    if (!enemy && game.global.usingShriek) {
        number *= game.mapUnlocks.roboTrimp.getShriekValue();
    }

    if (!disableFlucts) {
        if (minFluct > 1) minFluct = 1;
        if (maxFluct == -1) maxFluct = fluctuation;
        if (minFluct == -1) minFluct = fluctuation;
        var min = Math.floor(number * (1 - minFluct));
        var max = Math.ceil(number + (number * maxFluct));
        return maxormin ? max : min;
    }
    return number;
}

function calcEnemyBaseHealth(zone, level, name) {
    var health = 0;
    health += 130 * Math.sqrt(zone) * Math.pow(3.265, zone / 2);
    health -= 110;
    if (zone == 1 || zone == 2 && level < 10) {
        health *= 0.6;
        health = (health * 0.25) + ((health * 0.72) * (level / 100));
    } else if (zone < 60) {
        health = (health * 0.4) + ((health * 0.4) * (level / 110));
    } else {
        health = (health * 0.5) + ((health * 0.8) * (level / 100));
        health *= Math.pow(1.1, zone - 59);
    }
    if (zone < 60) {
        health *= 0.75 * game.badGuys[name].health;
    }
    return health;
}

function calcEnemyHealth() {
    if(game.global.gridArray.length == 0) {
        // Short circuit, in case fighting isn't enabled yet
        return 1;
    }
    if(game.global.spireActive) {
        return calcSpire(99, game.global.gridArray[99].name, 'health');
    }
    // TODO:  Maybe calculate level based on other factors, like whether or not we want to do void maps this zone
    var level = game.global.world;
    var worst_imp = 'Snimp';
    for(var i in game.global.gridArray) {
        var bad_guy = game.global.gridArray[i].name;
        if(game.badGuys[bad_guy].health > worst_imp.health) {
            worst_imp = bad_guy;
        }
    }
    var health = calcEnemyBaseHealth(game.global.world, level, worst_imp);
    var corrupt = mutations.Corruption.active();
    var healthy = mutations.Healthy.active();
    if (corrupt && !healthy) {
        var cptnum = getCorruptedCellsNum();
        var cpthlth = getCorruptScale("health");
        var cptpct = cptnum / 100;
        var hlthprop = cptpct * cpthlth;
        if (hlthprop >= 1) {
            health *= hlthprop;
        }
    }
    if (healthy) {
        var scales = Math.floor((game.global.world - 150) / 6);
        health *= 14*Math.pow(1.05, scales);
        health *= 1.15;
    }
    if (game.global.challengeActive == "Obliterated" || game.global.challengeActive == "Eradicated") {
        var oblitMult = (game.global.challengeActive == "Eradicated") ? game.challenges.Eradicated.scaleModifier : 1e12;
        var zoneModifier = Math.floor(game.global.world / game.challenges[game.global.challengeActive].zoneScaleFreq);
        oblitMult *= Math.pow(game.challenges[game.global.challengeActive].zoneScaling, zoneModifier);
        health *= oblitMult;
    }
    if (game.global.challengeActive == "Coordinate") {
        health *= getBadCoordLevel();
    }
    if (game.global.challengeActive == "Toxicity") {
        health *= 2;
    }
    if (game.global.challengeActive == 'Lead') {
        health *= (1 + (game.challenges.Lead.stacks * 0.04));
    }
    if (game.global.challengeActive == 'Balance') {
        health *= 2;
    }
    if (game.global.challengeActive == 'Meditate') {
        health *= 2;
    }
    if (game.global.challengeActive == 'Life') {
        health *= 10;
    }
    if (game.global.challengeActive == "Domination") {
        health *= 7.5;
    }
    return health;
}

function calcHDratio() {
    var ratio = 0;
    var ourBaseDamage = calcOurDmg("avg", false, true);

    //Shield
    highDamageShield();
    if (getPageSetting('AutoStance') == 3 && getPageSetting('highdmg') != undefined && game.global.challengeActive != "Daily" && game.global.ShieldEquipped.name != getPageSetting('highdmg')) {
        ourBaseDamage /= getCritMulti(false);
        ourBaseDamage *= trimpAA;
        ourBaseDamage *= getCritMulti(true);
    }
    if (getPageSetting('use3daily') == true && getPageSetting('dhighdmg') != undefined && game.global.challengeActive == "Daily" && game.global.ShieldEquipped.name != getPageSetting('dhighdmg')) {
        ourBaseDamage /= getCritMulti(false);
        ourBaseDamage *= trimpAA;
        ourBaseDamage *= getCritMulti(true);
    }

    ratio = calcEnemyHealth() / ourBaseDamage;
    return ratio;
}

function should_windstack(enemy) {
    var ratio = calcHDratio();
    if(game.global.uberNature == 'Wind' && getEmpowerment() == 'Wind' && !game.global.mapsActive) {
        if(game.global.lastClearedCell == 98 || enemy.mutation == 'Corruption' || enemy.mutation == 'Healthy') {
            if(getPageSetting('use3daily') && game.global.challengeActive == 'Daily' && ratio < getPageSetting('dWindStackingMinHD') && game.global.world >= getPageSetting('dWindStackingMin')) {
                return windstack_count_check();
            } else if(getPageSetting('AutoStance') == 3 && game.global.challengeActive != 'Daily' && ratio < getPageSetting('WindStackingMinHD') && game.global.world >= getPageSetting('WindStackingMin')) {
                return windstack_count_check();
            } else if(checkIfLiquidZone() && getPageSetting('liqstack')) {
                return windstack_count_check();
            }
        }
    }
    return false;
}

function windstack_count_check() {
    var stacks = 190;

    if(game.global.challengeActive == 'Daily') {
        var setting = getPageSetting('dWindStackingMax');
        if(setting > 0) {
            stacks = setting;
        }
    } else {
        var setting = getPageSetting('WindStackingMax');
        if(setting > 0) {
            stacks = setting;
        }
    }

    if(game.global.uberNature == "Wind") {
        stacks += 100;
    }

    return game.empowerments.Wind.currentDebuffPower < stacks;
}

function calcCurrentStance() {
    var ratio = calcHDratio();
    var curEnemy = getCurrentEnemy(1);
    if(should_windstack(curEnemy)) {
        return 15;
    } else {
        //Base Calc
        var ehealth = 1;
        if (game.global.fighting) {
            ehealth = (curEnemy.maxHealth - curEnemy.health);
        }
        var attacklow = calcOurDmg("max", false, true);
        var attackhigh = calcOurDmg("max", false, true);

        //Heirloom Calc
        highDamageShield();
        if (getPageSetting('AutoStance') == 3 && getPageSetting('highdmg') != undefined && game.global.challengeActive != "Daily" && game.global.ShieldEquipped.name != getPageSetting('highdmg')) {
            attackhigh *= trimpAA;
            attackhigh *= getCritMulti(true);
        }
        if (getPageSetting('use3daily') == true && getPageSetting('dhighdmg') != undefined && game.global.challengeActive == "Daily" && game.global.ShieldEquipped.name != getPageSetting('dhighdmg')) {
            attackhigh *= trimpAA;
            attackhigh *= getCritMulti(true);
        }

        //Heirloom Switch
        if (ehealth > 0) {
            var hitslow = (ehealth / attacklow);
            var hitshigh = (ehealth / attackhigh);
            var stacks = 190;
            var usehigh = false;
            var stacksleft = 1;

            if (game.global.challengeActive != "Daily" && getPageSetting('WindStackingMax') > 0) {
                stacks = getPageSetting('WindStackingMax');
            }
            if (game.global.challengeActive == "Daily" && getPageSetting('dWindStackingMax') > 0) {
                stacks = getPageSetting('dWindStackingMax');
            }
            if (game.global.uberNature == "Wind") {
                stacks += 100;
            }
            if (getEmpowerment() == "Wind") {
                stacksleft = (stacks - game.empowerments.Wind.currentDebuffPower);
            }

            //Use High
            if (
                (getEmpowerment() != "Wind") ||
                (game.empowerments.Wind.currentDebuffPower >= stacks) ||
                (hitshigh >= stacksleft) ||
                (game.global.mapsActive) ||
                (game.global.challengeActive != "Daily" && game.global.world < getPageSetting('WindStackingMin')) ||
                (game.global.challengeActive == "Daily" && game.global.world < getPageSetting('dWindStackingMin'))
            ) {
                usehigh = true;
            }
            if (
                (getPageSetting('wsmax') > 0 && game.global.world >= getPageSetting('wsmax') && !game.global.mapsActive && getEmpowerment() == "Wind" && game.global.challengeActive != "Daily" && getPageSetting('wsmaxhd') > 0 && ratio < getPageSetting('wsmaxhd')) ||
                (getPageSetting('dwsmax') > 0 && game.global.world >= getPageSetting('dwsmax') && !game.global.mapsActive && getEmpowerment() == "Wind" && game.global.challengeActive == "Daily" && getPageSetting('dwsmaxhd') > 0 && ratio < getPageSetting('dwsmaxhd'))
            ) {
                usehigh = false;
            }

            if (!usehigh) {
                //Low
                if ((game.empowerments.Wind.currentDebuffPower >= stacks) || ((hitslow * 4) > stacksleft)) {
                    return 2;
                } else if ((hitslow) > stacksleft) {
                    return 0;
                } else {
                    return 1;
                }

            } else {
                //High
                // TODO:  This seems redundant, given that we already used a looser set of requirements to set usehigh to true above, which is the only way to end up here.
                if (
                    (getEmpowerment() != "Wind") ||
                    (game.empowerments.Wind.currentDebuffPower >= stacks) ||
                    ((hitshigh * 4) > stacksleft) ||
                    (game.global.mapsActive) ||
                    (game.global.challengeActive != "Daily" && game.global.world < getPageSetting('WindStackingMin')) ||
                    (game.global.challengeActive == "Daily" && game.global.world < getPageSetting('dWindStackingMin'))
                ) {
                    return 12;
                } else if ((hitshigh) > stacksleft) {
                    return 10;
                } else {
                    return 11;
                }
            }
        }
    }
}

