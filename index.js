export default function (kibana) {

        return new kibana.Plugin({
                uiExports: {
                        visTypes: [
                                'plugins/kbn_sankey_vis/kbn_sankey_vis'
                ]
        }
        });
};

