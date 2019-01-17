window.onload = function() {
// Import stylesheets
import './style.css';

//Define Resources
$('#aboutDiv').hide();
var ore = 10000;
var oreText = document.getElementById('oreCount');
var metal = 10000;
var metalText = document.getElementById('metalCount');
var oil = 10000;
var oilText = document.getElementById('oilCount');
var chromium = 5000;
var water = 5000;
var biomass = 2000;
var oxygen = 0;
var sand = 0;
var quartz = 0;
var power = 0;
var land = 30;
var science = 500;
var explorations = 0;
var timeconstant = 10;
var powerText = document.getElementById('power-text');
//Follow rule of [amount, production, *fuel*, price]
var mines = [2, 1, 10];
var refineries = [1, 1, -1, 15];
var panels = [1, 1, 20];
var pumpjacks = [0, 1, 250];
var generators = [0, 2, -1, 100];
var rockets = [5000, 250, 200];
var satellites = [0, 1, 0.05, -1, 1000, 1500];
var castingfurnaces = [0, 1, -1, 500, 350];
var heatingplants = [0, 1, -1, 300, 750];
var biofarms = [0, 1, -1, 100, 500];
var terrariums = [0, 5, -1, 500, 300];
var sandshovelers = [0, 30, -1, 750, 500];
var quartzdrills = [0, 0.02, -2, 1200, 750]; 

setInterval(updateResources, 100);
setInterval(checkUnlocks, 5000);
document.getElementById('aboutButton').addEventListener('click', showAbout);
document.getElementById('closeAbout').addEventListener('click', showAbout);
document.getElementById('refinerybtn').addEventListener('click', function () { buyBuilding('refinery') });
document.getElementById('minebtn').addEventListener('click', function () { buyBuilding('mine') });
document.getElementById('panelbtn').addEventListener('click', function () { buyBuilding('panel') });
document.getElementById('pumpjackbtn').addEventListener('click', function () { buyBuilding('pumpjack') });
document.getElementById('generatorbtn').addEventListener('click', function () { buyBuilding('generator') });
document.getElementById('rocketbtn').addEventListener('click', function () { buyBuilding('rocket') });
document.getElementById('satellitebtn').addEventListener('click', function () { buyBuilding('satellite') });
document.getElementById('launchrocketbtn').addEventListener('click', function () { launchRockets() });
document.getElementById('castingfurnacebtn').addEventListener('click', function () { buyBuilding('castingfurnace') });
document.getElementById('heatingplantbtn').addEventListener('click', function () { buyBuilding('heatingplant') });
document.getElementById('biofarmbtn').addEventListener('click', function () { buyBuilding('biofarm') });
document.getElementById('terrariumbtn').addEventListener('click', function () { buyBuilding('terrarium') });
document.getElementById('sandshovelerbtn').addEventListener('click', function () { buyBuilding('sandshoveler') });
document.getElementById('quartzdrillbtn').addEventListener('click', function () { buyBuilding('quartzdrill') });

document.getElementById('asteroidbtn').addEventListener('click', function () { setScene('asteroid') });
document.getElementById('logbtn').addEventListener('click', function () { setScene('log') });

document.getElementById('iceplanetExploration').addEventListener('click', function () { explorePlanet('ice') });
document.getElementById('desertplanetExploration').addEventListener('click', function () { explorePlanet('desert') });
document.getElementById('quartzplanetExploration').addEventListener('click', function () { explorePlanet('quartz') });

document.getElementById('satelliteResearchUnlock').addEventListener('click', function () { unlockTech ('satellite') });
document.getElementById('satellitePowerTech').addEventListener('click', function () { unlockTech ('solarSatellites') });

var buildings = document.getElementsByClassName('bldg');
for(var i = 0; i<buildings.length; i++) {
  buildings[i].addEventListener('mouseenter', function () {toolTip('bldg',this.id)});
  buildings[i].addEventListener('mouseleave', function() {document.getElementById('tooltipbox').style.display = 'none'});
}

function toolTip(version, single) {
  if(version == 'bldg') {
  document.getElementById('tooltipbox').style.display = 'block';
  single = '#' + single;
  var buttonpos = $(single).offset();
  buttonpos.top += 50;
  $("#tooltipbox").css({top: buttonpos.top, left: buttonpos.left}); 
  if(single == '#minebtn') {
  document.getElementById('tooltiptext').innerHTML = "Mines " + mines[1] + " ore every second from this cold wasteland.<br>Metal:" + mines[2]; 
  }
  if(single == '#refinerybtn') {
  document.getElementById('tooltiptext').innerHTML = "Refines " + refineries[1] + " ore into " + refineries[1] + " metal every second.<br>Ore:" + refineries[3]; 
  }
  }
} 

function setScene(scene) {
  if (scene == 'asteroid') {
    document.getElementById('space-hub').style.display = 'none';
    document.getElementById('science-hub').style.display = 'none';
    document.getElementById('asteroid-hub').style.display = 'block';
    document.getElementById('log-hub').style.display = 'none';
  }

  if (scene == 'space') {
    document.getElementById('asteroid-hub').style.display = 'none';
    document.getElementById('science-hub').style.display = 'none';
    document.getElementById('space-hub').style.display = 'block';
    document.getElementById('log-hub').style.display = 'none';
  }

  if (scene == 'science') {
    document.getElementById('asteroid-hub').style.display = 'none';
    document.getElementById('space-hub').style.display = 'none';
    document.getElementById('science-hub').style.display = 'block';
    document.getElementById('log-hub').style.display = 'none';
  }

  if(scene == 'log') {
    document.getElementById('asteroid-hub').style.display = 'none';
    document.getElementById('space-hub').style.display = 'none';
    document.getElementById('science-hub').style.display = 'none';
    document.getElementById('log-hub').style.display = 'block';
  }
}


function explorePlanet(planet) {
  if (planet == 'ice') {
    if (rockets[0] >= 20) {
      rockets[0] = rockets[0] - 20;
      document.getElementById('rocketbtn').innerHTML = 'Rocket(' + rockets[0] + ')';
      setTimeout(setTimeout(function () {
        document.getElementById('iceplanetExploration').style.display = 'none';
        document.getElementById('sciencebtn').addEventListener('click', function () { setScene('science') });
        document.getElementById('sciencebtn').innerHTML = 'Science';
        unlockFeature('heatingplant');
        document.getElementById('waterCount').style.display = 'block';
        document.getElementById('desertplanetExploration').style.display = 'inline-block';
        document.getElementById('quartzplanetExploration').style.display = 'inline-block';
      }, 1000));
    }
  }
  if(planet == 'desert') {
    if(rockets[0] >= 250) {
      rockets[0] = rockets[0] - 250;
      document.getElementById('rocketbtn').innerHTML = 'Rocket(' + rockets[0] + ')';
      setTimeout(setTimeout(function () {
        document.getElementById('desertplanetExploration').style.display = 'none';
        document.getElementById('sandshovelerbtn').style.display = 'inline-block';
        document.getElementById('sandCount').style.display = 'block';
      }, 1000));
    }
  }
  if(planet == 'quartz') {
    if(rockets[0] >= 750) {
      rockets[0] = rockets[0] - 750;
      document.getElementById('rocketbtn').innerHTML = 'Rocket(' + rockets[0] + ')';
      setTimeout(setTimeout(function () {
        document.getElementById('quartzplanetExploration').style.display = 'none';
        document.getElementById('quartzdrillbtn').style.display = 'inline-block';
        document.getElementById('quartzCount').style.display = 'block';
      }, 1000));  
    }
  }
}

function unlockTech(tech) {
  if(tech == 'satellite') {
    if(science >= 50 && oil >= 500 && metal >= 1000) {
      science = science - 50;
      oil = oil - 500;
      metal = metal - 1000;
      unlockFeature('satellites');
    }
  }
  if(tech == 'solarSatellites') {
    if(science >= 300 && metal >= 2000 && satellites[0] >= 1) {
      science = science - 300;
      metal = metal - 2000;
      document.getElementById('satellitePowerTech').style.display = 'none';
      satellites[3] = 0.5;
    }
  }
}

function unlockFeature(feature) {
  if (feature == 'heatingplant') {
    document.getElementById('heatingplantbtn').style.display = 'inline-block';
  }
  if(feature == 'satellites') {
    document.getElementById('satelliteResearchUnlock').style.display = 'none';
    document.getElementById('satellitebtn').style.display = 'inline-block';
  }
}

function logMessage(message) {
    var tempp = document.createElement('p');
    var tempt = document.createTextNode(message);
    tempp.appendChild(tempt);
    tempp.classList.add('logtext');
    document.getElementById('log-messages').appendChild(tempp);
}



function updateResources() {
    //calculate power amounts
    power = (panels[0] * panels[1]) + (refineries[0] * -1) + (satellites[0] * satellites[3]) + (sandshovelers[0] * sandshovelers[2]) + (quartzdrills[0] * quartzdrills[2]);
      if (oil == 0) {
        power = power + (pumpjacks[0] * generators[1]);
      }
      else {
        power = power + (generators[0] * generators[1]);
      }
      powerText.innerHTML = 'Power: ' + power;
    //set time constant
      if (power < 0) {
        timeconstant = 10 + (Math.abs(power) * 5);
      }
      else if (power >= 0) {
        timeconstant = 10;
      }
    //add all raw resources
    ore = ore + (((mines[0] * mines[1]) + (refineries[0] * refineries[2])) / timeconstant);
    oil = oil + (((pumpjacks[0] * pumpjacks[1]) + (generators[0] * generators[2]) + (castingfurnaces[0] * castingfurnaces[2]) + (heatingplants[2] * heatingplants[0])) / timeconstant);
    science = science + ((satellites[0] * satellites[1]) / timeconstant);
    document.getElementById('science-text').innerHTML = 'Science:' + Math.floor(science);
    land = land + ((satellites[0] * satellites[2]) / timeconstant);
    document.getElementById('land-text').innerHTML = 'Land:' + Math.floor(land);
    //check for diminishing resources and add tier-2 resources
    if (ore < 0) { ore = 0; }
    oreText.innerHTML = 'Ore: ' + Math.floor(ore);
    if (ore == 0) {
      metal = metal + ((mines[0] * mines[1]) / timeconstant);
      metalText.innerHTML = 'Metal:' + Math.floor(metal);
    }
    else {
      metal = metal + (((refineries[0] * refineries[1]) + (castingfurnaces[0] * castingfurnaces[2])) / timeconstant);
      metalText.innerHTML = 'Metal:' + Math.floor(metal);
    }
    chromium = chromium + ((castingfurnaces[0] * castingfurnaces[1]) / timeconstant);
    document.getElementById('chromiumCount').innerHTML = 'Chromium:' + Math.floor(chromium); 
    water = water + ((heatingplants[0] * heatingplants[1]) + (biofarms[0] * biofarms[2]) / timeconstant);
    if(water < 0) {water = 0;}
    document.getElementById('waterCount').innerHTML = 'Water:' + Math.floor(water); 
    if(water == 0) {biomass = biomass + (((heatingplants[0] * heatingplants[1]) + (terrariums[0] * terrariums[2])) / timeconstant);}
    else{biomass = biomass + (((biofarms[0] * biofarms[1]) + (terrariums[0] * terrariums[2]))/ timeconstant);}
    if(biomass < 0) {biomass = 0;}
    document.getElementById('biomassCount').innerHTML = 'Biomass:' + Math.floor(biomass); 
    oxygen = oxygen + ((terrariums[0] * terrariums[1]) / timeconstant);
    document.getElementById('oxygenCount').innerHTML = 'Oxygen:' + Math.floor(oxygen); 
    //oil check right before power calcs
    if (oil < 0) { oil = 0; }
    oilText.innerHTML = 'Oil:' + Math.floor(oil);
}

function checkUnlocks() {
  if(metal >= 300) {
    document.getElementById('pumpjackbtn').style.display = 'inline-block';
    document.getElementById('generatorbtn').style.display = 'inline-block';
    document.getElementById('oilCount').style.display = 'block';
  }

  if(oil >= 300) {
    document.getElementById('spacebtn').addEventListener('click', function () { setScene('space') });
    document.getElementById('spacebtn').innerHTML = 'Space';
    document.getElementById('rocketbtn').style.display = 'inline-block';
    document.getElementById('launchrocketbtn').style.display = 'inline-block';
    document.getElementById('land-text').style.display = 'block';
    document.getElementById('science-text').style.display = 'block';
  }

  if(pumpjacks[0] >= 10) {
    document.getElementById('castingfurnacebtn').style.display = 'inline-block';
    document.getElementById('chromiumCount').style.display = 'block';
  }

  if(water >= 100) {
    document.getElementById('biofarmbtn').style.display = 'inline-block';
    document.getElementById('biomassCount').style.display = 'block';
  }

  if(biofarms[0] >= 3) {
    document.getElementById('terrariumbtn').style.display = 'inline-block';
    document.getElementById('oxygenCount').style.display = 'block';
  }
}


function buyBuilding(building) {
  if (building == 'refinery') {
    if (ore >= refineries[3]) {
      ore = ore - refineries[3];
      refineries[0] = refineries[0] + 1;
      refineries[3] = Math.ceil(refineries[3] * 1.15)
      document.getElementById('refinerybtn').innerHTML = 'Refinery(' + refineries[0] + ')';
      if(refineries[0] == 2) {
        logMessage('Another refinery turns on, sucking ever more power from the already fragile network. Still, the metal is sorely needed.');
      }
    }
  }
  if (building == 'mine') {
    if (metal >= mines[2]) {
      metal = metal - mines[2];
      mines[0] = mines[0] + 1;
      mines[2] = Math.ceil(mines[2] * 1.15)
      document.getElementById('minebtn').innerHTML = 'Mine(' + mines[0] + ')'; 
      if(mines[0] == 3) {
        logMessage('Another mine, another crateful of ore. All one can hope for on this barren asteroid.');
      }
    }
  }
  if (building == 'panel') {
    if (metal >= panels[2]) {
      metal = metal - panels[2];
      panels[0] = panels[0] + 1;
      panels[2] = Math.ceil(panels[2] * 1.15)
      document.getElementById('panelbtn').innerHTML = 'Panel(' + panels[0] + ')';
      if(panels[0] == 2) {
        logMessage('The haphazardly placed wires of the panels struggle to grasp even a tiny amount of power from the long-dead star.');
      }
    }
  }
  if (building == 'pumpjack') {
    if (metal >= pumpjacks[2]) {
      metal = metal - pumpjacks[2];
      pumpjacks[0] = pumpjacks[0] + 1;
      pumpjacks[2] = Math.ceil(pumpjacks[2] * 1.15)
      document.getElementById('pumpjackbtn').innerHTML = 'Pumpjack(' + pumpjacks[0] + ')';
      if(pumpjacks[0] == 1) {
        logMessage('The pumpjack siphons oil from the veins of the asteroid. It is uncertain how much longer the steady drip will last.');
      }
    }
  }
  if (building == 'generator') {
    if (metal >= generators[3]) {
      metal = metal - generators[3];
      generators[0] = generators[0] + 1;
      generators[3] = Math.ceil(generators[3] * 1.15)
      document.getElementById('generatorbtn').innerHTML = 'Generator(' + generators[0] + ')';
      if(generators[0] == 1) {
        logMessage('The machine sacrifices precious oil in order to keep the grid stable. Does it really pull its weight?');
      }
    }
  }
  if (building == 'rocket') {
    if (metal >= rockets[1] && oil >= rockets[2]) {
      metal = metal - rockets[1];
      oil = oil - rockets[2];
      rockets[0] = rockets[0] + 1;
      document.getElementById('rocketbtn').innerHTML = 'Rocket(' + rockets[0] + ')';
    }
  }
  if (building == 'satellite') {
    if (metal >= satellites[5] && oil >= satellites[4]) {
      metal = metal - satellites[5];
      oil = oil - satellites[4];
      satellites[0] = satellites[0] + 1;
      satellites[4] = satellites[4] * 1.15;
      satellites[5] = satellites[5] * 1.15;
      document.getElementById('satellitebtn').innerHTML = 'Satellite(' + satellites[0] + ')';
      if(satellites[0] == 1) {
        logMessage('Satellites are launched into orbit, their sensors and scopes harvesting data to be processed. Hopefully, the core can process this into useful technology.');
      }
    }
  }
  if (building == 'castingfurnace') {
    if (ore >= castingfurnaces[3] && oil >= castingfurnaces[4]) {
      ore = ore - castingfurnaces[3];
      oil = oil - castingfurnaces[4];
      castingfurnaces[3] = Math.ceil(castingfurnaces[3] * 1.15);
      castingfurnaces[4] = Math.ceil(castingfurnaces[4] * 1.15);
      castingfurnaces[0] = castingfurnaces[0] + 1;
      document.getElementById('castingfurnacebtn').innerHTML = 'Casting Furnace(' + castingfurnaces[0] + ')';
      if(castingfurnaces[0] == 1) {
        logMessage('A new superheated furnace, strong enough to forge chromium. Invaluable in advanced construction.');
      }
    }
  }
  if (building == 'heatingplant') {
    if (chromium >= heatingplants[3] && metal >= heatingplants[4]) {
      chromium = chromium - heatingplants[3];
      metal = metal - heatingplants[4];
      heatingplants[3] = Math.ceil(heatingplants[3] * 1.15);
      heatingplants[4] = Math.ceil(heatingplants[4] * 1.15);
      heatingplants[0] = heatingplants[0] + 1;
      document.getElementById('heatingplantbtn').innerHTML = 'Heating Plant(' + heatingplants[0] + ')';
      if(heatingplants[0] == 1) {
        logMessage('This new planet could yield water if the great ice sheets were melted. The core has created blueprints for a plant that will be strong enough.');
      }
    }
  }
  if (building == 'biofarm') {
    if (chromium >= biofarms[4] && water >= biofarms[3]) {
      chromium = chromium - biofarms[4];
      water = water - biofarms[3];
      biofarms[4] = Math.ceil(biofarms[4] * 1.15);
      biofarms[3] = Math.ceil(biofarms[3] * 1.15);
      biofarms[0] = biofarms[0] + 1;
      document.getElementById('biofarmbtn').innerHTML = 'Biofarm(' + biofarms[0] + ')';
    }
  }
  if (building == 'terrarium') {
    if (biomass >= terrariums[4] && chromium >= terrariums[3]) {
      biomass = biomass - biofarms[4];
      chromium = chromium - biofarms[3];
      terrariums[4] = Math.ceil(terrariums[4] * 1.15);
      terrariums[3] = Math.ceil(terrariums[3] * 1.15);
      terrariums[0] = terrariums[0] + 1;
      document.getElementById('terrariumbtn').innerHTML = 'Terrarium(' + terrariums[0] + ')';
    }
  }
  if(building == 'sandshoveler') {
    if(chromium >= sandshovelers[3] && ore >= sandshovelers[4]) {
      chromium = chromium - sandshovelers[3];
      ore = ore - sandshovelers[4];
      sandshovelers[3] = Math.ceil(sandshovelers[3] * 1.15);
      sandshovelers[4] = Math.ceil(sandshovelers[4] * 1.15);
      sandshovelers[0] = sandshovelers[0] + 1;
      document.getElementById('sandshovelerbtn').innerHTML = 'Sand Shoveler(' + sandshovelers[0] + ')';
    }
  }
  if(building == 'quartzdrill') {
    if(chromium >= quartzdrills[3] && oil >= quartzdrills[4]) {
      chromium = chromium - quartzdrills[3];
      oil = oil - quartzdrills[4];
      quartzdrills[3] = Math.ceil(quartzdrills[3] * 1.15);
      quartzdrills[4] = Math.ceil(quartzdrills[4] * 1.15);
      quartzdrills[0] = quartzdrills[0] + 1;
      document.getElementById('quartzdrillbtn').innerHTML = 'Quartz Drill(' + quartzdrills[0] + ')';
    }
  }
}

function launchRockets() {
  land = land + rockets[0];
  science = science + rockets[0];
  explorations = explorations + rockets[0];
  rockets[0] = 0;
  document.getElementById('science-text').innerHTML = 'Science:' + science;
  document.getElementById('land-text').innerHTML = 'Land:' + land;
  document.getElementById('rocketbtn').innerHTML = 'Rocket(' + rockets[0] + ')';
}

function showAbout() {
  $('#aboutDiv').toggle();
}


}
