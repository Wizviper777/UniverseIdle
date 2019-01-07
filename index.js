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
var chromium = 0;
var power = 0;
var land = 30;
var explorations = 0;
var timeconstant = 10;
var powerText = document.getElementById('power-text');
//Follow rule of [amount, production, *fuel*, price]
var mines = [2, 1, 10];
var refineries = [1, 1, -1, 15];
var panels = [1, 1, 20];
var pumpjacks = [0, 1, 250];
var generators = [0, 2, -1, 100];
var rockets = [0, 250, 200];
var castingfurnaces = [0, 1, -1, 500, 350];
var heatingplants = [0, 1, -1, 300, 750];
setInterval(updateResources, 100);
document.getElementById('aboutButton').addEventListener('click', showAbout);
document.getElementById('closeAbout').addEventListener('click', showAbout);
document.getElementById('refinerybtn').addEventListener('click', function () { buyBuilding('refinery') });
document.getElementById('minebtn').addEventListener('click', function () { buyBuilding('mine') });
document.getElementById('panelbtn').addEventListener('click', function () { buyBuilding('panel') });
document.getElementById('pumpjackbtn').addEventListener('click', function () { buyBuilding('pumpjack') });
document.getElementById('generatorbtn').addEventListener('click', function () { buyBuilding('generator') });
document.getElementById('rocketbtn').addEventListener('click', function () { buyBuilding('rocket') });
document.getElementById('launchrocketbtn').addEventListener('click', function () { launchRockets() });
document.getElementById('castingfurnacebtn').addEventListener('click', function () { buyBuilding('castingfurnace') });

document.getElementById('asteroidbtn').addEventListener('click', function () { setScene('asteroid') });
document.getElementById('spacebtn').addEventListener('click', function () { setScene('space') });
document.getElementById('sciencebtn').addEventListener('click', function () { setScene('science') });

document.getElementById('iceplanetExploration').addEventListener('click', function () { explorePlanet('ice') });


function setScene(scene) {
  if (scene == 'asteroid') {
    document.getElementById('space-hub').style.display = 'none';
    document.getElementById('science-hub').style.display = 'none';
    document.getElementById('asteroid-hub').style.display = 'block';
  }

  if (scene == 'space') {
    document.getElementById('asteroid-hub').style.display = 'none';
    document.getElementById('science-hub').style.display = 'none';
    document.getElementById('space-hub').style.display = 'block';
  }

  if (scene == 'science') {
    document.getElementById('asteroid-hub').style.display = 'none';
    document.getElementById('space-hub').style.display = 'none';
    document.getElementById('science-hub').style.display = 'block';
  }
}


function explorePlanet(planet) {
  if (planet == 'ice') {
    if (rockets[0] >= 20) {
      rockets[0] = rockets[0] - 20;
      document.getElementById('rocketbtn').innerHTML = 'Rocket(' + rockets[0] + ')';
      setTimeout(setTimeout(function () {
        document.getElementById('iceplanetExploration').style.display = 'none';
        unlockFeature('heatingplant');
      }, 60000));
    }
  }
}

function unlockFeature(feature) {
  if (feature == 'heatingplant') {
    document.getElementById('heatingplantbtn').style.display = 'inline-block';
  }
}


function updateResources() {
  power = (panels[0] * panels[1]) + (refineries[0] * -1);
  if (oil == 0) {
    power = power + (pumpjacks[0] * generators[1]);
  }
  else {
    power = power + (generators[0] * generators[1]);
  }
  powerText.innerHTML = 'Power: ' + power;
  if (power < 0) {
    timeconstant = 10 + (Math.abs(power) * 5);
  }
  else if (power >= 0) {
    timeconstant = 10;
  }


  ore = ore + (((mines[0] * mines[1]) + (refineries[0] * refineries[2])) / timeconstant);
  if (ore < 0) { ore = 0; }
  oreText.innerHTML = 'Ore: ' + Math.floor(ore);
  if (ore == 0) {
    metal = metal + ((mines[0] * mines[1]) / timeconstant);
    metalText.innerHTML = 'Metal:' + Math.floor(metal);
  }
  else {
    metal = metal + ((refineries[0] * refineries[1]) / timeconstant);
    metalText.innerHTML = 'Metal:' + Math.floor(metal);
  }
  oil = oil + ((pumpjacks[0] * pumpjacks[1] / timeconstant));
  oil = oil + ((generators[0] * generators[2] / timeconstant));
  if (oil < 0) { oil = 0; }
  oilText.innerHTML = 'Oil:' + Math.floor(oil);
}


function buyBuilding(building) {
  if (building == 'refinery') {
    if (ore >= refineries[3]) {
      ore = ore - refineries[3];
      refineries[0] = refineries[0] + 1;
      refineries[3] = Math.ceil(refineries[3] * 1.15);
      document.getElementById('refinerybtn').innerHTML = 'Refinery(' + refineries[0] + ')';
    }
  }
  if (building == 'mine') {
    if (metal >= mines[2]) {
      metal = metal - mines[2];
      mines[0] = mines[0] + 1;
      mines[2] = Math.ceil(mines[2] * 1.15);
      document.getElementById('minebtn').innerHTML = 'Mine(' + mines[0] + ')';
    }
  }
  if (building == 'panel') {
    if (metal >= panels[2]) {
      metal = metal - panels[2];
      panels[0] = panels[0] + 1;
      panels[2] = Math.ceil(panels[2] * 1.15);
      document.getElementById('panelbtn').innerHTML = 'Panel(' + panels[0] + ')';
    }
  }
  if (building == 'pumpjack') {
    if (metal >= pumpjacks[2]) {
      metal = metal - pumpjacks[2];
      pumpjacks[0] = pumpjacks[0] + 1;
      pumpjacks[2] = Math.ceil(pumpjacks[2] * 1.15);
      document.getElementById('pumpjackbtn').innerHTML = 'Pumpjack(' + pumpjacks[0] + ')';
    }
  }
  if (building == 'generator') {
    if (metal >= generators[3]) {
      metal = metal - generators[3];
      generators[0] = generators[0] + 1;
      generators[3] = Math.ceil(generators[3] * 1.15);
      document.getElementById('generatorbtn').innerHTML = 'Generator(' + generators[0] + ')';
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
  if (building == 'castingfurnace') {
    if (ore >= castingfurnaces[3] && oil >= castingfurnaces[4]) {
      ore = ore - castingfurnaces[3];
      oil = oil - castingfurnaces[4];
      castingfurnaces[3] = Math.ceil(castingfurnaces[3] * 1.15);
      castingfurnaces[4] = Math.ceil(castingfurnaces[4] * 1.15);
      castingfurnaces[0] = castingfurnaces[0] + 1;
      document.getElementById('castingfurnacebtn').innerHTML = 'Casting Furnace(' + castingfurnaces[0] + ')';
    }
  }
}

function launchRockets() {
  land = land + rockets[0];
  rockets[0] = 0;
  explorations++;
  document.getElementById('land-text').innerHTML = 'Land:' + land;
  document.getElementById('rocketbtn').innerHTML = 'Rocket(' + rockets[0] + ')';
}

function showAbout() {
  $('#aboutDiv').toggle();
}

