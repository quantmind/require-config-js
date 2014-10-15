var require = (function (r) {
    "use strict";
    r = r || {};
    var
    root = this,
    end = '.js',
    protocol = root.location ? (root.location.protocol === 'file:' ? 'http:' : '') : '',
    //
    process = function (cfg) {
        var
        base = cfg.baseUrl || '',
        min = cfg.minify ? '.min' : '',
        libs = {
            "angular": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular",
            "angular-animate": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-animate",
            "angular-mocks": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-mocks.js",
            "angular-route": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-route",
            "angular-sanitize": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-sanitize",
            "angular-strap": "//cdnjs.cloudflare.com/ajax/libs/angular-strap/2.1.1/angular-strap",
            "angular-ui-router": "//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.10/angular-ui-router",
            "angular-ui-grid": "http://ui-grid.info/release/ui-grid-unstable",
            "aws": "//sdk.amazonaws.com/js/aws-sdk-2.0.0-rc13",
            "bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap",
            "codemirror": "//cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/codemirror",
            "c3": "//cdnjs.cloudflare.com/ajax/libs/c3/0.3.0/c3",
            "d3": "//cdnjs.cloudflare.com/ajax/libs/d3/3.4.11/d3",
            "google-analytics": "//www.google-analytics.com/analytics.js",
            "gridster": "//cdnjs.cloudflare.com/ajax/libs/jquery.gridster/0.5.6/jquery.gridster",
            "holder": "//cdnjs.cloudflare.com/ajax/libs/holder/2.3.1/holder",
            "highlight": "//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.3/highlight.min.js",
            "katex": "//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.1.0/katex.min.js",
            "jquery": "//code.jquery.com/jquery-1.11.1",
            "leaflet": "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js",
            "marked": "//cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked",
            "mathjax": "//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML",
            "mustache": "//cdnjs.cloudflare.com/ajax/libs/mustache.js/0.8.1/mustache",
            "restangular": "//cdnjs.cloudflare.com/ajax/libs/restangular/1.4.0/restangular",
            "select": "//cdnjs.cloudflare.com/ajax/libs/select2/3.4.5/select2",
            "sockjs": "//cdnjs.cloudflare.com/ajax/libs/sockjs-client/0.3.4/sockjs",
            "typeahead": "//cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.10.4/typeahead.bundle",
            "topojson": "//cdnjs.cloudflare.com/ajax/libs/topojson/1.1.0/topojson.min.js"
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
            c3: {
                deps: ["d3"]
            },
            typeahead: {
                deps: ["jquery"]
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
                    // Add angular dependency
                    if (name.substring(0, 8) === "angular-" && !cfg.shim[name]) {
                        cfg.shim[name] = {
                            deps: ["angular"]
                        };
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
