module.exports = {
  start1: (hShift = 0) => {
    return 'M '+(5+hShift)+', -10 L '+(hShift)+', 0 L '+(5+hShift)+', 10 L';
  },

  end1: (hShift = 0) => {
    return ' '+(hShift-5)+', 10 L '+(5+hShift-5)+', 0 L '+(hShift-5)+', -10 Z';
  }

};
