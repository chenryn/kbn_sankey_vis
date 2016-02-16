define(function (require) {
  require('ui/agg_table');
  require('ui/agg_table/agg_table_group');

  require('plugins/kbn_sankey_vis/kbn_sankey_vis.less');
  require('plugins/kbn_sankey_vis/kbn_sankey_vis_controller');

  require('ui/registry/vis_types').register(KbnSankeyVisProvider);

  function KbnSankeyVisProvider(Private) {
    var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    var Schemas = Private(require('ui/Vis/Schemas'));

    return new TemplateVisType({
      name: 'kbn_sankey',
      title: 'Sankey Diagram',
      icon: 'fa-random',
      description: 'Sankey charts are ideal for displaying the material, energy and cost flows.',
      template: require('plugins/kbn_sankey_vis/kbn_sankey_vis.html'),
      params: {
        defaults: {
          showMetricsAtAllLevels: false
        },
        editor: '<vislib-basic-options></vislib-basic-options>'
      },
      hierarchicalData: function (vis) {
        return Boolean(vis.params.showPartialRows || vis.params.showMetricsAtAllLevels);
      },
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Split Size',
          min: 1,
          max: 1,
          defaults: [
            {type: 'count', schema: 'metric'}
          ]
        },
        {
          group: 'buckets',
          name: 'segment',
          title: 'Split Slices',
          aggFilter: '!geohash_grid',
          min: 0,
          max: Infinity
        }
      ]),
      requiresSearch: true
    });
  }

  // export the provider so that the visType can be required with Private()
  return KbnSankeyVisProvider;
});
