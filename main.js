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
  let waveElementCoutner = -1;

  console.log(waveIn.wave);

  //initial sequencing
  for (let i = 0; i < waveIn.wave.length; i++) {
    // console.log('First loop ' + i + ' ' + waveIn.wave[i] + ' ' + waveElementCoutner);
    let baseWaveElement = waveIn.wave[i];
    switch (baseWaveElement) {
      case '.':
        extend(complicatedWave[waveElementCoutner]);
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        // console.log('here');
        createNew(
          complicatedWave,
          complicatedWave[waveElementCoutner] ?
            complicatedWave[waveElementCoutner].leng +
              complicatedWave[waveElementCoutner].hshift :
            0,
          baseWaveElement
        );
        waveElementCoutner++;
        break;
      default: console.log('ERROR in first loop of complicator.');
    }
  }

  //start/end definer
  for (let i = 0; i < complicatedWave.length; i++) {
    let waveElement = complicatedWave[i];
    let waveStart = 'start';
    let waveEnd = 'end';
    switch(i) {
      case 0:
        switch(waveElement.type) {
          case '2':
            waveStart += 'S2';
            waveEnd += waveElement.type + complicatedWave[i+1].type;
            break;
          default:
            waveStart += waveElement.type + waveElement.type;
            waveEnd += waveElement.type + waveElement.type;
        }
        break;
      case complicatedWave.length - 1:
        waveStart += complicatedWave[i-1].type + waveElement.type;
        switch(waveElement.type) {
          case '2':
            waveEnd += '2E';
            break;
          default:
            waveEnd += waveElement.type + waveElement.type;
        }
        break;
      default:
        waveStart +=
          complicatedWave[i-1].type === '2' && complicatedWave[i].type !== '2' ?
          waveElement.type + waveElement.type :
          complicatedWave[i-1].type + waveElement.type;
        switch(complicatedWave[i].type){
          case '2':
            waveEnd += waveElement.type + complicatedWave[i+1].type;
            break;
          default:
            waveEnd += waveElement.type + waveElement.type;
        }

    }

    complicatedWave[i].start = waveStart;
    complicatedWave[i].end = waveEnd;
  }

  console.log(complicatedWave);
  return complicatedWave;
};

const createNew = (complicatedWave, horizontalShift, waveType) => {

  complicatedWave.push({
    type: ((waveType === '1' | waveType === '0') ? waveType : '2'),
    fill: waveType,
    start: '',
    end: '',
    leng: 1,
    hshift: horizontalShift
  });
};

const extend = (complicatedWaveElemet) => {
  complicatedWaveElemet.leng++;
};

const drawer = (complicatedWave) => {
  let multiplier = 20;

  let line = ['g', tt(10, 20)];

  let grid = ['g', {}];
  for (let i = 0; i < displayWidth; i = i + multiplier ) {
    grid.push(['path', {d: skin.vertLine(i), class: 'grid'}]);
  }

  let drawnWave = ['g', {}];


  complicatedWave.map(e => {
    let baseClass = 'base';
    let fillClass = '';
    switch(e.fill){
      case '3': fillClass = 'Yellow'; break;
      case '4': fillClass = 'Orange'; break;
      case '5': fillClass = 'Blue';   break;
      case '6': fillClass = 'Cyan';   break;
      case '7': fillClass = 'Green';  break;
      case '8': fillClass = 'Purple'; break;
      case '9': fillClass = 'Pink';   break;
    }

    drawnWave.push(
      ['path', {d: ( skin[e.start]((e.hshift) * multiplier) + skin[e.end]((e.hshift + e.leng) * multiplier) ), class: baseClass + fillClass}]
    );
  });

  line.push(drawnWave, grid);

  return line;
};

const main = () => {
  let waveIn = {
    wave: '22.0..1.0.3.1.0.1.1.4.5...6.0.0.7.8..9.',
    leng: 200,
    num: 10,
    per: 20
  };
  renderer( document.getElementById('content') )( waveMaker(waveIn) );
};

window.onload = main;
