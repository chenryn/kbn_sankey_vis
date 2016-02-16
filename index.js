module.exports = function (kibana) {
  return new kibana.Plugin({
    name: 'kbn_sankey_vis',
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      visTypes: [
        'plugins/kbn_sankey_vis/kbn_sankey_vis'
      ]
    }
  });
};

