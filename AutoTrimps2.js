var ATversion='Zek v3.2.1',atscript=document.getElementById('AutoTrimps-script'),basepath='https://mcronce.github.io/AutoTrimps/',modulepath='modules/';null!==atscript&&(basepath=atscript.src.replace(/AutoTrimps2\.js$/,''));
function ATscriptLoad(a,b){null==b&&debug('Wrong Syntax. Script could not be loaded. Try ATscriptLoad(modulepath, \'example.js\'); ');var c=document.createElement('script');null==a&&(a=''),c.src=basepath+a+b+'.js',c.id=b+'_MODULE',document.head.appendChild(c)}
function ATscriptUnload(a){var b=document.getElementById(a+"_MODULE");b&&(document.head.removeChild(b),debug("Removing "+a+"_MODULE","other"))}
ATscriptLoad(modulepath, 'utils');

function initializeAutoTrimps() {
    loadPageVariables();
    ATscriptLoad('','SettingsGUI');
    ATscriptLoad('','Graphs');
    ATmoduleList = ['query', 'calc', 'portal', 'upgrades', 'heirlooms', 'buildings', 'jobs', 'equipment', 'gather', 'stance', 'maps', 'breedtimer', 'dynprestige', 'fight', 'scryer', 'magmite', 'nature', 'other', 'import-export', 'perks', 'fight-info', 'performance'];
    for (var m in ATmoduleList) {
        ATscriptLoad(modulepath, ATmoduleList[m]);
    }
    debug('AutoTrimps - Zek Fork Loaded!', '*spinner3');
}

var changelogList = [];
changelogList.push({date: "06/05/2019", version: "v3.2.2", description: "<b>4.11.2</b> Loot Dump Zone has been removed. Instead it will allocate on portal. This should be much better performance wise! ", isNew: true});
changelogList.push({date: "13/04/2019", version: "v3.2.1", description: "<b>4.11.1</b> Unfortunately I have had to remove some graphs and limit graph keeping to 10 due to LocalStorage issues. Sorry for any inconvenience caused. ", isNew: false});
changelogList.push({date: "27/03/2019", version: "v3.2.0", description: "<b>4.11.0</b> Added Spire Cores to autoHeirlooms. Added nature rework. Updated calcs. Added Ratio spending for Magmite. ", isNew: false});
changelogList.push({date: "06/02/2019", version: "v3.1.0", description: "<b>4.10.4</b> Autonu Spender added. I think I did some other things but I honestly cant remember. Enjoy! ", isNew: false});
//changelogList.push({date: "15/01/2019", version: "v3.0.1", description: "<b>4.10.3</b> New Windstacking stance, seems to work fine. Removed B stance, Heirloom swap settings, Heirloom HD from Non-Daily and Daily tabs. New Windstacking manages it for you. ", isNew: false});
//changelogList.push({date: "12/01/2019", version: "v3.0.0", description: "<b>4.10.2</b> Whole host of new changes and background fixes and additions, mostly calculations, which means is pretty much a new version of the fork. Check the tabs for some new buttons! Be sure to try out Beta Windstacking. Thanks for the continued support, means a lot. ", isNew: false});

function assembleChangelog(a,b,c,d){return d?`<b class="AutoEggs">${a} ${b} </b><b style="background-color:#32CD32"> New:</b> ${c}<br>`:`<b>${a} ${b} </b> ${c}<br>`}
function printChangelog() {
    var body="";
    for (var i in changelogList) {
        var $item = changelogList[i];
        var result = assembleChangelog($item.date,$item.version,$item.description,$item.isNew);
        body+=result;
    }
    var footer =
        '<b>ZӘK Fork</b> - <u>Report any bugs/problems please</u>!\
        <br>Talk with the dev: <b>ZӘK#2509</b> @ <a target="#" href="https://discord.gg/Ztcnfjr">Zeks Discord Channel</a>\
        <br>See <a target="#" href="https://github.com/mcronce/AutoTrimps/blob/gh-pages/README.md">ReadMe</a> Or check <a target="#" href="https://github.com/mcronce/AutoTrimps/commits/gh-pages" target="#">the commit history</a> (if you want).'
    ,   action = 'cancelTooltip()'
    ,   title = 'Script Update Notice<br>' + ATversion
    ,   acceptBtnText = "Thank you for playing AutoTrimps. Accept and Continue."
    ,   hideCancel = true;
    tooltip('confirm', null, 'update', body+footer, action, title, acceptBtnText, null, hideCancel);
}
var runInterval=100,startupDelay=4000;setTimeout(delayStart,startupDelay);function delayStart(){initializeAutoTrimps(),printChangelog(),setTimeout(delayStartAgain,startupDelay)}function delayStartAgain(){game.global.addonUser=!0,game.global.autotrimps=!0,MODULESdefault=JSON.parse(JSON.stringify(MODULES)),setInterval(mainLoop,runInterval),setInterval(guiLoop,10*runInterval),autoTrimpSettings.PrestigeBackup!==void 0&&''!=autoTrimpSettings.PrestigeBackup.selected&&(document.getElementById('Prestige').value=autoTrimpSettings.PrestigeBackup.selected),''===document.getElementById('Prestige').value&&(document.getElementById('Prestige').value='Off')}
var ATrunning=!0,ATmessageLogTabVisible=!0,enableDebug=!0,autoTrimpSettings={},MODULES={},MODULESdefault={},ATMODULES={},ATmoduleList=[],bestBuilding,scienceNeeded,breedFire=!1,shouldFarm=!1,farm_reason='',enoughDamage=!0,enoughHealth=!0,baseDamage=1,baseBlock=1,baseHealth=1,preBuyAmt,preBuyFiring,preBuyTooltip,preBuymaxSplit,currentworld=0,lastrunworld=0,aWholeNewWorld=!1,needGymystic=!0,heirloomFlag=!1,heirloomCache=game.global.heirloomsExtra.length,magmiteSpenderChanged=!1,daily3=!1;

function mainLoop() {
    if (ATrunning == false) return;
    if (getPageSetting('PauseScript') || game.options.menu.pauseGame.enabled || game.global.viewingUpgrades) return;
    ATrunning = true;
    if (getPageSetting('showbreedtimer') == true) {
        if (game.options.menu.showFullBreed.enabled != 1) toggleSetting("showFullBreed");
        addbreedTimerInsideText.innerHTML = ((game.jobs.Amalgamator.owned > 0) ? Math.floor((new Date().getTime() - game.global.lastSoldierSentAt) / 1000) : Math.floor(game.global.lastBreedTime / 1000)) + 's'; //add breed time for next army;
        addToolTipToArmyCount();
    }
    if (mainCleanup() || portalWindowOpen || (!heirloomsShown && heirloomFlag) || (heirloomCache != game.global.heirloomsExtra.length)) {
        heirloomCache = game.global.heirloomsExtra.length;
    }
    heirloomFlag = heirloomsShown;
    if (aWholeNewWorld) {
        switch (document.getElementById('tipTitle').innerHTML) {
            case 'The Improbability':
            case 'Corruption':
            case 'Spire':
            case 'The Magma':
                cancelTooltip();
        }
        if (getPageSetting('AutoEggs'))
            easterEggClicked();
        setTitle();
    }
    setScienceNeeded();
    autoLevelEquipment();

    //Core
    if (getPageSetting('AutoMaps') > 0) autoMap();
    if (getPageSetting('showautomapstatus') == true) updateAutoMapsStatus();
    if (getPageSetting('ManualGather2') == 1) manualLabor2();
    if (getPageSetting('ManualGather2') == 2) autogather3();
    if (getPageSetting('ATGA2') == true) ATGA2();
    if (getPageSetting('TrapTrimps') && game.global.trapBuildAllowed && game.global.trapBuildToggled == false) toggleAutoTrap();
    if (aWholeNewWorld && getPageSetting('AutoRoboTrimp')) autoRoboTrimp();
    if (game.global.challengeActive == "Daily" && getPageSetting('buyheliumy') >= 1 && getDailyHeliumValue(countDailyWeight()) >= getPageSetting('buyheliumy') && game.global.b >= 100 && !game.singleRunBonuses.heliumy.owned) purchaseSingleRunBonus('heliumy');
    if (aWholeNewWorld && getPageSetting('FinishC2') > 0 && game.global.runningChallengeSquared) finishChallengeSquared();
    if (getPageSetting('spendmagmite') == 2 && !magmiteSpenderChanged) autoMagmiteSpender();
    if (getPageSetting('AutoNatureTokens') && game.global.world > 229) autoNatureTokens();
    if (getPageSetting('autoenlight') && game.global.world > 229 && game.global.uberNature == false) autoEnlight();
    if (getPageSetting('BuyUpgradesNew') != 0) buyUpgrades();
    
    //Buildings
    if (getPageSetting('BuyBuildingsNew') === 0 && getPageSetting('hidebuildings') == true) buyBuildings();
    else if (getPageSetting('BuyBuildingsNew') == 1) {
        buyBuildings();
        buyStorage();
    } else if (getPageSetting('BuyBuildingsNew') == 2) buyBuildings();
    else if (getPageSetting('BuyBuildingsNew') == 3) buyStorage();
    if (getPageSetting('UseAutoGen') == true && game.global.world > 229) autoGenerator();

    //Jobs
    if (getPageSetting('BuyJobsNew') === 0);
    else if (getPageSetting('BuyJobsNew') == 1) {
        workerRatios();
        buyJobs();
    } else if (getPageSetting('BuyJobsNew') == 2) buyJobs();

    //Portal
    if (autoTrimpSettings.AutoPortal.selected != "Off" && game.global.challengeActive != "Daily" && !game.global.runningChallengeSquared) autoPortal();
    if (getPageSetting('AutoPortalDaily') > 0 && game.global.challengeActive == "Daily") dailyAutoPortal();
    if (getPageSetting('c2runnerstart') == true && getPageSetting('c2runnerportal') > 0 && game.global.runningChallengeSquared && game.global.world > getPageSetting('c2runnerportal')) c2runnerportal();

    //Combat
    if (getPageSetting('ForceAbandon') == true || getPageSetting('fuckanti') > 0) trimpcide();
    if (getPageSetting('trimpsnotdie') == true && game.global.world > 1) helptrimpsnotdie();
    if (!game.global.fighting) {
        if (getPageSetting('fightforever') == 0) fightalways();
        else if (getPageSetting('fightforever') > 0 && calcHDratio() <= getPageSetting('fightforever')) fightalways();
        else if (getPageSetting('cfightforever') == true && (game.global.challengeActive == 'Electricty' || game.global.challengeActive == 'Toxicity' || game.global.challengeActive == 'Nom')) fightalways();
        else if (getPageSetting('dfightforever') == 1 && game.global.challengeActive == "Daily" && typeof game.global.dailyChallenge.empower == 'undefined' && typeof game.global.dailyChallenge.bloodthirst == 'undefined' && (typeof game.global.dailyChallenge.bogged !== 'undefined' || typeof game.global.dailyChallenge.plague !== 'undefined' || typeof game.global.dailyChallenge.pressure !== 'undefined')) fightalways();
        else if (getPageSetting('dfightforever') == 2 && game.global.challengeActive == "Daily" && (typeof game.global.dailyChallenge.bogged !== 'undefined' || typeof game.global.dailyChallenge.plague !== 'undefined' || typeof game.global.dailyChallenge.pressure !== 'undefined')) fightalways();
    }
    if (getPageSetting('BetterAutoFight') == 1) betterAutoFight();
    if (getPageSetting('BetterAutoFight') == 2) betterAutoFight2();
    if (getPageSetting('BetterAutoFight') == 3) betterAutoFight3();
    var forcePrecZ = (getPageSetting('ForcePresZ') < 0) || (game.global.world < getPageSetting('ForcePresZ'));
    if (getPageSetting('DynamicPrestige2') > 0 && forcePrecZ) prestigeChanging2();
    else autoTrimpSettings.Prestige.selected = document.getElementById('Prestige').value;
    if (game.global.world > 5 && game.global.challengeActive == "Daily" && getPageSetting('avoidempower') == true && typeof game.global.dailyChallenge.empower !== 'undefined' && !game.global.preMapsActive && !game.global.mapsActive && game.global.soldierHealth > 0) avoidempower();
    if (getPageSetting('buywepsvoid') == true && ((getPageSetting('VoidMaps') == game.global.world && game.global.challengeActive != "Daily") || (getPageSetting('DailyVoidMod') == game.global.world && game.global.challengeActive == "Daily")) && game.global.mapsActive && getCurrentMapObject().location == "Void") buyWeps();
    if ((getPageSetting('darmormagic') > 0 && typeof game.global.dailyChallenge.empower == 'undefined' && typeof game.global.dailyChallenge.bloodthirst == 'undefined' && (typeof game.global.dailyChallenge.bogged !== 'undefined' || typeof game.global.dailyChallenge.plague !== 'undefined' || typeof game.global.dailyChallenge.pressure !== 'undefined')) || (getPageSetting('carmormagic') > 0 && (game.global.challengeActive == 'Toxicity' || game.global.challengeActive == 'Nom'))) armormagic();

    //Stance
    if ((getPageSetting('UseScryerStance') == true) || ((getPageSetting('scryvoidmaps') == true && game.global.challengeActive != "Daily") || (getPageSetting('dscryvoidmaps') == true && game.global.challengeActive == "Daily"))) useScryerStance();
    else if ((getPageSetting('AutoStance') == 3) || (getPageSetting('use3daily') == true && game.global.challengeActive == "Daily")) windStance();
    else if (getPageSetting('AutoStance') == 1) autoStance();
    else if (getPageSetting('AutoStance') == 2) autoStance2();
    if (getPageSetting('AutoStanceNew') == true) autoStanceNew();

    //Spire
    if (getPageSetting('ExitSpireCell') > 0 && game.global.challengeActive != "Daily" && getPageSetting('IgnoreSpiresUntil') <= game.global.world && game.global.spireActive) exitSpireCell();
    if (getPageSetting('dExitSpireCell') >= 1 && game.global.challengeActive == "Daily" && getPageSetting('dIgnoreSpiresUntil') <= game.global.world && game.global.spireActive) dailyexitSpireCell();
    if (getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world) ATspirebreed();
    if (getPageSetting('spireshitbuy') == true && (isActiveSpireAT() || disActiveSpireAT())) buyshitspire();

    //Raiding

    if ((getPageSetting('PraidHarder') == true && getPageSetting('Praidingzone').length > 0 && game.global.challengeActive != "Daily") || (getPageSetting('dPraidHarder') == true && getPageSetting('dPraidingzone').length > 0 && game.global.challengeActive == "Daily")) PraidHarder();
    else {
        if (getPageSetting('Praidingzone').length && game.global.challengeActive != "Daily") Praiding();
        if (getPageSetting('dPraidingzone').length && game.global.challengeActive == "Daily") dailyPraiding();
    }
    if (getPageSetting('BWraid') && game.global.challengeActive != "Daily" || getPageSetting('Dailybwraid') && game.global.challengeActive == "Daily") {
        setTimeout(BWraiding(), 3000);
    }
    if ((getPageSetting('BWraid') == true || getPageSetting('DailyBWraid') == true) && bwraidon) buyWeps();
    if (game.global.mapsActive && getPageSetting('BWraid') == true && game.global.world == getPageSetting('BWraidingz') && getCurrentMapObject().level <= getPageSetting('BWraidingmax')) buyWeps();

    //Golden
    var agu = getPageSetting('AutoGoldenUpgrades');
    var dagu = getPageSetting('dAutoGoldenUpgrades');
    var cagu = getPageSetting('cAutoGoldenUpgrades');
    if (agu && agu != 'Off' && (!game.global.runningChallengeSquared && game.global.challengeActive != "Daily")) autoGoldenUpgradesAT(agu);
    if (dagu && dagu != 'Off' && game.global.challengeActive == "Daily") autoGoldenUpgradesAT(dagu);
    if (cagu && cagu != 'Off' && game.global.runningChallengeSquared) autoGoldenUpgradesAT(cagu);
}

function guiLoop(){updateCustomButtons(),safeSetItems('storedMODULES',JSON.stringify(compareModuleVars())),getPageSetting('EnhanceGrids')&&MODULES.fightinfo.Update(),'undefined'!=typeof MODULES&&'undefined'!=typeof MODULES.performance&&MODULES.performance.isAFK&&MODULES.performance.UpdateAFKOverlay()}
function mainCleanup() {
    lastrunworld = currentworld;
    currentworld = game.global.world;
    aWholeNewWorld = lastrunworld != currentworld;
    if (currentworld == 1 && aWholeNewWorld) {
        lastHeliumZone = 0;
        zonePostpone = 0;
        if (getPageSetting('AutoMaps')==0 && !game.upgrades.Battle.done)
            autoTrimpSettings["AutoMaps"].value = 1;
        return true;
    }
}
var userscriptOn = true;
var globalvar0,globalvar1,globalvar2,globalvar3,globalvar4,globalvar5,globalvar6,globalvar7,globalvar8,globalvar9;
function userscripts()
{

}
function throwErrorfromMain(){throw new Error("We have successfully read the thrown error message out of the main file")}
