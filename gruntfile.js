module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			dev: {
				files: [{
					src: '*',
					dest: 'dist/fonts/',
					cwd: 'src/vendor/components-font-awesome/fonts/',
					expand: true
			},{
					src: '*',
					dest: 'dist/fonts/',
					cwd: 'src/vendor/ionicons/fonts/',
					expand: true
			},{
					src: '*',
					dest: 'dist/img/',
					cwd: 'img/',
					expand: true
			}]
			}
		},
		concat: {
			js_and_css: {
				files: {
					'dist/js/<%= pkg.name %>.min.js': ['src/**/root.js', 'src/**/*.js', '!src/vendor/**/*.js'],
					'dist/js/<%= pkg.name %>-libs.min.js': ['src/vendor/angular/angular.min.js', 'src/vendor/angular-*/angular-*.min.js', 'src/vendor/jquery/dist/jquery.min.js', 'src/vendor/bootstrap/dist/js/bootstrap.min.js', 'src/vendor/highcharts/highcharts.js'],
					'dist/css/<%= pkg.name %>-libs.min.css': ['css/*.min.css', 'src/vendor/ionicons/css/ionicons.min.css', 'src/vendor/components-font-awesome/css/font-awesome.min.css', 'src/vendor/bootstrap/dist/css/bootstrap.min.css']
				},
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
					"dist/css/<%= pkg.name %>.min.css": "css/*.less"
				}
			}
		},
		watch: {
			files: ['<%= concat.basic_and_extras.files %>'],
			tasks: ['concat']
		}
	});

	// Load the plugins.
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');

	// Default task(s).
	grunt.registerTask('default', ['copy', 'concat', 'uglify', 'less']);
};
