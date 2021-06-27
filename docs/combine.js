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

const waveMaker = (waveIn) => {
  return getSvg({w:800, h:100}).concat([
    ['g', {}, drawer(complicator(waveIn))]
  ]);
};

const complicator = (waveIn) => {
  let complicatedWave = [];
  let waveElementCoutner = 0;

  console.log(waveIn.wave);

  for (let i = 0; i < waveIn.wave.length; i++) {
    let baseWaveElement = waveIn.wave[i];
    if (
      (i === waveIn.wave.length - 1)
    ) {
      endElement(complicatedWave[waveElementCoutner], 'end1');
      complicatedWave[waveElementCoutner].leng++;
      waveElementCoutner++;
    } else
    switch(baseWaveElement) {
      case '2':
        if (i !== 0) {
          endElement(complicatedWave[waveElementCoutner], 'end1');
          waveElementCoutner++;
        }
        startNew(complicatedWave, waveElementCoutner, 'start1', '2');
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

  // type: 2,
  // start: 'start1',
  // fill: 'none',
  // end: 'end1',
  // leng: 5,
  // hshift: 0

  return drawnWave;
};

const main = () => {
  let waveIn = {
    wave: '2...2.....2.......................2......2........',
    leng: 200,
    num: 10,
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
  start1: (hShift = 0) => {
    return 'M '+(5+hShift)+', -10 L '+(hShift)+', 0 L '+(5+hShift)+', 10 L';
  },

  end1: (hShift = 0) => {
    return ' '+(hShift-5)+', 10 L '+(5+hShift-5)+', 0 L '+(hShift-5)+', -10 Z';
  }

};

},{}]},{},[2]);
