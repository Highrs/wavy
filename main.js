'use strict';
const renderer = require('onml/renderer.js');
const tt = require('onml/tt.js');
const getSvg = require('./get-svg.js');
const skin = require('./skin.js');

console.log('Giant alien spiders are no joke!');

let displayWidth = 800;
let displayHeight = 40;

const waveMaker = (waveIn) => {
  return getSvg({w:displayWidth, h:displayHeight}).concat([
    ['g', {}, drawer(complicator(waveIn))]
  ]);
};

const complicator = (waveIn) => {
  let complicatedWave = [];
  let waveElementCoutner = 0;

  console.log(waveIn.wave);

  for (let i = 0; i <= waveIn.wave.length; i++) {
    let baseWaveElement = waveIn.wave[i];
    let startType = '';
    let endType = '';
    if (
      (i === waveIn.wave.length)
    ) {
      endElement(complicatedWave[waveElementCoutner], 'end2E');
      waveElementCoutner++;
    } else {
      switch(baseWaveElement) {
        case '0':
        case '1':

          break;
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          if (i !== 0) {
            endElement(complicatedWave[waveElementCoutner], 'end22');
            waveElementCoutner++;
          }
          i === 0 ? startType = 'startS2' : startType = 'start22';
          startNew(complicatedWave, waveElementCoutner, startType, baseWaveElement);
          break;
        case '.': extendLast(complicatedWave[waveElementCoutner]); break;
        default: console.log('ERROR: No such case in complicator()');
      }
    }

  }

  console.log(complicatedWave);
  return complicatedWave;
};

const startNew = (complicatedWave, waveElementCoutner, startType, waveType) => {
  let horizontalShift =
    complicatedWave[waveElementCoutner - 1] ?
    complicatedWave[waveElementCoutner - 1].hshift + complicatedWave[waveElementCoutner - 1].leng :
    0;

  complicatedWave.push({
    type: ((waveType === 1 | waveType === 0) ? 0 : 2),
    fill: ((waveType === 1 | waveType === 0) ? 'none' : waveType),
    start: startType,
    end: 'none',
    leng: 1,
    hshift: horizontalShift
  });
};

const extendLast = (complicatedWaveElemet) => {
  complicatedWaveElemet.leng++;
};

const endElement = (complicatedWaveElemet, endType) => {
  // complicatedWaveElemet.leng++;
  complicatedWaveElemet.end = endType;
};

const drawer = (complicatedWave) => {

  let line = ['g', tt(10, 20)];

  let grid = ['g', {}];
  for (let i = 0; i < displayWidth; i = i + 20 ) {
    grid.push(['path', {d: skin.vertLine(i), class: 'grid'}]);
  }


  let multiplier = 20;
  let drawnWave = ['g', {}];

  complicatedWave.map(e => {
    // console.log(skin[e.start]() + skin[e.end]());
    drawnWave.push(
      ['path', {d: ( skin[e.start]((e.hshift) * multiplier) + skin[e.end]((e.hshift + e.leng) * multiplier) ), class: 'base'}]
    );
  });

  line.push(drawnWave, grid);

  return line;
};

const main = () => {
  let waveIn = {
    wave: '22...2......6....5...2.......',
    leng: 200,
    num: 10,
    per: 20
  };
  renderer( document.getElementById('content') )( waveMaker(waveIn) );
};

window.onload = main;
