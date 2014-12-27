module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            dev: {
                files: [
                    {
                        cwd: 'src/vendor/components-font-awesome/fonts/',
                        src: '*',
                        dest: 'dist/fonts/',
                        expand: true
                    },
                    {
                        cwd: 'src/vendor/ionicons/fonts/',
                        src: '*',
                        dest: 'dist/fonts/',
                        expand: true
                    },
                    {
                        cwd: 'img/',
                        src: '*',
                        dest: 'dist/img/',
                        expand: true
                    }
                ]
            }
        },
        concat: {
            js: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['src/**/root.js', 'src/**/*.js', '!src/vendor/**/*.js'],
                    'dist/js/<%= pkg.name %>-libs.min.js': [
                        'src/vendor/angular/angular.min.js',
                        'src/vendor/angular-*/angular-*.min.js',
                        'src/vendor/jquery/dist/jquery.min.js',
                        'src/vendor/bootstrap/dist/js/bootstrap.min.js',
                        'src/vendor/highcharts/highcharts.js'
                    ]
                }
            },
            css: {
                files: {
                    'dist/css/<%= pkg.name %>-libs.min.css': [
                        'css/*.min.css',
                        'src/vendor/ionicons/css/ionicons.min.css',
                        'src/vendor/components-font-awesome/css/font-awesome.min.css',
                        'src/vendor/bootstrap/dist/css/bootstrap.min.css'
                    ]
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['dist/js/<%= pkg.name %>.min.js']
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["css"],
                    compress: true
                },
                files: {
                    "dist/css/<%= pkg.name %>.min.css": "less/*.less"
                }
            }
        },
        jade: {
            compile: {
                files: [
                    {
                        cwd: "jade",
                        src: "**/*.jade",
                        dest: "dist/",
                        expand: true,
                        ext: ".html"
                    }
                ]
            }
        },
        watch: {
            views: {
                files: ['jade/**/*.jade'],
                tasks: ['jade']
            },
            stylesheets: {
                files: ['less/**/*.less'],
                tasks: ['less', 'concat:css']
            },
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['copy', 'concat:js', 'uglify']
            }
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jade');

    // Register deployment task
    grunt.registerTask('deploy', ['copy', 'concat', 'uglify', 'less', 'jade', 'watch']);
};