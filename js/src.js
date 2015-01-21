var require = (function (r) {
    "use strict";
    r = r || {};
    var

    root = this,
    end = '.js',
    protocol = root.location ? (root.location.protocol === 'file:' ? 'http:' : '') : '',
    //
    // Function which process the configuration object
    process = function (cfg) {
        var
        base = cfg.baseUrl || '',
        min = cfg.minify ? '.min' : '',
        libs = {
            "angular": "//ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular",
            "angular-animate": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-animate",
            "angular-mocks": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-mocks.js",
            "angular-route": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-route",
            "angular-sanitize": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-sanitize",
            "angular-strap": "//cdnjs.cloudflare.com/ajax/libs/angular-strap/2.1.4/angular-strap",
            "angular-ui-router": "//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.11/angular-ui-router",
            "angular-ui-grid": "http://ui-grid.info/release/ui-grid-unstable",
            "aws": "//sdk.amazonaws.com/js/aws-sdk-2.0.0-rc13",
            "bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap",
            "codemirror": "//cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/codemirror",
            "c3": "//cdnjs.cloudflare.com/ajax/libs/c3/0.3.0/c3",
            "crossfilter": "//cdnjs.cloudflare.com/ajax/libs/crossfilter/1.3.11/crossfilter",
            "d3": "//cdnjs.cloudflare.com/ajax/libs/d3/3.5.1/d3",
            "google-analytics": "//www.google-analytics.com/analytics.js",
            "gridster": "//cdnjs.cloudflare.com/ajax/libs/jquery.gridster/0.5.6/jquery.gridster",
            "holder": "//cdnjs.cloudflare.com/ajax/libs/holder/2.3.1/holder",
            "highlight": "//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.3/highlight.min.js",
            "katex": "//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.1.0/katex.min.js",
            "jquery": "//code.jquery.com/jquery-1.11.1",
            "leaflet": "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js",
            "lodash": "//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash",
            "marked": "//cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked",
            "mathjax": "//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML",
            "mustache": "//cdnjs.cloudflare.com/ajax/libs/mustache.js/0.8.1/mustache",
            "restangular": "//cdnjs.cloudflare.com/ajax/libs/restangular/1.4.0/restangular",
            "select": "//cdnjs.cloudflare.com/ajax/libs/select2/3.4.5/select2",
            "sockjs": "//cdnjs.cloudflare.com/ajax/libs/sockjs-client/0.3.4/sockjs",
            "stats": "//cdnjs.cloudflare.com/ajax/libs/stats.js/r11/Stats",
            "typeahead": "//cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.10.4/typeahead.bundle",
            "topojson": "http://d3js.org/topojson.v1",
            "trianglify": "//cdnjs.cloudflare.com/ajax/libs/trianglify/0.1.5/trianglify"
        };
        //
        cfg.shim = {
            angular: {
                exports: "angular"
            },
            "jquery-form": {
                deps: ["jquery"]
            },
            "jquery-cookies": {
                deps: ["jquery"]
            },
            "google-analytics": {
                exports: root.GoogleAnalyticsObject || "ga"
            },
            gridster: {
                deps: ["jquery"]
            },
            highlight: {
                exports: "hljs"
            },
            restangular: {
                deps: ["angular"]
            },
            select: {
                deps: ["jquery"]
            },
            bootstrap: {
                deps: ["jquery"]
            },
            nvd3: {
                deps: ["d3"]
            },
            crossfilter: {
                exports: "crossfilter"
            },
            c3: {
                deps: ["d3"]
            },
            typeahead: {
                deps: ["jquery"]
            },
            trianglify: {
                deps: ["d3"],
                exports: "Trianglify"
            },
            mathjax: {
                exports: "MathJax"
            }
        };
        //
        cfg.min = function (deps) {
            var all = [],
                self = this,
                min = this.minify ? '.min' : '';
            if (deps)
                deps.forEach(function (dep) {
                    if (!self.paths[dep] && dep.substring(dep.length-3) !== end)
                        dep += min;
                    all.push(dep);
                });
            return all;
        };

        // Add paths in require object
        if (cfg.paths) {
            for(var name in cfg.paths) {
                if(cfg.paths.hasOwnProperty(name))
                    libs[name] = cfg.paths[name];
            }
        }

        cfg.paths = (function () {
            var all = {};
            for(var name in libs) {
                if(libs.hasOwnProperty(name)) {
                    var path = libs[name];
                    if (!cfg.shim[name]) {
                        // Add angular dependency
                        if (name.substring(0, 8) === "angular-" && !cfg.shim[name]) {
                            cfg.shim[name] = {
                                deps: ["angular"]
                            };
                        // Add d3 dependency
                        } else if (name.substring(0, 4) === "d3-") {
                            cfg.shim[name] = {
                                deps: ["d3"]
                            };
                        }
                    }
                    if (typeof(path) !== 'string') {
                        // Don't maanipulate it, live it as it is
                        path = path.url;
                    } else {
                        var params = path.split('?');
                        if (params.length === 2) {
                            path = params[0];
                            params = params[1];
                        } else
                            params = '';
                        if (path.substring(path.length-3) !== end)
                            path += min;
                        if (params) {
                            if (path.substring(path.length-3) !== end)
                                path += end;
                            path += '?' + params;
                        }
                        if (path.substring(0, 2) === '//')
                            path = protocol + path;
                        if (path.substring(path.length-3) === end)
                            path = path.substring(0, path.length-3);
                    }
                    all[name] = path;
                }
            }
            return all;
        }());

        cfg.process = process;
        cfg.deps = cfg.min(cfg.deps);

        return cfg;
    };

    //
    this.rcfg = process(r);
    return this.rcfg;

}.call(this, require));