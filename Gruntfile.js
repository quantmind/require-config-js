/*jshint node: true */
/*global config:true, task:true, process:true*/
module.exports = function(grunt) {
    "use strict";
    var target = "require.config.js",
        target_min = target.replace('.js', '.min.js');
    //
    // js hint all libraries
    function jshint_libs () {
        var result = {
                gruntfile: "Gruntfile.js",
                options: {
                    browser: true,
                    expr: true,
                    globals: {
                        jQuery: true,
                        requirejs: true,
                        require: true,
                        exports: true,
                        console: true,
                        DOMParser: true,
                        Showdown: true,
                        prettyPrint: true,
                        module: true,
                        ok: true,
                        equal: true,
                        test: true,
                        asyncTest: true,
                        start: true
                    }
                }
        };
        for_each(libs, function (name) {
            result[name] = this.dest;
        });
        return result;
    }
    //
    // This Grunt Config Entry
    // -------------------------------
    //
    // Initialise Grunt with all tasks defined above
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            libs: {dest: target_min,
                   src: [target]}
        },
        jshint: {src: ['Gruntfile.js', target]},
        jasmine: {
            src : target_min,
            options : {
                specs : 'tests.js'
            }
        }
    });
    //
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    //
    grunt.registerTask('build', 'Lint and uglify', ['jshint', 'uglify']);
    grunt.registerTask('all', 'Lint, uglify and test', ['build', 'jasmine']);
    grunt.registerTask('default', ['all']);
};
