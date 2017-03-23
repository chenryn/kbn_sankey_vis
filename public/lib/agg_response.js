import _ from 'lodash';
import arrayToLinkedList from 'ui/agg_response/hierarchical/_array_to_linked_list';

module.exports = function sankeyProvider(Private, Notifier) {

  let notify = new Notifier({
    location: 'Sankey chart response converter'
  });

  let nodes = {};
  let links = {};
  let lastNode = -1;

  function processEntry(aggConfig, metric, aggData, prevNode) {
    _.each(aggData.buckets, function (b) {
      if (isNaN(nodes[b.key])) {
        nodes[b.key] = lastNode + 1;
        lastNode = _.max(_.values(nodes));
      }
      if (aggConfig._previous) {
        var k = prevNode + 'sankeysplitchar' + nodes[b.key];
        if (isNaN(links[k])) {
          links[k] = metric.getValue(b);
        } else {
          links[k] += metric.getValue(b);
        }
      }
      if (aggConfig._next) {
        processEntry(aggConfig._next, metric, b[aggConfig._next.id], nodes[b.key]);
      }
    });
  }

  return function (vis, resp) {

    let metric = vis.aggs.bySchemaGroup.metrics[0];
    let buckets = vis.aggs.bySchemaGroup.buckets;
    buckets = arrayToLinkedList(buckets);
    if (!buckets) {
      return {
        'slices': {
          'nodes': [],
          'links': []
        }
      };
    }

    let firstAgg = buckets[0];
    let aggData = resp.aggregations[firstAgg.id];

    if (!firstAgg._next) {
      notify.error('need more than one sub aggs');
    }

    nodes = {};
    links = {};
    lastNode = -1;

    processEntry(firstAgg, metric, aggData, -1);

    let invertNodes = _.invert(nodes);
    let chart = {
      'slices': {
        'nodes': _.map(_.keys(invertNodes), function (k) {
          return {
            'name': invertNodes[k]
          };
        }),
        'links': _.map(_.keys(links), function (k) {
          let s = k.split('sankeysplitchar');
          return {
            'source': parseInt(s[0]),
            'target': parseInt(s[1]),
            'value': links[k]
          };
        })
      }
    };

    return chart;
  };
};
