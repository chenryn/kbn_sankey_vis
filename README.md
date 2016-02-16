# Kibana Sankey Diagram Plugin

This is a sankey diagram visType plugin for Kibana 4.3+.

This plugin was developped from <https://github.com/elastic/kibana/pull/4832>.

![](https://cloud.githubusercontent.com/assets/1219655/9702343/081607e6-548b-11e5-81cb-4523c8c9225d.png)

# Install

```
git clone https://github.com/chenryn/kbn_sankey_vis.git
cd kbn_sankey_vis
npm install
npm run build
cp -R build/kbn_sankey_vis KIBANA_FOLDER_PATH/installedPlugins/
```

# Uninstall

```
bin/kibana plugin  --remove kbn_sankey_vis
```
