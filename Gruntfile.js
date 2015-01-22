/*jshint node: true */
/*global config:true, task:true, process:true*/
module.exports = function(grunt) {
    "use strict";
    var target = "require.config.js",
        target_min = target.replace('.js', '.min.js');
    //
    // This Grunt Config Entry
    // -------------------------------
    //
    // Initialise Grunt with all tasks defined above
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            libs: {
                options: {
                    banner: grunt.file.read("js/banner.js")
                },
                src: ["js/src.js"],
                dest: target
            }
        },
        uglify: {
            libs: {
                dest: target_min,
                src: [target]
            }
        },
        jshint: {src: ['Gruntfile.js', target]},
        jasmine: {
            src : [],
            options : {
                specs : 'js/tests.js',
                template: 'test.tpl.html'
            }
        }
    });
    //
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    //
    grunt.registerTask('build', 'Lint and uglify', ['concat', 'jshint', 'uglify']);
    grunt.registerTask('all', 'Lint, uglify and test', ['build', 'jasmine']);
    grunt.registerTask('default', ['all']);
};
