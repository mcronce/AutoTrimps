//Helium

var upgradeList = ['Miners', 'Scientists', 'Coordination', 'Speedminer', 'Speedlumber', 'Speedfarming', 'Speedscience', 'Speedexplorer', 'Megaminer', 'Megalumber', 'Megafarming', 'Megascience', 'Efficiency', 'TrainTacular', 'Trainers', 'Explorers', 'Blockmaster', 'Battle', 'Bloodlust', 'Bounty', 'Egg', 'Anger', 'Formations', 'Dominance', 'Barrier', 'UberHut', 'UberHouse', 'UberMansion', 'UberHotel', 'UberResort', 'Trapstorm', 'Gigastation', 'Shieldblock', 'Potency', 'Magmamancers'];

function buyUpgrades() {
    for (var upgrade in upgradeList) {
        upgrade = upgradeList[upgrade];
        var gameUpgrade = game.upgrades[upgrade];
        var available = (gameUpgrade.allowed > gameUpgrade.done && canAffordTwoLevel(gameUpgrade));
        var fuckbuildinggiga = (game.talents.autoStructure.purchased && game.talents.deciBuild.purchased && getPageSetting('hidebuildings')==true && getPageSetting('BuyBuildingsNew')==0);

        //Coord
        if(upgrade == 'Coordination') {
            if(getPageSetting('BuyUpgradesNew') == 2 || !canAffordCoordinationTrimps()) {
                continue;
            }
            // Amalgamators
            // TODO:  Make this readable
            if(getPageSetting('amalcoord') == true && getPageSetting('amalcoordhd') > 0 && calcHDratio() < getPageSetting('amalcoordhd') && ((getPageSetting('amalcoordt') < 0 && (game.global.world < getPageSetting('amalcoordz') || getPageSetting('amalcoordz') < 0)) || (getPageSetting('amalcoordt') > 0 && getPageSetting('amalcoordt') > game.jobs.Amalgamator.owned && (game.resources.trimps.realMax() / game.resources.trimps.getCurrentSend()) > 2000))) {
                if(game.global.spireActive) {
                    // This sucks, but without it we don't have enough health
                    //    to complete Spire I.  Maybe make this more dynamic to
                    //    support just making sure we survive spires, rather
                    //    than hardcoding 20 per.  That said, 20 per spire is
                    //    a lot less than we end up with in later zones just
                    //    letting it do its thing with a amalcoordhd set to
                    //    0.5, so it's probably fine.
                    var target_coords = (game.global.world - 100) / 5;
                    if(gameUpgrade.done >= target_coords) {
                        continue;
                    }
                } else {
                    continue;
                }
            }

            //WS
            var is_daily = game.global.challengeActive == 'Daily';
            var is_wind_stance;
            if(is_daily) {
                is_wind_stance = getPageSetting('use3daily') == true;
            } else {
                is_wind_stance = getPageSetting('AutoStance') == 3;
            }
            if(getEmpowerment() == "Wind") {
                if(calcHDratio() < 5) {
                    if((!is_daily) && is_wind_stance && getPageSetting('WindStackingMin') > 0 && game.global.world >= getPageSetting('WindStackingMin')) {
                        continue;
                    } else if(is_daily && is_wind_stance && getPageSetting('dWindStackingMin') > 0 && game.global.world >= getPageSetting('dWindStackingMin')) {
                        continue;
                    }
                }
            } else {
                if((!is_daily) && is_wind_stance && getPageSetting('wsmax') > 0 && getPageSetting('wsmaxhd') > 0 && game.global.world >= getPageSetting('wsmax') && calcHDratio() < getPageSetting('wsmaxhd')) {
                    continue;
                } else if(is_daily && is_wind_stance && getPageSetting('dwsmax') > 0 && getPageSetting('dwsmaxhd') > 0 && game.global.world >= getPageSetting('dwsmax') && calcHDratio() < getPageSetting('dwsmaxhd')) {
                    continue;
                }
            }
        }

        //Other
        if (upgrade == 'Shieldblock' && !getPageSetting('BuyShieldblock')) continue;
        if (upgrade == 'Gigastation' && !fuckbuildinggiga && (game.global.lastWarp ? game.buildings.Warpstation.owned < (Math.floor(game.upgrades.Gigastation.done * getPageSetting('DeltaGigastation')) + getPageSetting('FirstGigastation')) : game.buildings.Warpstation.owned < getPageSetting('FirstGigastation'))) continue;
        if (upgrade == 'Bloodlust' && game.global.challengeActive == 'Scientist' && getPageSetting('BetterAutoFight')) continue;

        if (!available) continue;
        if (game.upgrades.Scientists.done < game.upgrades.Scientists.allowed && upgrade != 'Scientists') continue;
        buyUpgrade(upgrade, true, true);
        debug('Upgraded ' + upgrade, "upgrades", "*upload2");
    }
}

//Radon

var RupgradeList = ['Miners', 'Scientists', 'Coordination', 'Speedminer', 'Speedlumber', 'Speedfarming', 'Speedscience', 'Speedexplorer', 'Megaminer', 'Megalumber', 'Megafarming', 'Megascience', 'Efficiency', 'Explorers', 'Battle', 'Bloodlust', 'Bounty', 'Egg', 'Rage', 'Prismatic', 'Prismalicious', 'Formations', 'Dominance', 'UberHut', 'UberHouse', 'UberMansion', 'UberHotel', 'UberResort', 'Trapstorm', 'Potency'];

function RbuyUpgrades() {
    for (var upgrade in RupgradeList) {
        upgrade = RupgradeList[upgrade];
        var gameUpgrade = game.upgrades[upgrade];
        var available = (gameUpgrade.allowed > gameUpgrade.done && canAffordTwoLevel(gameUpgrade));

        //Coord
        if (upgrade == 'Coordination' && (getPageSetting('RBuyUpgradesNew') == 2 || !canAffordCoordinationTrimps())) continue;

        //Other
        if (!available) continue;
        if (game.upgrades.Scientists.done < game.upgrades.Scientists.allowed && upgrade != 'Scientists') continue;
        buyUpgrade(upgrade, true, true);
        debug('Upgraded ' + upgrade, "upgrades", "*upload2");
    }
}
