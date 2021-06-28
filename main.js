'use strict';
const renderer = require('onml/renderer.js');
const tt = require('onml/tt.js');
const getSvg = require('./get-svg.js');
const skin = require('./skin.js');

console.log('Giant alien spiders are no joke!');

const waveMaker = (waveIn) => {
  return getSvg({w:800, h:100}).concat([
    ['g', {}, drawer(complicator(waveIn))]
  ]);
};

const complicator = (waveIn) => {
  let complicatedWave = [];
  let waveElementCoutner = 0;

  console.log(waveIn.wave);

  for (let i = 0; i <= waveIn.wave.length; i++) {
    let baseWaveElement = waveIn.wave[i];
    if (
      (i === waveIn.wave.length)
    ) {
      endElement(complicatedWave[waveElementCoutner], 'end1');
      waveElementCoutner++;
    } else
    switch(baseWaveElement) {
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (i !== 0) {
          endElement(complicatedWave[waveElementCoutner], 'end1');
          waveElementCoutner++;
        }
        startNew(complicatedWave, waveElementCoutner, 'start1', baseWaveElement);
        break;
      case '.': extendLast(complicatedWave[waveElementCoutner]); break;
      default: console.log('ERROR: No such case in complicator()');
    }
  }

  console.log(complicatedWave);
  return complicatedWave;
};

const startNew = (complicatedWave, waveElementCoutner, startType, waveTtype) => {
  let horizontalShift =
    complicatedWave[waveElementCoutner - 1] ?
    complicatedWave[waveElementCoutner - 1].hshift + complicatedWave[waveElementCoutner - 1].leng :
    0;

  complicatedWave.push({
    type: waveTtype,
    start: startType,
    fill: 'none',
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

  let multiplier = 10;
  let drawnWave = ['g', tt(50, 50)];

  complicatedWave.map(e => {
    // console.log(skin[e.start]() + skin[e.end]());
    drawnWave.push(
      ['path', {d: ( skin[e.start]((e.hshift) * multiplier) + skin[e.end]((e.hshift + e.leng) * multiplier) ), class: 'base'}]
    );
  });

  return drawnWave;
};

const main = () => {
  let waveIn = {
    wave: '2..........2...6....5...2....',
    leng: 200,
    num: 10,
  };
  renderer( document.getElementById('content') )( waveMaker(waveIn) );
};

window.onload = main;
