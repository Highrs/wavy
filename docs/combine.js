(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = cfg => {
  cfg = cfg || {};
  cfg.w = cfg.w || 880;
  cfg.h = cfg.h || 256;
  return ['svg', {
   xmlns: 'http://www.w3.org/2000/svg',
    width: cfg.w + 1,
    height: cfg.h + 1,
    viewBox: [0, 0, cfg.w + 1, cfg.h + 1].join(' '),
    class: 'panel'
  }];
}

},{}],2:[function(require,module,exports){
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

},{"./get-svg.js":1,"./skin.js":6,"onml/renderer.js":3,"onml/tt.js":5}],3:[function(require,module,exports){
'use strict';

const stringify = require('./stringify.js');

const renderer = root => {
  const content = (typeof root === 'string')
    ? document.getElementById(root)
    : root;

  return ml => {
    let str;
    try {
      str = stringify(ml);
      content.innerHTML = str;
    } catch (err) {
      console.log(ml);
    }
  };
};

module.exports = renderer;

/* eslint-env browser */

},{"./stringify.js":4}],4:[function(require,module,exports){
'use strict';

const isObject = o => o && Object.prototype.toString.call(o) === '[object Object]';

function indenter (indentation) {
  if (!(indentation > 0)) {
    return txt => txt;
  }
  var space = ' '.repeat(indentation);
  return txt => {

    if (typeof txt !== 'string') {
      return txt;
    }

    const arr = txt.split('\n');

    if (arr.length === 1) {
      return space + txt;
    }

    return arr
      .map(e => (e.trim() === '') ? e : space + e)
      .join('\n');
  };
}

const clean = txt => txt
  .split('\n')
  .filter(e => e.trim() !== '')
  .join('\n');

function stringify (a, indentation) {
  const cr = (indentation > 0) ? '\n' : '';
  const indent = indenter(indentation);

  function rec(a) {
    let body = '';
    let isFlat = true;

    let res;
    const isEmpty = a.some((e, i, arr) => {
      if (i === 0) {
        res = '<' + e;
        return (arr.length === 1);
      }

      if (i === 1) {
        if (isObject(e)) {
          Object.keys(e).map(key => {
            let val = e[key];
            if (Array.isArray(val)) {
              val = val.join(' ');
            }
            res += ' ' + key + '="' + val + '"';
          });
          if (arr.length === 2) {
            return true;
          }
          res += '>';
          return;
        }
        res += '>';
      }

      switch (typeof e) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'undefined':
        body += e + cr;
        return;
      }

      isFlat = false;
      body += rec(e);
    });

    if (isEmpty) {
      return res + '/>' + cr; // short form
    }

    return isFlat
      ? res + clean(body) + '</' + a[0] + '>' + cr
      : res + cr + indent(body) + '</' + a[0] + '>' + cr;
  }

  return rec(a);
}

module.exports = stringify;

},{}],5:[function(require,module,exports){
'use strict';

module.exports = (x, y, obj) => {
  let objt = {};
  if (x || y) {
    const tt = [x || 0].concat(y ? [y] : []);
    objt = {transform: 'translate(' + tt.join(',') + ')'};
  }
  obj = (typeof obj === 'object') ? obj : {};
  return Object.assign(objt, obj);
};

},{}],6:[function(require,module,exports){
module.exports = {

  vertLine: (hShift = 0) => {
    return 'M ' + hShift +', 15 L ' + hShift +', -15';
  },

  start00: (hShift = 0) => {
    return 'M '+(hShift)+', 10 L ';
  },

  start11: (hShift = 0) => {
    return 'M '+(hShift)+', -10 L ';
  },

  start01: (hShift = 0) => {
    return 'M '+(hShift)+', 10 L '+(hShift+10)+', -10 L';
  },

  start10: (hShift = 0) => {
    return 'M '+(hShift)+', -10 L '+(hShift+10)+', 10 L';
  },

  end00: (hShift = 0) => {
    return (hShift)+', 10';
  },

  end11: (hShift = 0) => {
    return (hShift)+', -10';
  },

  start02: (hShift = 0) => {
    return 'M '+(hShift)+', 10 L '+(hShift+10)+', -10 L';
  },

  start12: (hShift = 0) => {
    return 'M '+(hShift+10)+', 10 L '+(hShift)+', -10 L';
  },

  startS2: (hShift = 0) => {
    return 'M '+(hShift)+', 10 L '+(hShift)+', -10 L';
  },

  start22: (hShift = 0) => {
    return 'M '+(10+hShift)+', 10 L '+(5+hShift)+', 0 L '+(10+hShift)+', -10 L';
  },

  end20: (hShift = 0) => {
    return ' '+(hShift)+', -10 L '+(hShift+10)+', 10 Z';
  },

  end21: (hShift = 0) => {
    return ' '+(hShift+10)+', -10 L '+(hShift)+', 10 Z';
  },

  end22: (hShift = 0) => {
    return ' '+(hShift)+', -10 L '+(5+hShift)+', 0 L '+(hShift)+', 10 Z';
  },

  end2E: (hShift = 0) => {
    return ' '+(hShift)+', -10 L '+(hShift)+', 10 Z';
  }

  // m -66,276 -40,8 m -23,-9 -25,-0 -11,-21 12,-22 81,-2
};

},{}]},{},[2]);
