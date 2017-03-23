# Kibana Sankey Diagram Plugin

This is a sankey diagram visType plugin for Kibana 5.X & 6.0.0-alpha1.

This plugin was developped from <https://github.com/elastic/kibana/pull/4832>.

![](https://github.com/WolfangAukang/kbn_sankey_vis/blob/master/Capture1.PNG)

# Install

```
git clone https://github.com/WolfangAukang/kbn_sankey_vis.git
cd kbn_sankey_vis
npm install
```

After that, change the ```package.json``` file version to the one you have installed.

**Note that in NTFS file systems, file paths that exceed 260 characters will fail with cp, you have to use ROBOCOPY:**

```
robocopy /S build/kbn_sankey_vis KIBANA_FOLDER_PATH/installedPlugins/kbn_sankey_vis
```

**Also note that if npm run build fails, with a rsync.js error, it is likelly that you don't have RSYNC.EXE installed in your system, and also that you don't have it on your PATH environment variable.**

Install it from https://www.itefix.net/cwrsync and run:

```
set PATH=%PATH%;{rsync installation directory}\bin
```

# Uninstall

```
bin/kibana plugin  --remove kbn_sankey_vis
```
