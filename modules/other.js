MODULES["other"] = {};
MODULES["other"].enableRoboTrimpSpam = true;
var prestraid=!1,dprestraid=!1,failpraid=!1,dfailpraid=!1,bwraided=!1,dbwraided=!1,failbwraid=!1,dfailbwraid=!1,perked=!1,prestraidon=!1,dprestraidon=!1,mapbought=!1,dmapbought=!1,bwraidon=!1,dbwraidon=!1,presteps=null,minMaxMapCost,fMap,pMap,shouldFarmFrags=!1,praidDone=!1;
function armydeath(){if(game.global.mapsActive)return!1;var e=game.global.lastClearedCell+1,l=game.global.gridArray[e].attack*dailyModifiers.empower.getMult(game.global.dailyChallenge.empower.strength,game.global.dailyChallenge.empower.stacks),a=game.global.soldierHealth;"Ice"==getEmpowerment()&&(l*=game.empowerments.Ice.getCombatModifier());var g=game.global.soldierCurrentBlock;return 3==game.global.formation?g/=4:"0"!=game.global.formation&&(g*=2),g>game.global.gridArray[e].attack?l*=getPierceAmt():l-=g*(1-getPierceAmt()),"Daily"==game.global.challengeActive&&void 0!==game.global.dailyChallenge.crits&&(l*=dailyModifiers.crits.getMult(game.global.dailyChallenge.crits.strength)),void 0!==game.global.dailyChallenge.bogged&&(a-=game.global.soldierHealthMax*dailyModifiers.bogged.getMult(game.global.dailyChallenge.bogged.strength)),void 0!==game.global.dailyChallenge.plague&&(a-=game.global.soldierHealthMax*dailyModifiers.plague.getMult(game.global.dailyChallenge.plague.strength,game.global.dailyChallenge.plague.stacks)),"Electricity"==game.global.challengeActive&&(a-=game.global.soldierHealth-=game.global.soldierHealthMax*(.1*game.challenges.Electricity.stacks)),"corruptCrit"==game.global.gridArray[e].corrupted?l*=5:"healthyCrit"==game.global.gridArray[e].corrupted?l*=7:"corruptBleed"==game.global.gridArray[e].corrupted?a*=.8:"healthyBleed"==game.global.gridArray[e].corrupted&&(a*=.7),(a-=l)<=1e3}
function autoRoboTrimp(){if(!(0<game.global.roboTrimpCooldown)&&game.global.roboTrimpLevel){var a=parseInt(getPageSetting("AutoRoboTrimp"));0==a||game.global.world>=a&&!game.global.useShriek&&(magnetoShriek(),MODULES.other.enableRoboTrimpSpam&&debug("Activated Robotrimp MagnetoShriek Ability @ z"+game.global.world,"graphs","*podcast"))}}
function isBelowThreshold(a){return a!=game.global.world}
function buyWeps(){if(!((getPageSetting('BuyWeaponsNew')==1)||(getPageSetting('BuyWeaponsNew')==3)))return;preBuy(),game.global.buyAmt=getPageSetting('gearamounttobuy'),game.equipment.Dagger.level<getPageSetting('CapEquip2')&&canAffordBuilding('Dagger',null,null,!0)&&buyEquipment('Dagger',!0,!0),game.equipment.Mace.level<getPageSetting('CapEquip2')&&canAffordBuilding('Mace',null,null,!0)&&buyEquipment('Mace',!0,!0),game.equipment.Polearm.level<getPageSetting('CapEquip2')&&canAffordBuilding('Polearm',null,null,!0)&&buyEquipment('Polearm',!0,!0),game.equipment.Battleaxe.level<getPageSetting('CapEquip2')&&canAffordBuilding('Battleaxe',null,null,!0)&&buyEquipment('Battleaxe',!0,!0),game.equipment.Greatsword.level<getPageSetting('CapEquip2')&&canAffordBuilding('Greatsword',null,null,!0)&&buyEquipment('Greatsword',!0,!0),game.equipment.Arbalest.level<getPageSetting('CapEquip2')&&canAffordBuilding('Arbalest',null,null,!0)&&buyEquipment('Arbalest',!0,!0),postBuy()}
function buyArms(){if(!((getPageSetting('BuyArmorNew')==1)||(getPageSetting('BuyArmorNew')==3)))return;preBuy(),game.global.buyAmt=10,game.equipment.Shield.level<getPageSetting('CapEquiparm')&&canAffordBuilding('Shield',null,null,!0)&&buyEquipment('Shield',!0,!0),game.equipment.Boots.level<getPageSetting('CapEquiparm')&&canAffordBuilding('Boots',null,null,!0)&&buyEquipment('Boots',!0,!0),game.equipment.Helmet.level<getPageSetting('CapEquiparm')&&canAffordBuilding('Helmet',null,null,!0)&&buyEquipment('Helmet',!0,!0),game.equipment.Pants.level<getPageSetting('CapEquiparm')&&canAffordBuilding('Pants',null,null,!0)&&buyEquipment('Pants',!0,!0),game.equipment.Shoulderguards.level<getPageSetting('CapEquiparm')&&canAffordBuilding('Shoulderguards',null,null,!0)&&buyEquipment('Shoulderguards',!0,!0),game.equipment.Breastplate.level<getPageSetting('CapEquiparm')&&canAffordBuilding('Breastplate',null,null,!0)&&buyEquipment('Breastplate',!0,!0),game.equipment.Gambeson.level<getPageSetting('CapEquiparm')&&canAffordBuilding('Gambeson',null,null,!0)&&buyEquipment('Gambeson',!0,!0),postBuy()}
function isActiveSpireAT(){return game.global.challengeActive!='Daily'&&game.global.spireActive&&game.global.world>=getPageSetting('IgnoreSpiresUntil')}
function disActiveSpireAT(){return game.global.challengeActive=='Daily'&&game.global.spireActive&&game.global.world>=getPageSetting('dIgnoreSpiresUntil')}
function exitSpireCell(){isActiveSpireAT()&&game.global.lastClearedCell>=getPageSetting('ExitSpireCell')-1&&endSpire()}
function dailyexitSpireCell(){disActiveSpireAT()&&game.global.lastClearedCell>=getPageSetting('dExitSpireCell')-1&&endSpire()}
function plusPres(){document.getElementById("biomeAdvMapsSelect").value="Random",document.getElementById("advExtraLevelSelect").value=plusMapToRun(game.global.world),document.getElementById("advSpecialSelect").value="p",document.getElementById("lootAdvMapsRange").value=0,document.getElementById("difficultyAdvMapsRange").value=9,document.getElementById("sizeAdvMapsRange").value=9,document.getElementById("advPerfectCheckbox").checked=!1,document.getElementById("mapLevelInput").value=game.global.world,updateMapCost()}
function plusMapToRun(a){return 9==a%10?6:5>a%10?5-a%10:11-a%10}
function findLastBionic(){for(var a=game.global.mapsOwnedArray.length-1;0<=a;a--)if("Bionic"===game.global.mapsOwnedArray[a].location)return game.global.mapsOwnedArray[a]}
function helptrimpsnotdie(){if(!game.global.preMapsActive&&!game.global.fighting)buyArms();}
function usedaily3(){!0!=getPageSetting('use3daily')||'Daily'!=game.global.challengeActive||daily3||(daily3=!0),!1==getPageSetting('use3daily')&&'Daily'!=game.global.challengeActive&&daily3&&(daily3=!1),!0==getPageSetting('use3daily')&&'Daily'!=game.global.challengeActive&&daily3&&(daily3=!1)}
function buyshitspire(){!0==getPageSetting('spireshitbuy')&&game.global.spireActive&&game.global.world>=getPageSetting('IgnoreSpiresUntil')&&(buyWeps(),buyArms())}

//Helium

function autoGoldenUpgradesAT(setting) {
    var num = getAvailableGoldenUpgrades();
    if (num == 0) return;
    if (setting == "Void" || setting == "Void + Battle")
        setting = "Void";
    var success = buyGoldenUpgrade(setting);
    if (!success && setting == "Void") {
        num = getAvailableGoldenUpgrades();
        if (num == 0) return;
	if ((autoTrimpSettings.AutoGoldenUpgrades.selected == "Void" && !game.global.dailyChallenge.seed && !game.global.runningChallengeSquared) || (autoTrimpSettings.dAutoGoldenUpgrades.selected == "Void" && game.global.dailyChallenge.seed))
	setting = "Helium";
	if (((autoTrimpSettings.AutoGoldenUpgrades.selected == "Void" && getPageSetting('voidheliumbattle') > 0 && game.global.world >= getPageSetting('voidheliumbattle')) || (autoTrimpSettings.dAutoGoldenUpgrades.selected == "Void" && getPageSetting('dvoidheliumbattle') > 0 && game.global.world >= getPageSetting('dvoidheliumbattle'))) || ((autoTrimpSettings.AutoGoldenUpgrades.selected == "Void + Battle" && !game.global.dailyChallenge.seed && !game.global.runningChallengeSquared) || (autoTrimpSettings.dAutoGoldenUpgrades.selected == "Void + Battle" && game.global.dailyChallenge.seed) || (autoTrimpSettings.cAutoGoldenUpgrades.selected == "Void + Battle" && game.global.runningChallengeSquared)))
        setting = "Battle";
	buyGoldenUpgrade(setting);
    }
}

//Praiding

function plusMapToRun1() { 
var map = 1;
if (game.global.world % 10 == 5)
	map = 6;
if (game.global.world % 10 == 6)
	map = 5;
if (game.global.world % 10 == 7)
	map = 4;
if (game.global.world % 10 == 8)
	map = 3;
if (game.global.world % 10 == 9)
	map = 2;
return map;
}

function plusMapToRun2() { 
var map = 2;
if (game.global.world % 10 == 4)
	map = 7;
if (game.global.world % 10 == 5)
	map = 7;
if (game.global.world % 10 == 6)
	map = 6;
if (game.global.world % 10 == 7)
	map = 5;
if (game.global.world % 10 == 8)
	map = 4;
if (game.global.world % 10 == 9)
	map = 3;
return map;
}

function plusMapToRun3() { 
var map = 3;
if (game.global.world % 10 == 3)
	map = 8;
if (game.global.world % 10 == 4)
	map = 8;
if (game.global.world % 10 == 5)
	map = 8;
if (game.global.world % 10 == 6)
	map = 7;
if (game.global.world % 10 == 7)
	map = 6;
if (game.global.world % 10 == 8)
	map = 5;
if (game.global.world % 10 == 9)
	map = 4;
return map;
}

function plusMapToRun4() { 
var map = 4;
if (game.global.world % 10 == 2)
	map = 9;
if (game.global.world % 10 == 3)
	map = 9;
if (game.global.world % 10 == 4)
	map = 9;
if (game.global.world % 10 == 5)
	map = 9;
if (game.global.world % 10 == 6)
	map = 8;
if (game.global.world % 10 == 7)
	map = 7;
if (game.global.world % 10 == 8)
	map = 6;
if (game.global.world % 10 == 9)
	map = 5;
return map;
}

function plusMapToRun5() { 
var map = 5;
if (game.global.world % 10 == 1)
	map = 10;
if (game.global.world % 10 == 2)
	map = 10;
if (game.global.world % 10 == 3)
	map = 10;
if (game.global.world % 10 == 4)
	map = 10;
if (game.global.world % 10 == 5)
	map = 10;
if (game.global.world % 10 == 6)
	map = 9;
if (game.global.world % 10 == 7)
	map = 8;
if (game.global.world % 10 == 8)
	map = 7;
if (game.global.world % 10 == 9)
	map = 6;
return map;
}

function plusPres1() {
	document.getElementById("biomeAdvMapsSelect").value="Depths";
	document.getElementById("advExtraLevelSelect").value=plusMapToRun1();
	document.getElementById("advSpecialSelect").value="p";
	document.getElementById("lootAdvMapsRange").value=0;
	document.getElementById("difficultyAdvMapsRange").value=9;
	document.getElementById("sizeAdvMapsRange").value=9;
	document.getElementById("advPerfectCheckbox").checked=true;
	document.getElementById("mapLevelInput").value=game.global.world;
	updateMapCost();

	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("biomeAdvMapsSelect").value="Random";
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("advPerfectCheckbox").checked=false;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=8;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=8;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=7;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=7;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=6;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=6;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=5;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=5;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=4;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=4;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=3;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=3;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=2;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=2;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=1;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=1;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=0;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=0;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("advSpecialSelect").value="fa";
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("advSpecialSelect").value="0";
	updateMapCost();
	}
}

function plusPres2() {
	document.getElementById("biomeAdvMapsSelect").value="Depths";
	document.getElementById("advExtraLevelSelect").value=plusMapToRun2();
	document.getElementById("advSpecialSelect").value="p";
	document.getElementById("lootAdvMapsRange").value=0;
	document.getElementById("difficultyAdvMapsRange").value=9;
	document.getElementById("sizeAdvMapsRange").value=9;
	document.getElementById("advPerfectCheckbox").checked=true;
	document.getElementById("mapLevelInput").value=game.global.world;
	updateMapCost();

	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("biomeAdvMapsSelect").value="Random";
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("advPerfectCheckbox").checked=false;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=8;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=8;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=7;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=7;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=6;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=6;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=5;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=5;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=4;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=4;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=3;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=3;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=2;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=2;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=1;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=1;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=0;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=0;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("advSpecialSelect").value="fa";
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("advSpecialSelect").value="0";
	updateMapCost();
	}
}

function plusPres3() {
	document.getElementById("biomeAdvMapsSelect").value="Depths";
	document.getElementById("advExtraLevelSelect").value=plusMapToRun3();
	document.getElementById("advSpecialSelect").value="p";
	document.getElementById("lootAdvMapsRange").value=0;
	document.getElementById("difficultyAdvMapsRange").value=9;
	document.getElementById("sizeAdvMapsRange").value=9;
	document.getElementById("advPerfectCheckbox").checked=true;
	document.getElementById("mapLevelInput").value=game.global.world;
	updateMapCost();

	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("biomeAdvMapsSelect").value="Random";
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("advPerfectCheckbox").checked=false;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=8;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=8;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=7;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=7;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=6;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=6;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=5;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=5;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=4;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=4;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=3;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=3;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=2;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=2;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=1;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=1;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=0;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=0;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("advSpecialSelect").value="fa";
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("advSpecialSelect").value="0";
	updateMapCost();
	}
}

function plusPres4() {
	document.getElementById("biomeAdvMapsSelect").value="Depths";
	document.getElementById("advExtraLevelSelect").value=plusMapToRun4();
	document.getElementById("advSpecialSelect").value="p";
	document.getElementById("lootAdvMapsRange").value=0;
	document.getElementById("difficultyAdvMapsRange").value=9;
	document.getElementById("sizeAdvMapsRange").value=9;
	document.getElementById("advPerfectCheckbox").checked=true;
	document.getElementById("mapLevelInput").value=game.global.world;
	updateMapCost();

	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("biomeAdvMapsSelect").value="Random";
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("advPerfectCheckbox").checked=false;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=8;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=8;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=7;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=7;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=6;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=6;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=5;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=5;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=4;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=4;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=3;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=3;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=2;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=2;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=1;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=1;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=0;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=0;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("advSpecialSelect").value="fa";
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("advSpecialSelect").value="0";
	updateMapCost();
	}
}

function plusPres5() {
	document.getElementById("biomeAdvMapsSelect").value="Depths";
	document.getElementById("advExtraLevelSelect").value=plusMapToRun5();
	document.getElementById("advSpecialSelect").value="p";
	document.getElementById("lootAdvMapsRange").value=0;
	document.getElementById("difficultyAdvMapsRange").value=9;
	document.getElementById("sizeAdvMapsRange").value=9;
	document.getElementById("advPerfectCheckbox").checked=true;
	document.getElementById("mapLevelInput").value=game.global.world;
	updateMapCost();

	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("biomeAdvMapsSelect").value="Random";
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("advPerfectCheckbox").checked=false;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=8;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=8;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=7;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=7;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=6;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=6;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=5;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=5;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=4;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=4;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=3;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=3;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=2;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=2;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=1;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=1;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("difficultyAdvMapsRange").value=0;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("sizeAdvMapsRange").value=0;
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("advSpecialSelect").value="fa";
	updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
	document.getElementById("advSpecialSelect").value="0";
	updateMapCost();
	}
}

function pcheck1() {
    var go = false;
    if (getPageSetting('PraidingHD') <= 0) {
	go = true;
    }
    else if (getPageSetting('PraidingHD') > 0) {
	go = (getPageSetting('PraidingHD') >= calcHDratio(game.global.world + plusMapToRun1()));
    }
    if (getPageSetting('PraidingP') > 0 && getEmpowerment() == "Poison") {
	go = (getPageSetting('PraidingP') >= plusMapToRun1());
    }
    if (getPageSetting('PraidingI') > 0 && getEmpowerment() == "Ice") {
	go = (getPageSetting('PraidingI') >= plusMapToRun1());
    }
    return go;
}

function pcheck2() {
    var go = false;
    if (getPageSetting('PraidingHD') <= 0) {
	go = true;
    }
    else if (getPageSetting('PraidingHD') > 0) {
	go = (getPageSetting('PraidingHD') >= calcHDratio(game.global.world + plusMapToRun2()));
    }
    if (getPageSetting('PraidingP') > 0 && getEmpowerment() == "Poison") {
	go = (getPageSetting('PraidingP') >= plusMapToRun2());
    }
    if (getPageSetting('PraidingI') > 0 && getEmpowerment() == "Ice") {
	go = (getPageSetting('PraidingI') >= plusMapToRun2());
    }
    return go;
}

function pcheck3() {
    var go = false;
    if (getPageSetting('PraidingHD') <= 0) {
	go = true;
    }
    else if (getPageSetting('PraidingHD') > 0) {
	go = (getPageSetting('PraidingHD') >= calcHDratio(game.global.world + plusMapToRun3()));
    }
    if (getPageSetting('PraidingP') > 0 && getEmpowerment() == "Poison") {
	go = (getPageSetting('PraidingP') >= plusMapToRun3());
    }
    if (getPageSetting('PraidingI') > 0 && getEmpowerment() == "Ice") {
	go = (getPageSetting('PraidingI') >= plusMapToRun3());
    }
    return go;
}

function pcheck4() {
    var go = false;
    if (getPageSetting('PraidingHD') <= 0) {
	go = true;
    }
    else if (getPageSetting('PraidingHD') > 0) {
	go = (getPageSetting('PraidingHD') >= calcHDratio(game.global.world + plusMapToRun4()));
    }
    if (getPageSetting('PraidingP') > 0 && getEmpowerment() == "Poison") {
	go = (getPageSetting('PraidingP') >= plusMapToRun4());
    }
    if (getPageSetting('PraidingI') > 0 && getEmpowerment() == "Ice") {
	go = (getPageSetting('PraidingI') >= plusMapToRun4());
    }
    return go;
}

function pcheck5() {
    var go = false;
    if (getPageSetting('PraidingHD') <= 0) {
	go = true;
    }
    else if (getPageSetting('PraidingHD') > 0) {
	go = (getPageSetting('PraidingHD') >= calcHDratio(game.global.world + plusMapToRun5()));
    }
    if (getPageSetting('PraidingP') > 0 && getEmpowerment() == "Poison") {
	go = (getPageSetting('PraidingP') >= plusMapToRun5());
    }
    if (getPageSetting('PraidingI') > 0 && getEmpowerment() == "Ice") {
	go = (getPageSetting('PraidingI') >= plusMapToRun5());
    }
    return go;
}

function pcheckmap1() {
	var go = false;
	if (game.global.world % 10 == 0 && plusMapToRun1() == 1) {
	    go = true;
        }
	if (game.global.world % 10 == 1 && (plusMapToRun1() == 1 || plusMapToRun1() == 10)) {
	    go = true;
        }
	if (game.global.world % 10 == 2 && (plusMapToRun1() == 1 || plusMapToRun1() >= 9)) {
	    go = true;
        }
	if (game.global.world % 10 == 3 && (plusMapToRun1() == 1 || plusMapToRun1() >= 8)) {
	    go = true;
        }
	if (game.global.world % 10 == 4 && (plusMapToRun1() == 1 || plusMapToRun1() >= 7)) {
	    go = true;
        }
	if (game.global.world % 10 == 5 && plusMapToRun1() >= 6) {
	    go = true;
        }
	if (game.global.world % 10 == 6 && plusMapToRun1() >= 5) {
	    go = true;
        }
	if (game.global.world % 10 == 7 && plusMapToRun1() >= 4) {
	    go = true;
        }
	if (game.global.world % 10 == 8 && plusMapToRun1() >= 3) {
	    go = true;
        }
	if (game.global.world % 10 == 9 && plusMapToRun1() >= 2) {
	    go = true;
        }
	return go;
}

function pcheckmap2() {
	var go = false;
	if (game.global.world % 10 == 0 && plusMapToRun2() == 2) {
	    go = true;
        }
	if (game.global.world % 10 == 1 && (plusMapToRun2() == 2 || plusMapToRun2() == 10)) {
	    go = true;
        }
	if (game.global.world % 10 == 2 && (plusMapToRun2() == 2 || plusMapToRun2() >= 9)) {
	    go = true;
        }
	if (game.global.world % 10 == 3 && (plusMapToRun2() == 2 || plusMapToRun2() >= 8)) {
	    go = true;
        }
	if (game.global.world % 10 == 4 && plusMapToRun2() >= 7) {
	    go = true;
        }
	if (game.global.world % 10 == 5 && plusMapToRun2() >= 6) {
	    go = true;
        }
	if (game.global.world % 10 == 6 && plusMapToRun2() >= 6) {
	    go = true;
        }
	if (game.global.world % 10 == 7 && plusMapToRun2() >= 5) {
	    go = true;
        }
	if (game.global.world % 10 == 8 && plusMapToRun2() >= 4) {
	    go = true;
        }
	if (game.global.world % 10 == 9 && plusMapToRun2() >= 3) {
	    go = true;
        }
	return go;
}

function pcheckmap3() {
	var go = false;
	if (game.global.world % 10 == 0 && plusMapToRun3() == 3) {
	    go = true;
        }
	if (game.global.world % 10 == 1 && (plusMapToRun3() == 3 || plusMapToRun3() == 10)) {
	    go = true;
        }
	if (game.global.world % 10 == 2 && (plusMapToRun3() == 3 || plusMapToRun3() >= 9)) {
	    go = true;
        }
	if (game.global.world % 10 == 3 && plusMapToRun3() >= 8) {
	    go = true;
        }
	if (game.global.world % 10 == 4 && plusMapToRun3() >= 8) {
	    go = true;
        }
	if (game.global.world % 10 == 5 && plusMapToRun3() >= 8) {
	    go = true;
        }
	if (game.global.world % 10 == 6 && plusMapToRun3() >= 7) {
	    go = true;
        }
	if (game.global.world % 10 == 7 && plusMapToRun3() >= 6) {
	    go = true;
        }
	if (game.global.world % 10 == 8 && plusMapToRun3() >= 5) {
	    go = true;
        }
	if (game.global.world % 10 == 9 && plusMapToRun3() >= 4) {
	    go = true;
        }
	return go;
}

function pcheckmap4() {
	var go = false;
	if (game.global.world % 10 == 0 && plusMapToRun4() == 4) {
	    go = true;
        }
	if (game.global.world % 10 == 1 && (plusMapToRun4() == 4 || plusMapToRun4() == 10)) {
	    go = true;
        }
	if (game.global.world % 10 == 2 && plusMapToRun4() >= 9) {
	    go = true;
        }
	if (game.global.world % 10 == 3 && plusMapToRun4() >= 8) {
	    go = true;
        }
	if (game.global.world % 10 == 4 && plusMapToRun4() >= 7) {
	    go = true;
        }
	if (game.global.world % 10 == 5 && plusMapToRun4() >= 6) {
	    go = true;
        }
	if (game.global.world % 10 == 6 && plusMapToRun4() >= 5) {
	    go = true;
        }
	if (game.global.world % 10 == 7 && plusMapToRun4() >= 4) {
	    go = true;
        }
	if (game.global.world % 10 == 8 && plusMapToRun4() >= 3) {
	    go = true;
        }
	if (game.global.world % 10 == 9 && plusMapToRun4() >= 2) {
	    go = true;
        }
	return go;
}

function pcheckmap5() {
	var go = false;
	if (game.global.world % 10 == 0 && plusMapToRun5() == 5) {
	    go = true;
        }
	if (game.global.world % 10 == 1 && (plusMapToRun5() == 4 || plusMapToRun5() == 10)) {
	    go = true;
        }
	if (game.global.world % 10 == 2 && (plusMapToRun5() == 3 || plusMapToRun5() >= 9)) {
	    go = true;
        }
	if (game.global.world % 10 == 3 && (plusMapToRun5() == 2 || plusMapToRun5() >= 8)) {
	    go = true;
        }
	if (game.global.world % 10 == 4 && (plusMapToRun5() == 1 || plusMapToRun5() >= 7)) {
	    go = true;
        }
	if (game.global.world % 10 == 5 && plusMapToRun5() >= 6) {
	    go = true;
        }
	if (game.global.world % 10 == 6 && plusMapToRun5() >= 5) {
	    go = true;
        }
	if (game.global.world % 10 == 7 && plusMapToRun5() >= 4) {
	    go = true;
        }
	if (game.global.world % 10 == 8 && plusMapToRun5() >= 3) {
	    go = true;
        }
	if (game.global.world % 10 == 9 && plusMapToRun5() >= 2) {
	    go = true;
        }
	return go;
}

function checkprest1() {
	var go = false;
	go = (game.mapUnlocks.GambesOP.last - 5 < (game.global.world + plusMapToRun1()));
	return go;
}

function checkprest2() {
	var go = false;
	go = (game.mapUnlocks.GambesOP.last - 5 < (game.global.world + plusMapToRun2()));
	return go;
}

function checkprest3() {
	var go = false;
	go = (game.mapUnlocks.GambesOP.last - 5 < (game.global.world + plusMapToRun3()));
	return go;
}

function checkprest4() {
	var go = false;
	go = (game.mapUnlocks.GambesOP.last - 5 < (game.global.world + plusMapToRun4()));
	return go;
}

function checkprest5() {
	var go = false;
	go = (game.mapUnlocks.GambesOP.last - 5 < (game.global.world + plusMapToRun5()));
	return go;
}

var pMap1;
var pMap2;
var pMap3;  
var pMap4; 
var pMap5;
var mapbought1 = false;
var mapbought2 = false;
var mapbought3 = false;
var mapbought4 = false;
var mapbought5 = false;

function Praiding() {

    if (getPageSetting('Praidingzone').length) {
        if (getPageSetting('Praidingzone').includes(game.global.world) && !prestraid && !failpraid) {
            prestraidon = true;
            if (getPageSetting('AutoMaps') == 1 && !prestraid && !failpraid) {
                autoTrimpSettings["AutoMaps"].value = 0;
            }
            if (!game.global.preMapsActive && !game.global.mapsActive && !prestraid) {
                mapsClicked();
                if (!game.global.preMapsActive) {
                    mapsClicked();
                }
                debug("Beginning Prestige Raiding...");
            }
            if (game.options.menu.repeatUntil.enabled != 2 && !prestraid) {
                game.options.menu.repeatUntil.enabled = 2;
            }
            if (game.global.preMapsActive && !game.global.mapsActive && !prestraid) {
		debug("Map Loop");
                if (pcheckmap5() == true && pcheck5() == true && pMap5 == undefined && !mapbought5 && game.global.preMapsActive && !prestraid) {
			debug("Check complete for 5th map");
                    plusPres5();
                    if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                        buyMap();
                        mapbought5 = true;
                        if (mapbought5) {
                            pMap5 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
				debug("5th map bought");
                        }
                    }
                }
                if (pcheckmap4() == true && pcheck4() == true && pMap4 == undefined && !mapbought4 && game.global.preMapsActive && !prestraid) {
			debug("Check complete for 4th map");
                    plusPres4();
                    if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                        buyMap();
                        mapbought4 = true;
                        if (mapbought4) {
                            pMap4 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
				debug("4th map bought");
                        }
                    }
                }
                if (pcheckmap3() == true && pcheck3() == true && pMap3 == undefined && !mapbought3 && game.global.preMapsActive && !prestraid) {
			debug("Check complete for 3rd map");
                    plusPres3();
                    if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                        buyMap();
                        mapbought3 = true;
                        if (mapbought3) {
                            pMap3 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
				debug("3rd map bought");
                        }
                    }
                }
                if (pcheckmap2() == true && pcheck2() == true && pMap2 == undefined && !mapbought2 && game.global.preMapsActive && !prestraid) {
			debug("Check complete for 2nd map");
                    plusPres2();
                    if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                        buyMap();
                        mapbought2 = true;
                        if (mapbought2) {
                            pMap2 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
				debug("2nd map bought");
                        }
                    }
                }
                if (pcheckmap1() == true && pcheck1() == true && pMap1 == undefined && !mapbought1 && game.global.preMapsActive && !prestraid) {
			debug("Check complete for 1st map");
                    plusPres1();
                    if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                        buyMap();
                        mapbought1 = true;
                        if (mapbought1) {
                            pMap1 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
				debug("1st map bought");
                        }
                    }
                }
                if (!mapbought1 && !mapbought2 && !mapbought3 && !mapbought4 && !mapbought5) {
                    if (getPageSetting('AutoMaps') == 0 && !prestraid) {
                        autoTrimpSettings["AutoMaps"].value = 1;
                        game.options.menu.repeatUntil.enabled = 0;
                        prestraidon = false;
                        failpraid = true;
                        praidDone = true;
                        pMap1 = undefined;
                        pMap2 = undefined;
                        pMap3 = undefined;
                        pMap4 = undefined;
                        pMap5 = undefined;
                        debug("Failed to Prestige Raid. Looks like you can't afford to or you are too weak or you have limited yourself in a P/I zone. ");
                    }
                    return;
                }
            }
            if (game.global.preMapsActive && !game.global.mapsActive && mapbought1 && pMap1 != undefined && !prestraid) {
		    debug("running map 1");
                selectMap(pMap1);
                runMap();
                pMap1 = undefined;
            }
            if (game.global.preMapsActive && !game.global.mapsActive && mapbought2 && pMap2 != undefined && !prestraid) {
		    debug("running map 2");
                selectMap(pMap2);
                runMap();
                pMap2 = undefined;
            }
            if (game.global.preMapsActive && !game.global.mapsActive && mapbought3 && pMap3 != undefined && !prestraid) {
		    debug("running map 3");
                selectMap(pMap3);
                runMap();
                pMap3 = undefined;
            }
            if (game.global.preMapsActive && !game.global.mapsActive && mapbought4 && pMap4 != undefined && !prestraid) {
		    debug("running map 4");
                selectMap(pMap4);
                runMap();
                pMap4 = undefined;
            }
            if (game.global.preMapsActive && !game.global.mapsActive && mapbought5 && pMap5 != undefined && !prestraid) {
		    debug("running map 5");
                selectMap(pMap5);
                runMap();
                pMap5 = undefined;
            }
            if (!prestraid && !game.global.repeatMap) {
                repeatClicked();
            }
        }
    }
    if (game.global.preMapsActive && (mapbought1 || mapbought2 || mapbought3 || mapbought4 || mapbought5) && pMap1 == undefined && pMap2 == undefined && pMap3 == undefined && pMap4 == undefined && pMap5 == undefined && !prestraid && !failpraid) {
        prestraid = true;
        failpraid = false;
        mapbought1 = false;
        mapbought2 = false;
        mapbought3 = false;
        mapbought4 = false;
        mapbought5 = false;
    }
    if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && prestraid && !failpraid && prestraidon) {
        praidDone = true;
        prestraidon = false;
        autoTrimpSettings["AutoMaps"].value = 1;
        game.options.menu.repeatUntil.enabled = 0;
	pMap1 = undefined;
        pMap2 = undefined;
        pMap3 = undefined;
        pMap4 = undefined;
        pMap5 = undefined;
        debug("Prestige raiding successful!");
        debug("Turning AutoMaps back on");
    }
    if (getPageSetting('Praidingzone').every(isBelowThreshold)) {
        prestraid = false;
        failpraid = false;
        prestraidon = false;
        mapbought1 = false;
        mapbought2 = false;
        mapbought3 = false;
        mapbought4 = false;
        mapbought5 = false;
        pMap1 = undefined;
        pMap2 = undefined;
        pMap3 = undefined;
        pMap4 = undefined;
        pMap5 = undefined;
        praidDone = false;
    }
}

function PraidHarder() {
  var maxPlusZones;
  var mapModifiers = ["p","fa","0"];
  var farmFragments;
  var praidBeforeFarm;
  var pRaidIndex;
  var maxPraidZSetting;
  var isBWRaidZ;

  // Determine whether to use daily or normal run settings
  if (game.global.challengeActive == "Daily") {
    praidSetting = 'dPraidingzone';
    maxPraidZSetting = 'dMaxPraidZone';
    isBWRaidZ = getPageSetting('dBWraidingz').includes(game.global.world) && getPageSetting('Dailybwraid');
    farmFragments = getPageSetting('dPraidFarmFragsZ').includes(game.global.world);
    praidBeforeFarm = getPageSetting('dPraidBeforeFarmZ').includes(game.global.world);
  }
  else {
    praidSetting = 'Praidingzone';
    maxPraidZSetting = 'MaxPraidZone';
    isBWRaidZ = getPageSetting('BWraidingz').includes(game.global.world) && getPageSetting('BWraid');
    farmFragments = getPageSetting('PraidFarmFragsZ').includes(game.global.world);
    praidBeforeFarm = getPageSetting('PraidBeforeFarmZ').includes(game.global.world);
  }

  pRaidIndex = getPageSetting(praidSetting).indexOf(game.global.world);
  if (pRaidIndex == -1 || typeof(getPageSetting(maxPraidZSetting)[pRaidIndex]) === "undefined") maxPlusZones = plusMapToRun(game.global.world);
  else maxPlusZones = getPageSetting(maxPraidZSetting)[pRaidIndex] - game.global.world;

  // Check we have a valid number for maxPlusZones
  maxPlusZones = maxPlusZones > 10 ? 10 : (maxPlusZones < 0 ? 10 : maxPlusZones);

  // Work out the max number of +map zones it's worth farming for prestige.
  if ((game.global.world + maxPlusZones) % 10 > 5)
    maxPlusZones = Math.max(maxPlusZones + (5 - (game.global.world + maxPlusZones) % 10),0);
  else if ((game.global.world + maxPlusZones) % 10 == 0)
    maxPlusZones = Math.min(5,maxPlusZones);

  // If we have any Praiding zones defined...
  if (getPageSetting(praidSetting).length) {
    if (getPageSetting(praidSetting).includes(game.global.world) && !prestraid && !failpraid && !shouldFarmFrags) {
      debug('Beginning Praiding');
      // Initialise shouldFarmFrags to false
      shouldFarmFrags = false;
      // Mark that we are prestige raiding and turn off automaps to stop it interfering
      prestraidon = true;
      autoTrimpSettings["AutoMaps"].value = 0;
      // Get into the preMaps screen
      if (!game.global.preMapsActive && !game.global.mapsActive) {
        mapsClicked();
	if (!game.global.preMapsActive) {
          mapsClicked();
        }
      }
      // Set repeat for items
      game.options.menu.repeatUntil.enabled = 2;
      toggleSetting("repeatUntil", null, false, true);
      // if we can farm for fragments, work out the minimum number we need to get all available prestiges
      if (farmFragments) {
        plusPres();
        document.getElementById('advExtraLevelSelect').value = maxPlusZones;
        document.getElementById('sizeAdvMapsRange').value = 0;
        document.getElementById('difficultyAdvMapsRange').value = 0;
        document.getElementById('advSpecialSelect').value = "0";
        minMaxMapCost = updateMapCost(true);
        // If we are not Praiding before farming, and cannot afford a max plus map, set flags for farming
        if (!praidBeforeFarm && game.resources.fragments.owned < minMaxMapCost) {
          prestraid = true;
          failpraid = false;
          shouldFarmFrags = true;
        }
      }
      // Set map settings to the best map for Praiding (even if we can't afford it)
      plusPres();
      document.getElementById('advExtraLevelSelect').value = maxPlusZones;
      // Iterate down through plusMaps setting until we find one we can afford
      for (var curPlusZones = maxPlusZones; curPlusZones >= 0; curPlusZones--) {
        // If the current targeted zone has no prestiges, decrement the number of plusZones and continue
        if ((game.global.world + curPlusZones) % 10 == 0 || (game.global.world + curPlusZones) % 10 > 5) continue;
        // Otherwise check to see if we can afford a map at the current plusZones setting
        document.getElementById('advExtraLevelSelect').value = curPlusZones;
        // If we find a map we can afford, break out of the loop
        if (relaxMapReqs(mapModifiers)) break;
        // conserve fragments if going to farm after by selecting only maps with no special modifier
        else if (farmFragments) mapModifiers = ["0"];
      }
      // If the map is not at the highest level with prestiges possible, set shouldFarmFrags to true
      if (maxPlusZones > curPlusZones) shouldFarmFrags = true;

      // If we found a suitable map...
      if (curPlusZones >= 0 && (praidBeforeFarm || shouldFarmFrags == false)) {
        // ...buy it
        buyMap();
        pMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length-1].id;
        selectMap(pMap);
        // Set flags to avoid rerunning this step
        prestraid = true;
        // prestraidon = false;
        failpraid = false;
        // Set repeat on and run the map
        game.global.repeatMap = true;
        runMap();
        repeatClicked(true);
      }
      // If we can't afford a map, and can't farm fragments, fail and turn automaps back on
      else if (!farmFragments){
        failpraid = true;
        prestraidon = false;
        praidDone = true;
        debug("Failed to prestige raid. Looks like you can't afford to.");
        if (isBWRaidZ) {
          // resetting these out of an abundance of caution
          bwraided = false;
          failbwraid = false;
          dbwraided = false;
          dfailbwraid = false;
          // BWraiding();
        }
        else {
          debug("Turning AutoMaps back on");
          autoTrimpSettings['AutoMaps'].value = 1;
          game.options.menu.repeatUntil.enabled = 0;
        }
        return;
      }
    }
  }
  if (farmFragments && shouldFarmFrags && game.global.preMapsActive && prestraid && !fMap) {
    if (pMap) recycleMap(getMapIndex(pMap));
    pMap = null;
    // Choose a fragment farming map
    document.getElementById("biomeAdvMapsSelect").value = "Depths";
    document.getElementById('advExtraLevelSelect').value = 0;
    document.getElementById('advSpecialSelect').value = "fa";
    document.getElementById("lootAdvMapsRange").value = 9;
    document.getElementById("difficultyAdvMapsRange").value = 9;
    document.getElementById("sizeAdvMapsRange").value = 9;
    document.getElementById('advPerfectCheckbox').checked = true;
    document.getElementById("mapLevelInput").value = game.global.world - 1;
    game.options.menu.repeatUntil.enabled = 0;
    toggleSetting("repeatUntil", null, false, true);
    if (updateMapCost(true) <= game.resources.fragments.owned) {
      debug("Buying perfect sliders fragment farming map");
      buyMap();
      fMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length-1].id;
      selectMap(fMap);
      game.global.repeatMap = true;
      runMap();
      repeatClicked(true);
    }
    else {
      document.getElementById('advPerfectCheckbox').checked = false;
      if (updateMapCost(true) <= game.resources.fragments.owned) {
        debug("Buying imperfect sliders fragment farming map");
        buyMap();
        fMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length-1].id;
        selectMap(fMap);
        game.global.repeatMap = true;
        runMap();
        repeatClicked(true);
      }
      // if we can't buy a map, wait until the next main loop iteration and try again
      else debug("Can't afford fragment farming map yet");
    }
  }

  if ((game.global.mapsActive || game.global.preMapsActive) && minMaxMapCost <= game.resources.fragments.owned && shouldFarmFrags) {
    game.global.repeatMap = false;
    repeatClicked(true);
    if (game.global.preMapsActive) {
      minMaxMapCost = null;
      shouldFarmFrags = false;
      prestraid = false;
      failpraid = false;
    }
  }
  if (game.global.preMapsActive && prestraid && !failpraid && !shouldFarmFrags && prestraidon) {
    prestraidon = false;
    praidDone = true;
    debug("Prestige raiding successful! - recycling Praid map");
    if (pMap) recycleMap(getMapIndex(pMap));
    if (fMap) recycleMap(getMapIndex(fMap));
    pMap = null;
    fMap = null;
    if (isBWRaidZ) {
      bwraided = false;
      failbwraid = false;
      dbwraided = false;
      dfailbwraid = false;
    }
    else {
      debug("Turning AutoMaps back on");
      game.options.menu.repeatUntil.enabled = 0;
      autoTrimpSettings['AutoMaps'].value = 1;    
    }
  }

  if (!getPageSetting(praidSetting).includes(game.global.world)) {
    prestraid = false;
    failpraid = false;
    prestraidon = false;
    shouldFarmFrags = false;
    praidDone = false;
  }
}

function relaxMapReqs(mapModifiers) {
  for (var j = 0; j < mapModifiers.length; j++) {
    document.getElementById('sizeAdvMapsRange').value = 9;
    document.getElementById('advSpecialSelect').value = mapModifiers[j];
    for (var i = 9; i >= 0; i--) {
      document.getElementById('difficultyAdvMapsRange').value = i;
      if (updateMapCost(true) <= game.resources.fragments.owned) return true;
    }
    for (i = 9; i >= 0; i--) {
      document.getElementById('sizeAdvMapsRange').value = i;
      if (updateMapCost(true) <= game.resources.fragments.owned) return true;
    }
  }
  return false;
}

function BWraiding() {
  var bwraidZ;
  var bwraidSetting;
  var bwraidMax;
  var isPraidZ;
  var ispraidon;
  var isBWRaidZ;
  var targetBW;
  var bwIndex;

  if (game.global.challengeActive == "Daily") {
    bwraidZ = 'dBWraidingz';
    bwraidSetting = 'Dailybwraid';
    bwraidMax = 'dBWraidingmax';
    isPraidZ = getPageSetting('dPraidingzone').includes(game.global.world);
    ispraidon = dprestraidon;
  }
  else {
    bwraidZ = 'BWraidingz';
    bwraidSetting = 'BWraid';
    bwraidMax = 'BWraidingmax';
    isPraidZ = getPageSetting('Praidingzone').includes(game.global.world);
    ispraidon = prestraidon;
  }

  // Convert old BWraid settings to multivalue
  if (typeof(autoTrimpSettings['BWraidingz'].value) == "number")
    setPageSetting('BWraidingz', Array.of(autoTrimpSettings['BWraidingz'].value));
  if (typeof(autoTrimpSettings['BWraidingmax'].value) == "number")
    setPageSetting('BWraidingmax', Array.of(autoTrimpSettings['BWraidingmax'].value));
  if (typeof(autoTrimpSettings['dBWraidingz'].value) == "number")
      setPageSetting('dBWraidingz', Array.of(autoTrimpSettings['dBWraidingz'].value));
  if (typeof(autoTrimpSettings['dBWraidingmax'].value) == "number")
      setPageSetting('dBWraidingmax', Array.of(autoTrimpSettings['dBWraidingmax'].value));


  isBWRaidZ = getPageSetting(bwraidZ).includes(game.global.world);
  bwIndex = getPageSetting(bwraidZ).indexOf(game.global.world);
  if (bwIndex == -1 || typeof(getPageSetting(bwraidMax)[bwIndex]) === "undefined") targetBW = -1;
  else targetBW = getPageSetting(bwraidMax)[bwIndex];

  if ((!isPraidZ || praidDone) && !ispraidon && isBWRaidZ && !bwraided && !failbwraid && getPageSetting(bwraidSetting)) {
    if (getPageSetting('AutoMaps') == 1 && !bwraided && !failbwraid) {
      autoTrimpSettings["AutoMaps"].value = 0;
    }

    while (!game.global.preMapsActive && !bwraidon) mapsClicked();

    if (game.options.menu.repeatUntil.enabled != 2 && !bwraided && !failbwraid) {
      game.options.menu.repeatUntil.enabled = 2;
    }

    if (game.global.preMapsActive && !bwraided && !failbwraid && findLastBionic()) {
      selectMap(findLastBionic().id);
      failbwraid = false;
      debug("Beginning BW Raiding...");
    }

    else if (game.global.preMapsActive && !bwraided && !failbwraid) {
      if (getPageSetting('AutoMaps') == 0 && isBWRaidZ && !bwraided) {
        autoTrimpSettings["AutoMaps"].value = 1;
        failbwraid = true;
        debug("Failed to BW raid. Looks like you don't have a BW to raid...");
      }
    }

    if (findLastBionic().level <= targetBW && !bwraided && !failbwraid && game.global.preMapsActive) {
      runMap();
      bwraidon = true;
    }

    if (!game.global.repeatMap && !bwraided && !failbwraid && game.global.mapsActive) {
      repeatClicked();
    }

    if (findLastBionic().level > targetBW && !bwraided && !failbwraid) {
      bwraided = true;
      failbwraid = false;
      bwraidon = false;
      debug("...Successfully BW raided!");
    }
  }

  if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && bwraided && !failbwraid) {
    autoTrimpSettings["AutoMaps"].value = 1;
    debug("Turning AutoMaps back on");
  }

  if (!isBWRaidZ) {
    bwraided = false;
    failbwraid = false;
    bwraidon = false;
  }
}

function dailyPraiding() {
    var dpMap;
    if (getPageSetting('dPraidingzone').length) {
   	if (getPageSetting('dPraidingzone').includes(game.global.world) && !dprestraid && !dfailpraid) {
            debug('World Zone matches a Daily Praiding Zone!');
	    dprestraidon = true;
             if (getPageSetting('AutoMaps') == 1 && !dprestraid && !dfailpraid) {
                autoTrimpSettings["AutoMaps"].value = 0;
            }
            if (!game.global.preMapsActive && !game.global.mapsActive && !dprestraid && !dfailpraid) {
                mapsClicked();
		if (!game.global.preMapsActive) {
                    mapsClicked();
                }
		debug("Beginning Daily Prestige Raiding...");
            }
            if (game.options.menu.repeatUntil.enabled!=2 && !dprestraid && !dfailpraid) {
                game.options.menu.repeatUntil.enabled = 2;
            }
            if (game.global.preMapsActive && !dprestraid && !dfailpraid) {
                plusPres();
                if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                    buyMap();
                    dfailpraid = false;
		    dmapbought = true;
                }
                else if ((updateMapCost(true) > game.resources.fragments.owned)) {
                    if (getPageSetting('AutoMaps') == 0 && !dprestraid) {
                        autoTrimpSettings["AutoMaps"].value = 1;
                        dfailpraid = true;
			                  dprestraidon = false;
			                  dmapbought = false;
                        praidDone = true;
                        debug("Failed to Daily Prestige Raid. Looks like you can't afford to..");
                    }
                    return;
                 }
	    }
	    if (dmapbought == true) {
		dpMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length-1].id;
                selectMap(dpMap);
		runMap();
            }
            if (!dprestraid && !dfailpraid && !game.global.repeatMap) {
                repeatClicked();
             }
	    dprestraid = true;
	    dfailpraid = false;
	    dmapbought = false;
	}
    }
     if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && dprestraid && !dfailpraid && dprestraidon) {
        praidDone = true;
        dprestraidon = false;
        autoTrimpSettings["AutoMaps"].value = 1;
	      debug("Daily Prestige Raiding successful! - recycling Praid map");
	      recycleMap(getMapIndex(dpMap));
	      debug("Turning AutoMaps back on");
    }
    if (getPageSetting('dPraidingzone').every(isBelowThreshold)) {
        dprestraid = false;
        dfailpraid = false
        dprestraidon = false;
        dmapbought = false;
        praidDone = false;
    }
}

function dailyBWraiding() {
 	 if (!dprestraidon && game.global.world == getPageSetting('dBWraidingz') && !dbwraided && !dfailbwraid && getPageSetting('Dailybwraid')) {
 	     if (getPageSetting('AutoMaps') == 1 && !dbwraided && !dfailbwraid) {
                 autoTrimpSettings["AutoMaps"].value = 0;
                 }
              if (!game.global.preMapsActive && !game.global.mapsActive && !dbwraided && !dfailbwraid) {
                 mapsClicked();
 		 if (!game.global.preMapsActive) {
                     mapsClicked();
                     }
                 }
 	     if (game.options.menu.repeatUntil.enabled != 2 && !dbwraided && !dfailbwraid) {
            	 game.options.menu.repeatUntil.enabled = 2;
                 }
 	     if (game.global.preMapsActive && !dbwraided && !dfailbwraid) {
		 selectMap(findLastBionic().id);
		 dfailbwraid = false;
		 debug("Beginning Daily BW Raiding...");
                 }
 	     else if (game.global.preMapsActive && !dbwraided && !dfailbwraid) {
                      if (getPageSetting('AutoMaps') == 0 && game.global.world == getPageSetting('dBWraidingz') && !dbwraided) {
                          autoTrimpSettings["AutoMaps"].value = 1;
                          dfailbwraid = true;
                          debug("Failed to Daily BW raid. Looks like you don't have a BW to raid...");
                          }
                       }
 	     if (findLastBionic().level <= getPageSetting('dBWraidingmax') && !dbwraided && !dfailbwraid && game.global.preMapsActive) {
		 runMap();
		 dbwraidon = true;
		 }
 	     if (!game.global.repeatMap && !dbwraided && !dfailbwraid && game.global.mapsActive) {
		 repeatClicked();
		 }
 	     if (findLastBionic().level > getPageSetting('dBWraidingmax') && !dbwraided && !dfailbwraid) {
                 dbwraided = true;
            	 dfailbwraid = false;
		 dbwraidon = false;
           	 debug("...Successfully Daily BW raided!");
		 }
 	     if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && game.global.world == getPageSetting('dBWraidingz') && dbwraided && !dfailbwraid) {
                 autoTrimpSettings["AutoMaps"].value = 1;
		 debug("Turning AutoMaps back on");
                 }
 	    }
 	if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && dbwraided && !dfailbwraid) {
            autoTrimpSettings["AutoMaps"].value = 1;
	    debug("Turning AutoMaps back on");
	    }
 	if (dbwraided && !dfailbwraid && game.global.world !== getPageSetting('dBWraidingz')) {
            dbwraided = false;
	    dfailbwraid = false;
	    dbwraidon = false;
            }
 }

function trimpcide() {
if (game.portal.Anticipation.level > 0) {
	var antistacklimit = (game.talents.patience.purchased) ? 45 : 30;
	if (game.global.fighting && ((game.jobs.Amalgamator.owned > 0) ? Math.floor((new Date().getTime() - game.global.lastSoldierSentAt) / 1000) : Math.floor(game.global.lastBreedTime / 1000)) >= antistacklimit && (game.global.antiStacks < antistacklimit || antistacklimit == 0 && game.global.antiStacks >= 1) && !game.global.spireActive)
              forceAbandonTrimps();
	if (game.global.fighting && ((game.jobs.Amalgamator.owned > 0) ? Math.floor((new Date().getTime() - game.global.lastSoldierSentAt) / 1000) : Math.floor(game.global.lastBreedTime / 1000)) >= antistacklimit && game.global.antiStacks < antistacklimit && game.global.mapsActive) {
	      if (getCurrentMapObject().location == "Void") {
		  abandonVoidMap();
	          }
	      }
	}
}

function avoidempower() {
	if(armydeath()) {
		if (typeof game.global.dailyChallenge.bogged === 'undefined' && typeof game.global.dailyChallenge.plague === 'undefined'){
			mapsClicked(true);
			if(getPageSetting('AutoMaps') != '1') {
				mapsClicked(true);
			}
			return;
		}
	}
}

var spirebreeding = false;
function ATspirebreed() {
	if(!spirebreeding && getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world && game.global.spireActive)
		var prespiretimer = game.global.GeneticistassistSetting;
	if (getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world && game.global.spireActive && game.global.GeneticistassistSetting != getPageSetting('SpireBreedTimer')) {
		spirebreeding = true;
	if (game.global.GeneticistassistSetting != getPageSetting('SpireBreedTimer'))
		game.global.GeneticistassistSetting = getPageSetting('SpireBreedTimer');
	}
	if (getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world && !game.global.spireActive && game.global.GeneticistassistSetting == getPageSetting('SpireBreedTimer')) {
		spirebreeding = false;
		if (game.global.GeneticistassistSetting == getPageSetting('SpireBreedTimer')) {
			game.global.GeneticistassistSetting = prespiretimer;
			toggleGeneticistassist();
			toggleGeneticistassist();
			toggleGeneticistassist();
			toggleGeneticistassist();
		}
	}
}

function fightalways() {
	if (game.global.gridArray.length === 0 || game.global.preMapsActive || !game.upgrades.Battle.done || game.global.fighting || (game.global.spireActive && game.global.world >= getPageSetting('IgnoreSpiresUntil')))
	    return;
	if (!game.global.fighting)
	    fightManual();
}

function armormagic() {
	var armormagicworld =  Math.floor((game.global.highestLevelCleared + 1) * 0.8);
	if (((getPageSetting('carmormagic') == 1 || getPageSetting('darmormagic') == 1) && game.global.world >= armormagicworld && (game.global.soldierHealth <= game.global.soldierHealthMax*0.4)) || ((getPageSetting('carmormagic') == 2 || getPageSetting('darmormagic') == 2) && calcHDratio() >= MODULES["maps"].enoughDamageCutoff && (game.global.soldierHealth <= game.global.soldierHealthMax*0.4)) || ((getPageSetting('carmormagic') == 3 || getPageSetting('darmormagic') == 3) && (game.global.soldierHealth <= game.global.soldierHealthMax*0.4)))
	 buyArms();
}

trapIndexs = ["","Fire","Frost","Poison","Lightning","Strength","Condenser","Knowledge"];

function tdStringCode2(){
	var thestring=document.getElementById('importBox').value.replace(/\s/g, '');
	var s = new String(thestring);
	var index = s.indexOf("+",0);
	s = s.slice(0,index);
	var length = s.length;

    var saveLayout = [];
	for (var i = 0; i < length; i++) {
		saveLayout.push(trapIndexs[s.charAt(i)]);
	}
    playerSpire['savedLayout' + -1] = saveLayout;

    if ((playerSpire.runestones + playerSpire.getCurrentLayoutPrice()) < playerSpire.getSavedLayoutPrice(-1)) return false;
    playerSpire.resetTraps();
    for (var x = 0; x < saveLayout.length; x++){
        if (!saveLayout[x]) continue;
        playerSpire.buildTrap(x, saveLayout[x]);
    }
}

playerSpire.drawInfo = function() {
        if (!this.popupOpen) return;
        if (this.smallMode){
            this.drawSmallInfo();
            return;
        }
        var elem = document.getElementById('playerSpireInfoPanel');
        var infoHtml = "";
        infoHtml += "<div id='playerSpireInfoTop'>";
        infoHtml += "<span onmouseover='playerSpire.infoTooltip(\"Runestones\", event)' onmouseout='tooltip(\"hide\")'>Runestones: <span id='playerSpireRunestones'>" + prettify(this.runestones) + "</span><br/>Runestones per Second: <span id='RsPs'>" + prettify(this.getRsPs()) + "</span></span>";
        infoHtml += "<br/><span onmouseover='playerSpire.infoTooltip(\"Enemies\", event)' onmouseout='tooltip(\"hide\")'>Enemies: <span id='playerSpireCurrentEnemies'>" + this.currentEnemies + "</span> / <span id='playerSpireMaxEnemies'>" + this.maxEnemies + "</span></span>";
        infoHtml += "<br/><span onmouseover='playerSpire.infoTooltip(\"Spirestones\", event)' onmouseout='tooltip(\"hide\")' id='spirestoneBox'>" + this.getSpirestoneHtml() + "</span><br/><span onmouseover='playerSpire.infoTooltip(\"Threat\", event)' onmouseout='tooltip(\"hide\")' id='playerSpireDifficulty'>" + this.getDifficultyHtml() + "</span></div>";
        infoHtml += "<div id='spireTrapsWindow'>";
        infoHtml += "<div onclick='playerSpire.shrink()' id='shrinkSpireBox' class='spireControlBox'>Shrink Window</div>";
        infoHtml += "<div onclick='playerSpire.settingsTooltip()' id='spireSettingsBox' class='spireControlBox'>Settings</div>"
        infoHtml += "<div onclick='tooltip(\"confirm\", null, \"update\", \"Are you sure you want to sell all Traps and Towers? You will get back 100% of Runestones spent on them.<br/><br/>" + ((this.paused) ? "" : "<b>Protip:</b> Pause your Spire before selling your defenses if you want to avoid leaking!") + "\", \"playerSpire.resetTraps()\", \"Sell All?\")' class='spireControlBox'>Sell All</div>";
        infoHtml += "<div onclick='playerSpire.togglePause()' id='pauseSpireBtn' class='spireControlBox spirePaused" + ((this.paused) ? "Yes'>Unpause" : "'>Pause Spire") + "</div>";      
        infoHtml += "<div class='spireControlBoxDbl'><div onclick='playerSpire.presetTooltip(1)'>Layout 1</div><div onclick='playerSpire.presetTooltip(2)'>Layout 2</div></div>"
        infoHtml += "<div onclick='playerSpire.selectTrap(\"shiftUp\")' onmouseout='tooltip(\"hide\")' onmouseover='playerSpire.trapTooltip(\"shiftUp\", event)' id='sellTrapBox' class='spireControlBox" + ((this.selectedTrap == "shiftUp") ? " selected" : "") + "'>Shift Up</div>";
        infoHtml += "<div onclick='playerSpire.selectTrap(\"shiftDown\")' onmouseout='tooltip(\"hide\")' onmouseover='playerSpire.trapTooltip(\"shiftDown\", event)' id='sellTrapBox' class='spireControlBox" + ((this.selectedTrap == "shiftDown") ? " selected" : "") + "'>Shift Down</div>";
      	infoHtml += "<div onclick='ImportExportTooltip(\"spireImport\")' class='spireControlBox'>Import</div>";


        infoHtml += "<br/><hr/>"
        infoHtml += "<div onclick='playerSpire.selectTrap(\"sell\")' onmouseout='tooltip(\"hide\")' onmouseover='playerSpire.trapTooltip(\"sell\", event)' style='padding-top: 1.35vw' id='sellTrapBox' class='spireTrapBox" + ((this.selectedTrap == "sell") ? " selected" : "") + "'>Sell a Trap/Tower</div>";
        var cheapestTrap = -1;
        for (var item in playerSpireTraps){
            var trap = playerSpireTraps[item];
            if (trap.locked) continue;
            var trapText = trap.isTower ? "Tower" : "Trap";
            trapText += " " + romanNumeral(trap.level);
            var trapIcon = "";
            if (this.settings.trapIcons) trapIcon = "<span class='icomoon icon-" + trap.icon + "'></span> ";
            var cost = this.getTrapCost(item);
            var color = (this.runestones >= cost) ? trap.color : "grey";
            infoHtml += "<div style='background-color: " + color + "' onmouseout='tooltip(\"hide\")' onmouseover='playerSpire.trapTooltip(\"" + item + "\", event)' onclick='playerSpire.selectTrap(\"" + item + "\")' id='" + item + "TrapBox' class='spireTrapBox" + ((item == this.selectedTrap) ? " selected" : "") + "'>" + trapIcon + item + " " + trapText + "<br/>" + prettify(this.getTrapCost(item)) + " Rs</div>"
            if (this.runestones < cost && (cheapestTrap == -1 || cost < cheapestTrap)) cheapestTrap = cost;
        }
        this.nextTrap = cheapestTrap;
        infoHtml += "</div><hr/>"; //spireTrapsWindow
        infoHtml += "<span id='playerSpireCloseBtn' class='icomoon icon-close' onclick='playerSpire.closePopup()'></span>";
        infoHtml += "<div id='playerSpireUpgradesArea'>";
        infoHtml += this.getUpgradesHtml();
        infoHtml += "</div>"; //playerSpireUpgradesArea
        elem.innerHTML = infoHtml;
    }

//Radon
function RbuyWeps(){if(!((getPageSetting('RBuyWeaponsNew')==1)||(getPageSetting('RBuyWeaponsNew')==3)))return;preBuy(),game.global.buyAmt=getPageSetting('Rgearamounttobuy'),game.equipment.Dagger.level<getPageSetting('RCapEquip2')&&canAffordBuilding('Dagger',null,null,!0)&&buyEquipment('Dagger',!0,!0),game.equipment.Mace.level<getPageSetting('RCapEquip2')&&canAffordBuilding('Mace',null,null,!0)&&buyEquipment('Mace',!0,!0),game.equipment.Polearm.level<getPageSetting('RCapEquip2')&&canAffordBuilding('Polearm',null,null,!0)&&buyEquipment('Polearm',!0,!0),game.equipment.Battleaxe.level<getPageSetting('RCapEquip2')&&canAffordBuilding('Battleaxe',null,null,!0)&&buyEquipment('Battleaxe',!0,!0),game.equipment.Greatsword.level<getPageSetting('RCapEquip2')&&canAffordBuilding('Greatsword',null,null,!0)&&buyEquipment('Greatsword',!0,!0),game.equipment.Arbalest.level<getPageSetting('RCapEquip2')&&canAffordBuilding('Arbalest',null,null,!0)&&buyEquipment('Arbalest',!0,!0),postBuy()}
function RbuyArms(){if(!((getPageSetting('RBuyArmorNew')==1)||(getPageSetting('RBuyArmorNew')==3)))return;preBuy(),game.global.buyAmt=10,game.equipment.Shield.level<getPageSetting('RCapEquiparm')&&canAffordBuilding('Shield',null,null,!0)&&buyEquipment('Shield',!0,!0),game.equipment.Boots.level<getPageSetting('RCapEquiparm')&&canAffordBuilding('Boots',null,null,!0)&&buyEquipment('Boots',!0,!0),game.equipment.Helmet.level<getPageSetting('RCapEquiparm')&&canAffordBuilding('Helmet',null,null,!0)&&buyEquipment('Helmet',!0,!0),game.equipment.Pants.level<getPageSetting('RCapEquiparm')&&canAffordBuilding('Pants',null,null,!0)&&buyEquipment('Pants',!0,!0),game.equipment.Shoulderguards.level<getPageSetting('RCapEquiparm')&&canAffordBuilding('Shoulderguards',null,null,!0)&&buyEquipment('Shoulderguards',!0,!0),game.equipment.Breastplate.level<getPageSetting('RCapEquiparm')&&canAffordBuilding('Breastplate',null,null,!0)&&buyEquipment('Breastplate',!0,!0),game.equipment.Gambeson.level<getPageSetting('RCapEquiparm')&&canAffordBuilding('Gambeson',null,null,!0)&&buyEquipment('Gambeson',!0,!0),postBuy()}
function Rhelptrimpsnotdie(){if(!game.global.preMapsActive&&!game.global.fighting)RbuyArms();}

function RautoGoldenUpgradesAT(setting) {
    var num = getAvailableGoldenUpgrades();
    if (num == 0) return;
    if (setting == "Radon")
	setting = "Helium";
    if (setting == "Void" || setting == "Void + Battle")
        setting = "Void";
    var success = buyGoldenUpgrade(setting);
    if (!success && setting == "Void") {
        num = getAvailableGoldenUpgrades();
        if (num == 0) return;
	if ((autoTrimpSettings.RAutoGoldenUpgrades.selected == "Void" && !game.global.dailyChallenge.seed && !game.global.runningChallengeSquared) || (autoTrimpSettings.RdAutoGoldenUpgrades.selected == "Void" && game.global.dailyChallenge.seed))
	setting = "Helium";
	if (((autoTrimpSettings.RAutoGoldenUpgrades.selected == "Void" && getPageSetting('Rvoidheliumbattle') > 0 && game.global.world >= getPageSetting('Rvoidheliumbattle')) || (autoTrimpSettings.RdAutoGoldenUpgrades.selected == "Void" && getPageSetting('Rdvoidheliumbattle') > 0 && game.global.world >= getPageSetting('Rdvoidheliumbattle'))) || ((autoTrimpSettings.RAutoGoldenUpgrades.selected == "Void + Battle" && !game.global.dailyChallenge.seed && !game.global.runningChallengeSquared) || (autoTrimpSettings.RdAutoGoldenUpgrades.selected == "Void + Battle" && game.global.dailyChallenge.seed) || (autoTrimpSettings.RcAutoGoldenUpgrades.selected == "Void + Battle" && game.global.runningChallengeSquared)))
        setting = "Battle";
	buyGoldenUpgrade(setting);
    }
}

var Rprestraid=!1,Rdprestraid=!1,Rfailpraid=!1,Rdfailpraid=!1,Rbwraided=!1,Rdbwraided=!1,Rfailbwraid=!1,Rdfailbwraid=!1,Rprestraidon=!1,Rdprestraidon=!1,Rmapbought=!1,Rdmapbought=!1,Rbwraidon=!1,Rdbwraidon=!1,Rpresteps=null,RminMaxMapCost,RfMap,RpMap,RshouldFarmFrags=!1,RpraidDone=!1;

function RPraiding() {
  var RpMap;
  if (getPageSetting('RPraidingzone').length) {
    if (getPageSetting('RPraidingzone').includes(game.global.world) && !Rprestraid && !Rfailpraid) {
      debug('World Zone matches a Praiding Zone!');
	    Rprestraidon = true;

      if (getPageSetting('RAutoMaps') == 1 && !Rprestraid && !Rfailpraid) {
        autoTrimpSettings["RAutoMaps"].value = 0;
      }
      if (!game.global.preMapsActive && !game.global.mapsActive && !Rprestraid && !Rfailpraid) {
        mapsClicked();
		    if (!game.global.preMapsActive) {
          mapsClicked();
        }
		    debug("Beginning Prestige Raiding...");
      }
      if (game.options.menu.repeatUntil.enabled!=2 && !Rprestraid && !Rfailpraid) {
        game.options.menu.repeatUntil.enabled = 2;
      }
      if (game.global.preMapsActive && !Rprestraid && !Rfailpraid) {
        plusPres();
        if ((updateMapCost(true) <= game.resources.fragments.owned)) {
          buyMap();
          Rfailpraid = false;
          Rmapbought = true;
        }
        else if ((updateMapCost(true) > game.resources.fragments.owned)) {
          if (getPageSetting('RAutoMaps') == 0 && !Rprestraid) {
            autoTrimpSettings["RAutoMaps"].value = 1;
            game.options.menu.repeatUntil.enabled = 0;
            Rfailpraid = true;
            Rprestraidon = false;
            Rmapbought = false;
            RpraidDone = true;
            debug("Failed to prestige raid. Looks like you can't afford to..");
          }
          return;
        }
	    }
	    if (Rmapbought == true) {
        RpMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length-1].id;
        selectMap(RpMap);
	      runMap();
      }
      if (!Rprestraid && !Rfailpraid && !game.global.repeatMap) {
        repeatClicked();
      }
	    Rprestraid = true;
	    Rfailpraid = false
	    Rmapbought = false;
    }
  }

  if (getPageSetting('RAutoMaps') == 0 && game.global.preMapsActive && Rprestraid && !Rfailpraid && Rprestraidon) {
    RpraidDone = true;
    Rprestraidon = false;
    autoTrimpSettings["RAutoMaps"].value = 1;
    game.options.menu.repeatUntil.enabled = 0;
    debug("Prestige raiding successful! - recycling Praid map");
    recycleMap(getMapIndex(RpMap));
    debug("Turning AutoMaps back on");
  }
  if (getPageSetting('RPraidingzone').every(isBelowThreshold)) {
    Rprestraid = false;
    Rfailpraid = false;
    Rprestraidon = false;
    Rmapbought = false;
    RpraidDone = false;
  }
}

function RPraidHarder() {
  var maxPlusZones;
  var mapModifiers = ["p","fa","0"];
  var farmFragments;
  var praidBeforeFarm;
  var pRaidIndex;
  var maxPraidZSetting;
  var RisRbwraidZ;

  // Determine whether to use daily or normal run settings
  if (game.global.challengeActive == "Daily") {
    praidSetting = 'RdPraidingzone';
    maxPraidZSetting = 'RdMaxPraidZone';
    RisRbwraidZ = getPageSetting('RRdBWraidingz').includes(game.global.world) && getPageSetting('RDailybwraid');
    farmFragments = getPageSetting('RdPraidFarmFragsZ').includes(game.global.world);
    praidBeforeFarm = getPageSetting('RdPraidBeforeFarmZ').includes(game.global.world);
  }
  else {
    praidSetting = 'RPraidingzone';
    maxPraidZSetting = 'RMaxPraidZone';
    RisRbwraidZ = getPageSetting('RBWraidingz').includes(game.global.world) && getPageSetting('RBWraid');
    farmFragments = getPageSetting('RPraidFarmFragsZ').includes(game.global.world);
    praidBeforeFarm = getPageSetting('RPraidBeforeFarmZ').includes(game.global.world);
  }

  pRaidIndex = getPageSetting(RpraidSetting).indexOf(game.global.world);
  if (pRaidIndex == -1 || typeof(getPageSetting(RmaxPraidZSetting)[pRaidIndex]) === "undefined") maxPlusZones = plusMapToRun(game.global.world);
  else maxPlusZones = getPageSetting(RmaxPraidZSetting)[pRaidIndex] - game.global.world;

  // Check we have a valid number for maxPlusZones
  maxPlusZones = maxPlusZones > 10 ? 10 : (maxPlusZones < 0 ? 10 : maxPlusZones);

  // Work out the max number of +map zones it's worth farming for prestige.
  if ((game.global.world + maxPlusZones) % 10 > 5)
    maxPlusZones = Math.max(maxPlusZones + (5 - (game.global.world + maxPlusZones) % 10),0);
  else if ((game.global.world + maxPlusZones) % 10 == 0)
    maxPlusZones = Math.min(5,maxPlusZones);

  // If we have any Praiding zones defined...
  if (getPageSetting(RpraidSetting).length) {
    if (getPageSetting(RpraidSetting).includes(game.global.world) && !Rprestraid && !Rfailpraid && !RshouldFarmFrags) {
      debug('Beginning Praiding');
      // Initialise RshouldFarmFrags to false
      RshouldFarmFrags = false;
      // Mark that we are prestige raiding and turn off automaps to stop it interfering
      Rprestraidon = true;
      autoTrimpSettings["RAutoMaps"].value = 0;
      // Get into the preMaps screen
      if (!game.global.preMapsActive && !game.global.mapsActive) {
        mapsClicked();
	if (!game.global.preMapsActive) {
          mapsClicked();
        }
      }
      // Set repeat for items
      game.options.menu.repeatUntil.enabled = 2;
      toggleSetting("repeatUntil", null, false, true);
      // if we can farm for fragments, work out the minimum number we need to get all available prestiges
      if (farmFragments) {
        plusPres();
        document.getElementById('advExtraLevelSelect').value = maxPlusZones;
        document.getElementById('sizeAdvMapsRange').value = 0;
        document.getElementById('difficultyAdvMapsRange').value = 0;
        document.getElementById('advSpecialSelect').value = "0";
        RminMaxMapCost = updateMapCost(true);
        // If we are not Praiding before farming, and cannot afford a max plus map, set flags for farming
        if (!praidBeforeFarm && game.resources.fragments.owned < RminMaxMapCost) {
          Rprestraid = true;
          Rfailpraid = false;
          RshouldFarmFrags = true;
        }
      }
      // Set map settings to the best map for Praiding (even if we can't afford it)
      plusPres();
      document.getElementById('advExtraLevelSelect').value = maxPlusZones;
      // Iterate down through plusMaps setting until we find one we can afford
      for (var curPlusZones = maxPlusZones; curPlusZones >= 0; curPlusZones--) {
        // If the current targeted zone has no prestiges, decrement the number of plusZones and continue
        if ((game.global.world + curPlusZones) % 10 == 0 || (game.global.world + curPlusZones) % 10 > 5) continue;
        // Otherwise check to see if we can afford a map at the current plusZones setting
        document.getElementById('advExtraLevelSelect').value = curPlusZones;
        // If we find a map we can afford, break out of the loop
        if (relaxMapReqs(mapModifiers)) break;
        // conserve fragments if going to farm after by selecting only maps with no special modifier
        else if (farmFragments) mapModifiers = ["0"];
      }
      // If the map is not at the highest level with prestiges possible, set RshouldFarmFrags to true
      if (maxPlusZones > curPlusZones) RshouldFarmFrags = true;

      // If we found a suitable map...
      if (curPlusZones >= 0 && (praidBeforeFarm || RshouldFarmFrags == false)) {
        // ...buy it
        buyMap();
        RpMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length-1].id;
        selectMap(RpMap);
        // Set flags to avoid rerunning this step
        Rprestraid = true;
        // Rprestraidon = false;
        Rfailpraid = false;
        // Set repeat on and run the map
        game.global.repeatMap = true;
        runMap();
        repeatClicked(true);
      }
      // If we can't afford a map, and can't farm fragments, fail and turn automaps back on
      else if (!farmFragments){
        Rfailpraid = true;
        Rprestraidon = false;
        RpraidDone = true;
        debug("Failed to prestige raid. Looks like you can't afford to.");
        if (RisRbwraidZ) {
          // resetting these out of an abundance of caution
          Rbwraided = false;
          Rfailbwraid = false;
          Rdbwraided = false;
          Rdfailbwraid = false;
          // BWraiding();
        }
        else {
          debug("Turning AutoMaps back on");
          autoTrimpSettings['RAutoMaps'].value = 1;
          game.options.menu.repeatUntil.enabled = 0;
        }
        return;
      }
    }
  }
  if (farmFragments && RshouldFarmFrags && game.global.preMapsActive && Rprestraid && !RfMap) {
    if (RpMap) recycleMap(getMapIndex(RpMap));
    RpMap = null;
    // Choose a fragment farming map
    document.getElementById("biomeAdvMapsSelect").value = "Depths";
    document.getElementById('advExtraLevelSelect').value = 0;
    document.getElementById('advSpecialSelect').value = "fa";
    document.getElementById("lootAdvMapsRange").value = 9;
    document.getElementById("difficultyAdvMapsRange").value = 9;
    document.getElementById("sizeAdvMapsRange").value = 9;
    document.getElementById('advPerfectCheckbox').checked = true;
    document.getElementById("mapLevelInput").value = game.global.world - 1;
    game.options.menu.repeatUntil.enabled = 0;
    toggleSetting("repeatUntil", null, false, true);
    if (updateMapCost(true) <= game.resources.fragments.owned) {
      debug("Buying perfect sliders fragment farming map");
      buyMap();
      RfMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length-1].id;
      selectMap(RfMap);
      game.global.repeatMap = true;
      runMap();
      repeatClicked(true);
    }
    else {
      document.getElementById('advPerfectCheckbox').checked = false;
      if (updateMapCost(true) <= game.resources.fragments.owned) {
        debug("Buying imperfect sliders fragment farming map");
        buyMap();
        RfMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length-1].id;
        selectMap(RfMap);
        game.global.repeatMap = true;
        runMap();
        repeatClicked(true);
      }
      // if we can't buy a map, wait until the next main loop iteration and try again
      else debug("Can't afford fragment farming map yet");
    }
  }

  if ((game.global.mapsActive || game.global.preMapsActive) && RminMaxMapCost <= game.resources.fragments.owned && RshouldFarmFrags) {
    game.global.repeatMap = false;
    repeatClicked(true);
    if (game.global.preMapsActive) {
      RminMaxMapCost = null;
      RshouldFarmFrags = false;
      Rprestraid = false;
      Rfailpraid = false;
    }
  }
  if (game.global.preMapsActive && Rprestraid && !Rfailpraid && !RshouldFarmFrags && Rprestraidon) {
    Rprestraidon = false;
    RpraidDone = true;
    debug("Prestige raiding successful! - recycling Praid map");
    if (RpMap) recycleMap(getMapIndex(RpMap));
    if (RfMap) recycleMap(getMapIndex(RfMap));
    RpMap = null;
    RfMap = null;
    if (RisRbwraidZ) {
      Rbwraided = false;
      Rfailbwraid = false;
      Rdbwraided = false;
      Rdfailbwraid = false;
    }
    else {
      debug("Turning AutoMaps back on");
      game.options.menu.repeatUntil.enabled = 0;
      autoTrimpSettings['AutoMaps'].value = 1;    
    }
  }

  if (!getPageSetting(praidSetting).includes(game.global.world)) {
    Rprestraid = false;
    Rfailpraid = false;
    Rprestraidon = false;
    RshouldFarmFrags = false;
    RpraidDone = false;
  }
}

function RBWraiding() {
  var RbwraidZ;
  var bwraidSetting;
  var RbwraidMax;
  var isPraidZ;
  var ispraidon;
  var RisRbwraidZ;
  var targetBW;
  var bwIndex;

  if (game.global.challengeActive == "Daily") {
    RbwraidZ = 'RdBWraidingz';
    bwraidSetting = 'RDailybwraid';
    RbwraidMax = 'RdBWraidingmax';
    isPraidZ = getPageSetting('RdPraidingzone').includes(game.global.world);
    ispraidon = Rdprestraidon;
  }
  else {
    RbwraidZ = 'RBWraidingz';
    bwraidSetting = 'RBWraid';
    RbwraidMax = 'RBWraidingmax';
    isPraidZ = getPageSetting('RPraidingzone').includes(game.global.world);
    ispraidon = Rprestraidon;
  }

  RisRbwraidZ = getPageSetting(RbwraidZ).includes(game.global.world);
  bwIndex = getPageSetting(RbwraidZ).indexOf(game.global.world);
  if (bwIndex == -1 || typeof(getPageSetting(RbwraidMax)[bwIndex]) === "undefined") targetBW = -1;
  else targetBW = getPageSetting(RbwraidMax)[bwIndex];

  if ((!isPraidZ || RpraidDone) && !ispraidon && RisRbwraidZ && !Rbwraided && !Rfailbwraid && bwraidSetting) {
    if (getPageSetting('RAutoMaps') == 1 && !Rbwraided && !Rfailbwraid) {
      autoTrimpSettings["RAutoMaps"].value = 0;
    }

    while (!game.global.preMapsActive && !Rbwraidon) mapsClicked();

    if (game.options.menu.repeatUntil.enabled != 2 && !Rbwraided && !Rfailbwraid) {
      game.options.menu.repeatUntil.enabled = 2;
    }

    if (game.global.preMapsActive && !Rbwraided && !Rfailbwraid && findLastBionic()) {
      selectMap(findLastBionic().id);
      Rfailbwraid = false;
      debug("Beginning BW Raiding...");
    }

    else if (game.global.preMapsActive && !Rbwraided && !Rfailbwraid) {
      if (getPageSetting('RAutoMaps') == 0 && RisRbwraidZ && !Rbwraided) {
        autoTrimpSettings["RAutoMaps"].value = 1;
        Rfailbwraid = true;
        debug("Failed to BW raid. Looks like you don't have a BW to raid...");
      }
    }

    if (findLastBionic().level <= targetBW && !Rbwraided && !Rfailbwraid && game.global.preMapsActive) {
      runMap();
      Rbwraidon = true;
    }

    if (!game.global.repeatMap && !Rbwraided && !Rfailbwraid && game.global.mapsActive) {
      repeatClicked();
    }

    if (findLastBionic().level > targetBW && !Rbwraided && !Rfailbwraid) {
      Rbwraided = true;
      Rfailbwraid = false;
      Rbwraidon = false;
      debug("...Successfully BW raided!");
    }
  }

  if (getPageSetting('RAutoMaps') == 0 && game.global.preMapsActive && Rbwraided && !Rfailbwraid) {
    autoTrimpSettings["RAutoMaps"].value = 1;
    debug("Turning AutoMaps back on");
  }

  if (!RisRbwraidZ) {
    Rbwraided = false;
    Rfailbwraid = false;
    Rbwraidon = false;
  }
}

function RdailyPraiding() {
    var dpMap;
    if (getPageSetting('RdPraidingzone').length) {
   	if (getPageSetting('RdPraidingzone').includes(game.global.world) && !Rdprestraid && !Rdfailpraid) {
            debug('World Zone matches a Daily Praiding Zone!');
	    Rdprestraidon = true;
             if (getPageSetting('RAutoMaps') == 1 && !Rdprestraid && !Rdfailpraid) {
                autoTrimpSettings["RAutoMaps"].value = 0;
            }
            if (!game.global.preMapsActive && !game.global.mapsActive && !Rdprestraid && !Rdfailpraid) {
                mapsClicked();
		if (!game.global.preMapsActive) {
                    mapsClicked();
                }
		debug("Beginning Daily Prestige Raiding...");
            }
            if (game.options.menu.repeatUntil.enabled!=2 && !Rdprestraid && !Rdfailpraid) {
                game.options.menu.repeatUntil.enabled = 2;
            }
            if (game.global.preMapsActive && !Rdprestraid && !Rdfailpraid) {
                plusPres();
                if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                    buyMap();
                    Rdfailpraid = false;
		    Rdmapbought = true;
                }
                else if ((updateMapCost(true) > game.resources.fragments.owned)) {
                    if (getPageSetting('RAutoMaps') == 0 && !Rdprestraid) {
                        autoTrimpSettings["RAutoMaps"].value = 1;
                        Rdfailpraid = true;
			                  Rdprestraidon = false;
			                  Rdmapbought = false;
                        RpraidDone = true;
                        debug("Failed to Daily Prestige Raid. Looks like you can't afford to..");
                    }
                    return;
                 }
	    }
	    if (Rdmapbought == true) {
		dpMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length-1].id;
                selectMap(dpMap);
		runMap();
            }
            if (!Rdprestraid && !Rdfailpraid && !game.global.repeatMap) {
                repeatClicked();
             }
	    Rdprestraid = true;
	    Rdfailpraid = false;
	    Rdmapbought = false;
	}
    }
     if (getPageSetting('RAutoMaps') == 0 && game.global.preMapsActive && Rdprestraid && !Rdfailpraid && Rdprestraidon) {
        RpraidDone = true;
        Rdprestraidon = false;
        autoTrimpSettings["RAutoMaps"].value = 1;
	      debug("Daily Prestige Raiding successful! - recycling Praid map");
	      recycleMap(getMapIndex(dpMap));
	      debug("Turning AutoMaps back on");
    }
    if (getPageSetting('RdPraidingzone').every(isBelowThreshold)) {
        Rdprestraid = false;
        Rdfailpraid = false
        Rdprestraidon = false;
        Rdmapbought = false;
        RpraidDone = false;
    }
}

function RdailyBWraiding() {
 	 if (!Rdprestraidon && game.global.world == getPageSetting('RdBWraidingz') && !Rdbwraided && !Rdfailbwraid && getPageSetting('RDailybwraid')) {
 	     if (getPageSetting('RAutoMaps') == 1 && !Rdbwraided && !Rdfailbwraid) {
                 autoTrimpSettings["RAutoMaps"].value = 0;
                 }
              if (!game.global.preMapsActive && !game.global.mapsActive && !Rdbwraided && !Rdfailbwraid) {
                 mapsClicked();
 		 if (!game.global.preMapsActive) {
                     mapsClicked();
                     }
                 }
 	     if (game.options.menu.repeatUntil.enabled != 2 && !Rdbwraided && !Rdfailbwraid) {
            	 game.options.menu.repeatUntil.enabled = 2;
                 }
 	     if (game.global.preMapsActive && !Rdbwraided && !Rdfailbwraid) {
		 selectMap(findLastBionic().id);
		 Rdfailbwraid = false;
		 debug("Beginning Daily BW Raiding...");
                 }
 	     else if (game.global.preMapsActive && !Rdbwraided && !Rdfailbwraid) {
                      if (getPageSetting('RAutoMaps') == 0 && game.global.world == getPageSetting('RdBWraidingz') && !Rdbwraided) {
                          autoTrimpSettings["RAutoMaps"].value = 1;
                          Rdfailbwraid = true;
                          debug("Failed to Daily BW raid. Looks like you don't have a BW to raid...");
                          }
                       }
 	     if (findLastBionic().level <= getPageSetting('RdBWraidingmax') && !Rdbwraided && !Rdfailbwraid && game.global.preMapsActive) {
		 runMap();
		 Rdbwraidon = true;
		 }
 	     if (!game.global.repeatMap && !Rdbwraided && !Rdfailbwraid && game.global.mapsActive) {
		 repeatClicked();
		 }
 	     if (findLastBionic().level > getPageSetting('RdBWraidingmax') && !Rdbwraided && !Rdfailbwraid) {
                 Rdbwraided = true;
            	 Rdfailbwraid = false;
		 Rdbwraidon = false;
           	 debug("...Successfully Daily BW raided!");
		 }
 	     if (getPageSetting('RAutoMaps') == 0 && game.global.preMapsActive && game.global.world == getPageSetting('RdBWraidingz') && Rdbwraided && !Rdfailbwraid) {
                 autoTrimpSettings["RAutoMaps"].value = 1;
		 debug("Turning AutoMaps back on");
                 }
 	    }
 	if (getPageSetting('RAutoMaps') == 0 && game.global.preMapsActive && Rdbwraided && !Rdfailbwraid) {
            autoTrimpSettings["RAutoMaps"].value = 1;
	    debug("Turning AutoMaps back on");
	    }
 	if (Rdbwraided && !Rdfailbwraid && game.global.world !== getPageSetting('RdBWraidingz')) {
            Rdbwraided = false;
	    Rdfailbwraid = false;
	    Rdbwraidon = false;
            }
 }

function Rfightalways() {
	if (game.global.gridArray.length === 0 || game.global.preMapsActive || !game.upgrades.Battle.done || game.global.fighting)
	    return;
	if (!game.global.fighting)
	    fightManual();
}

function Rarmormagic() {
	var armormagicworld =  Math.floor((game.global.highestLevelCleared + 1) * 0.8);
	if (((getPageSetting('Rcarmormagic') == 1 || getPageSetting('Rdarmormagic') == 1) && game.global.world >= armormagicworld && (game.global.soldierHealth <= game.global.soldierHealthMax*0.4)) || ((getPageSetting('Rcarmormagic') == 2 || getPageSetting('Rdarmormagic') == 2) && RcalcHDratio() >= MODULES["maps"].RenoughDamageCutoff && (game.global.soldierHealth <= game.global.soldierHealthMax*0.4)) || ((getPageSetting('Rcarmormagic') == 3 || getPageSetting('Rdarmormagic') == 3) && (game.global.soldierHealth <= game.global.soldierHealthMax*0.4)))
	 RbuyArms();
}

function questcheck() {
	//x5 resource
	if (game.challenges.Quest.getQuestDescription() == "Quintuple (x5) your food" && game.challenges.Quest.getQuestProgress() != "Quest Complete!")
		return 10;
	else if (game.challenges.Quest.getQuestDescription() == "Quintuple (x5) your wood" && game.challenges.Quest.getQuestProgress() != "Quest Complete!")
		return 11;
	else if (game.challenges.Quest.getQuestDescription() == "Quintuple (x5) your metal" && game.challenges.Quest.getQuestProgress() != "Quest Complete!")
		return 12;
	else if (game.challenges.Quest.getQuestDescription() == "Quintuple (x5) your gems" && game.challenges.Quest.getQuestProgress() != "Quest Complete!")
		return 13;
	else if (game.challenges.Quest.getQuestDescription() == "Quintuple (x5) your science" && game.challenges.Quest.getQuestProgress() != "Quest Complete!")
		return 14;
	//x2 resource
	else if (game.challenges.Quest.getQuestDescription() == "Double your food" && game.challenges.Quest.getQuestProgress() != "Quest Complete!")
		return 20;
	else if (game.challenges.Quest.getQuestDescription() == "Double your food" && game.challenges.Quest.getQuestProgress() != "Quest Complete!")
		return 21;
	else if (game.challenges.Quest.getQuestDescription() == "Double your food" && game.challenges.Quest.getQuestProgress() != "Quest Complete!")
		return 22;
	else if (game.challenges.Quest.getQuestDescription() == "Double your food" && game.challenges.Quest.getQuestProgress() != "Quest Complete!")
		return 23;
	else if (game.challenges.Quest.getQuestDescription() == "Double your food" && game.challenges.Quest.getQuestProgress() != "Quest Complete!")
		return 24;
	//Everything else
	else if (game.challenges.Quest.getQuestDescription() == "Complete 5 Maps at Zone level" && game.challenges.Quest.getQuestProgress() != "Quest Complete!")
		return 3;
	else if (game.challenges.Quest.getQuestDescription() == "One-shot 5 world enemies" && game.challenges.Quest.getQuestProgress() != "Quest Complete!")
		return 4;
	else if (game.challenges.Quest.getQuestDescription() == "Don't let your shield break before Cell 100" && game.challenges.Quest.getQuestProgress() != "Quest Complete!")
		return 5;
	else if (game.challenges.Quest.getQuestDescription() == "Don't run a map before Cell 100" && game.challenges.Quest.getQuestProgress() != "Quest Complete!")
		return 6;
	else if (game.challenges.Quest.getQuestDescription() == "Buy a Smithy" && game.challenges.Quest.getQuestProgress() != "Quest Complete!")
		return 7;
}
