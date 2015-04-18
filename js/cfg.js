var require = (function (r) {
    r = r || {};

    function extend (o1, o2) {
        if (o2) {
            for (var key in o2) {
                if (o2.hasOwnProperty(key))
                    o1[key] = o2[key];
            }
        }
        return o1;
    }

    var

    root = this,

    end = '.js',

    protocol = root.location ? (root.location.protocol === 'file:' ? 'http:' : '') : '',

    defaultShims = function () {
        return {
            angular: {
                exports: "angular"
            },
            "google-analytics": {
                exports: root.GoogleAnalyticsObject || "ga"
            },
            highlight: {
                exports: "hljs"
            },
            restangular: {
                deps: ["angular"]
            },
            crossfilter: {
                exports: "crossfilter"
            },
            trianglify: {
                deps: ["d3"],
                exports: "Trianglify"
            },
            mathjax: {
                exports: "MathJax"
            }
        };
    },

    // Function which process the configuration object
    process = function (cfg) {
        var

        base = cfg.baseUrl || '',

        min = cfg.minify ? '.min' : '',

        cfg.shim = extend(defaultShims(), cfg.shim);
        //
        // Function for adding the min suffix to paths
        cfg.min = function (deps) {
            var all = [],
                min = cfg.minify ? '.min' : '';

            if (deps)
                deps.forEach(function (dep) {
                    if (!cfg.paths[dep] && dep.substring(dep.length-3) !== end)
                        dep += min;
                    all.push(dep);
                });
            return all;
        };
    };