var require = (function (r) {
    "use strict";
    r = r || {};
    //
    var processRequireConfig = r.processRequireConfig = function (require) {
        var base = require.baseUrl || '',
            end = '.js',
            min = require.minify ? '.min' : '',
            protocol = window.location.protocol === 'file:' ? 'http:' : '';

        var libs = {
            "angular": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular",
            "angular-animate": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular-animate",
            "angular-mocks": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular-mocks",
            "angular-route": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular-route",
            "angular-sanitize": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular-sanitize",
            "aws": "//sdk.amazonaws.com/js/aws-sdk-2.0.0-rc13",
            "bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap",
            "codemirror": "//cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/codemirror",
            "c3": "//cdnjs.cloudflare.com/ajax/libs/c3/0.3.0/c3",
            "d3": "//cdnjs.cloudflare.com/ajax/libs/d3/3.4.11/d3",
            "gridster": "//cdnjs.cloudflare.com/ajax/libs/jquery.gridster/0.2.1/jquery.gridster",
            "holder": "//cdnjs.cloudflare.com/ajax/libs/holder/2.3.1/holder",
            "highlight": "//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.2/highlight.min.js",
            "jquery": "//code.jquery.com/jquery-1.11.1",
            "leaflet": "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js",
            "marked": "//cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked",
            "mathjax": "//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML",
            "mustache": "//cdnjs.cloudflare.com/ajax/libs/mustache.js/0.7.2/mustache",
            "ui-router": "//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.10/angular-ui-router",
            "ui-grid": "http://ui-grid.info/release/ui-grid-unstable",
            "require": "//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.14/require",
            "restangular": "//cdnjs.cloudflare.com/ajax/libs/restangular/1.4.0/restangular",
            "select": "//cdnjs.cloudflare.com/ajax/libs/select2/3.4.5/select2",
            "showdown": "//cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min.js",
            "sockjs": "//cdnjs.cloudflare.com/ajax/libs/sockjs-client/0.3.4/sockjs",
            "typeahead": "//cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.9.2/typeahead",
            "topojson": "//cdnjs.cloudflare.com/ajax/libs/topojson/1.1.0/topojson.min.js",
            //
            // Local libraries
            "lux": base + "lux/lux",
            "d3ext": base + "d3ext/d3ext"
        },
        //
        shim = {
            angular: {
                exports: "angular"
            },
            "jquery-form": {
                deps: ["jquery"]
            },
            "jquery-cookies": {
                deps: ["jquery"]
            },
            highlight: {
                exports: "hljs"
            },
            select: {
                deps: ["jquery"]
            },
            bootstrap: {
                deps: ["jquery"]
            },
            "angular-route": {
                deps: ["angular"]
            },
            "angular-sanitize": {
                deps: ["angular"]
            },
            "ui-grid": {
                "deps": ["angular"]
            },
            "ui-router": {
                "deps": ["angular"]
            },
            nvd3: {
                deps: ["d3"]
            }
        };

        // Add paths in require object
        if (require.paths) {
            for(var name in require.paths) {
                if(require.paths.hasOwnProperty(name))
                    libs[name] = require.paths[name];
            }
        }

        function _minify () {
            var all = {};
            for(var name in libs) {
                if(libs.hasOwnProperty(name)) {
                    var path = libs[name];
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
        }

        function _minify_deps (deps) {
            var all = [];
            if (deps)
                deps.forEach(function (dep) {
                    if (!libs[dep] && dep.substring(dep.length-3) !== end)
                        dep += min;
                    all.push(dep);
                });
            return all;
        }

        require.paths = _minify();
        require.deps = _minify_deps(require.deps);
        require.shim = shim;

        return require;
    };

    return processRequireConfig(r);

}(require));
