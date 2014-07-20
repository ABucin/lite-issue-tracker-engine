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
			}]
			}
		},
		concat: {
			basic_and_extras: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['src/controllers/root.js', 'src/controllers/*.js', 'src/directives/root.js', 'src/directives/*.js', 'src/filters/root.js', 'src/filters/*.js', 'src/services/*.js', '!src/vendor/**/*.js'],
					'dist/<%= pkg.name %>-libs.min.js': ['src/vendor/angular/angular.min.js', 'src/vendor/angular/angular.min.js', 'src/vendor/angular-*/angular-*.min.js', 'src/vendor/jquery/dist/jquery.min.js', 'src/vendor/*.js'],
					'dist/css/<%= pkg.name %>-libs.min.css': ['css/*.min.css', 'src/vendor/ionicons/css/ionicons.min.css', 'src/vendor/components-font-awesome/css/font-awesome.min.css']
				},
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				mangle: false
			},
			build: {
				src: 'dist/<%= pkg.name %>.min.js',
				dest: 'dist/<%= pkg.name %>.min.js'
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
		}
	});

	// Load the plugins.
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');

	// Default task(s).
	grunt.registerTask('default', ['copy', 'concat', 'uglify', 'less']);
};
