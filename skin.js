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
