/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            main: {
                files: {
                    'dist/niice-colour-widget.min.js': ['lib/color-thief.js', 'src/color-widget.js']
                }
            }
        }

    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Define tasks
    grunt.registerTask('default', 'uglify');

};
