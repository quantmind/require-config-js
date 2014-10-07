# Configuration script for requirejs

This script can be used in conjunction with [requirejs][] to setup
 suitable [configuration options](http://requirejs.org/docs/api.html#config).

 * [require.config.js](require.config.js)
 * [require.config.min.js](require.config.min.js)

By [Quantmind](http://quantmind.com)

<a href='https://github.com/quantmind/require-config-js'>
<i class='fa fa-github fa-5x'></i></a>

<a href="https://travis-ci.org/quantmind/require-config-js">
<img alt="Build Status" src="https://travis-ci.org/quantmind/require-config-js.svg?branch=gh-pages" style="max-width:100%;">
</a>

## Usage

Add a ``require`` variable before importing the script and ``requirejs``:

    <script>
    var require = {minify: true};
    </script>
    <script src='http://quantmind.github.io/require-config-js/require.config.min.js'></script>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.14/require.min.js'></script>


The ``require`` variable can be used to add additional paths and dependencies to the require config object.
If ``minify`` is ``true``, the script will include in the ``paths`` array the url of minified libraries if possible.

    var require = {
        minify: true,
        paths: {
            "angular": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular",
            "leaflet": "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js",
            'google-map': {"url": "https://maps.googleapis.com/maps/api/js?v=3.exp&key=&sensor=false"}
        }
    }

In this case ``angular`` url will be the minified one while both ``leaflet`` (ending with ``.js``)
and ``google-map`` (an object with ``url`` entry) are left unmodified. The require config object
created by the script should look like this

    require = {
        paths: {
            "angular": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular.min",
            "leaflet": "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js",
            'google-map': "https://maps.googleapis.com/maps/api/js?v=3.exp&key=&sensor=false",
            ...
        }
    }


[requirejs]: http://requirejs.org/ "Require JS"