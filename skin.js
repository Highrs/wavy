module.exports = {

  vertLine: (hShift = 0) => {
    return 'M ' + hShift +', 15 L ' + hShift +', -15';
  },

  start00: (hShift = 0) => {},
  start01: (hShift = 0) => {},
  start10: (hShift = 0) => {},
  start11: (hShift = 0) => {},
  start02: (hShift = 0) => {
    return 'M 0, -10 L 5, 10';
  },
  start12: (hShift = 0) => {

  },

  startS2: (hShift = 0) => {
    return 'M '+(hShift)+', -10 L '+(hShift)+', 10';
  },

  start22: (hShift = 0) => {
    return 'M '+(10+hShift)+', -10 L '+(5+hShift)+', 0 L '+(10+hShift)+', 10 L';
  },

  end22: (hShift = 0) => {
    return ' '+(hShift)+', 10 L '+(5+hShift)+', 0 L '+(hShift)+', -10 Z';
  },

  end2E: (hShift = 0) => {
    return ' '+(hShift)+', 10 L '+(hShift)+', -10 Z';
  }

};
