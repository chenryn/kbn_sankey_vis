import 'ui/agg_table';
import 'ui/agg_table/agg_table_group';

import 'plugins/kbn_sankey_vis/kbn_sankey_vis.less';
import 'plugins/kbn_sankey_vis/kbn_sankey_vis_controller';

import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import SankeyVisTemplate from 'plugins/kbn_sankey_vis/kbn_sankey_vis.html';

require('ui/registry/vis_types').register(SankeyVisProvider);

function SankeyVisProvider(Private) {
  const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
  const Schemas = Private(VisSchemasProvider);
  return new TemplateVisType({
    name: 'kbn_sankey',
    title: 'Sankey Diagram',
    icon: 'fa-random',
    description: 'Sankey charts are ideal for displaying the material, energy and cost flows.',
    template: SankeyVisTemplate,
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
};


