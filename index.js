'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (kibana) {

  return new kibana.Plugin({

    uiExports: {
      visTypes: ['plugins/kbn_sankey_vis/kbn_sankey_vis']
    }
          
  });
};

;
module.exports = exports['default'];
