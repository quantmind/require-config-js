# Configuration script for requirejs

This script can be used in conjunction with [requirejs][] to setup
 suitable [configuration options](http://requirejs.org/docs/api.html#config).

 * [require.config.js](require.config.js)
 * [require.config.min.js](require.config.min.js)

Usage:

    <script>
    var require = {minify: true};
    </script>
    <script src='http://quantmind.github.io/require-config-js/require.config.min.js'></script>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.14/require.min.js'></script>


The ``require`` variable can be used to add additional paths and dependencies to the require config object.
If ``minify`` is ``true``, the script will include in the ``paths`` array the url of minified libraries if possible.

By [Quantmind](http://quantmind.com)

<a href='https://github.com/quantmind/require-config-js'>
<i class='fa fa-github fa-5x'></i></a>

<a href="https://travis-ci.org/quantmind/require-config-js">
<img alt="Build Status" src="https://travis-ci.org/quantmind/require-config-js.svg?branch=gh-pages" style="max-width:100%;">
</a>

[requirejs]: http://requirejs.org/ "Require JS"