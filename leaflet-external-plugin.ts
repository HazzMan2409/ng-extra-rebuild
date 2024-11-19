import { Plugin } from "esbuild";

/**
 * Whenever we try to load Leaflet; do not load it, replace it with the global L.
 */
const leafletExternalPlugin: Plugin = {
    name: "leaflet-external-plugin",
    async setup(build) {
        build.onResolve({ filter: /^leaflet$/ }, (args) => {
            return {
                path: args.path,
                namespace: "leaflet-external-plugin"
            };
        });

        build.onLoad({ filter: /.*/, namespace: "leaflet-external-plugin" }, () => {
            return { contents: "module.exports = L;" };
        });
    }
};

export default leafletExternalPlugin;
