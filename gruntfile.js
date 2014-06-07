module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			basic_and_extras: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['src/controllers/root.js', 'src/controllers/*.js', 'src/directives/root.js', 'src/directives/*.js', 'src/filters/root.js', 'src/filters/*.js', 'src/services/*.js', '!src/vendor/**/*.js'],
					'dist/<%= pkg.name %>-libs.min.js': ['src/vendor/angular/angular.min.js', 'src/vendor/angular/angular.min.js', 'src/vendor/angular-route/angular-route.min.js', 'src/vendor/jquery/dist/jquery.min.js', 'src/vendor/*.js']
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
		}
	});

	// Load the plugins.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify']);
};
