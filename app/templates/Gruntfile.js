// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// show elapsed time at the end
	require('time-grunt')(grunt);
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		// configurable paths
		yeoman: {

			app: 'source',
			dist: 'release'
		},
		watch: {
			compass: {
				files: ['<%%= yeoman.app %>/assets/scss/{,*/}*.{scss,sass}'],
				tasks: ['compass:server', 'autoprefixer']
			},
			// scripts: {
			// 	files: ['<%%= yeoman.app %>/assets/js/{,*/}*.js'],
			// 	tasks: ['jshint']
			// },
			// styles: {
			// 	files: ['<%%= yeoman.app %>/assets/css/{,*/}*.css'],
			// 	tasks: ['copy:styles', 'autoprefixer']
			// },
			livereload: {
				options: {
					livereload: '<%%= connect.options.livereload %>'
				},
				files: [
					'<%%= yeoman.app %>/*.html',
					'{.tmp,<%%= yeoman.app %>}/assets/css/{,*/}*.css',
					'{.tmp,<%%= yeoman.app %>}/assets/js/{,*/}*.js',
					'<%%= yeoman.app %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true,
					base: [
						'.tmp',
						'<%%= yeoman.app %>'
					]
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%%= yeoman.dist %>'
				}
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%%= yeoman.dist %>/*',
						'!<%%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				force: true
			},
			all: [
				'Gruntfile.js',
				'<%%= yeoman.app %>/assets/js/{,*/}*.js',
				'!<%%= yeoman.app %>/assets/js/libs/*',
				'!<%%= yeoman.app %>/assets/js/thirdparty/*'
			]
		},
		compass: {
			options: {
				sassDir: '<%%= yeoman.app %>/assets/scss',
				cssDir: '<%%= yeoman.app %>/assets/css',
				generatedImagesDir: '<%%= yeoman.app %>/assets/images/generated',
				imagesDir: '<%%= yeoman.app %>/assets/images',
				javascriptsDir: '<%%= yeoman.app %>/assets/js',
				fontsDir: '<%%= yeoman.app %>/assets/fonts',
				importPath: '<%%= yeoman.app %>/assets/js/libs',
				httpImagesPath: '/assets/images',
				httpGeneratedImagesPath: '/assets/images/generated',
				httpFontsPath: '/assets/fonts',
				relativeAssets: false,
				assetCacheBuster: false
			},
			dist: {
				options: {
					generatedImagesDir: '<%%= yeoman.dist %>/assets/images/generated'
				}
			},
			server: {
				options: {
					debugInfo: true
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%%= yeoman.app %>/assets/css/',
					src: '{,*/}*.css',
					dest: '<%%= yeoman.app %>/assets/css/'
				}]
			}
		},
		// not used since Uglify task does concat,
		// but still available if needed
		/*concat: {
			dist: {}
		},*/
		requirejs: {
			dist: {
				// Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
				options: {
					uglify:{
						mangle: false
					},
					// `name` and `out` is set by grunt-usemin
					// baseUrl: '<%%= yeoman.app %>/assets/js',
					// out: '<%%= yeoman.dist %>/assets/js/main.js',
					optimize: 'none',
					// mainConfigFile: '<%%= yeoman.app %>/assets/js/main.js',
					// paths: {

					// 	<% if (includeJQuery) { %>'jquery': 'libs/jquery'<% if (includeThreeJS) { %>,<% } %><% } %>
					// 	<% if (includeThreeJS) { %>'three': 'libs/three/three'<% } %>
					// },
					// shim: {

					// 	<% if (includeThreeJS) { %>'three': { exports: 'THREE' }<% } %>
					// },
					// TODO: Figure out how to make sourcemaps work with grunt-usemin
					// https://github.com/yeoman/grunt-usemin/issues/30
					//generateSourceMaps: true,
					// required to support SourceMaps
					// http://requirejs.org/docs/errors.html#sourcemapcomments
					preserveLicenseComments: true,
					useStrict: true,
					wrap: true
					//uglify2: {} // https://github.com/mishoo/UglifyJS2
				}
			}
		},
		rev: {
			dist: {
				files: {
					src: [
						'<%%= yeoman.dist %>/assets/js/{,*/}*.js',
						'<%%= yeoman.dist %>/assets/css/{,*/}*.css',
						'<%%= yeoman.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
						'<%%= yeoman.dist %>/assets/fonts/{,*/}*.*'
					]
				}
			}
		},
		useminPrepare: {
			options: {
				dest: '<%%= yeoman.dist %>'
			},
			html: '<%%= yeoman.app %>/index.html'
		},
		usemin: {
			options: {
				dirs: ['<%%= yeoman.dist %>']
			},
			html: ['<%%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%%= yeoman.dist %>/assets/css/{,*/}*.css']
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%%= yeoman.app %>/assets/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%%= yeoman.dist %>/assets/images'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%%= yeoman.app %>/assets/images',
					src: '{,*/}*.svg',
					dest: '<%%= yeoman.dist %>/assets/images'
				}]
			}
		},
		cssmin: {
			// This task is pre-configured if you do not wish to use Usemin
			// blocks for your CSS. By default, the Usemin block from your
			// `index.html` will take care of minification, e.g.
			//
			//     <!-- build:css({.tmp,app}) assets/css/main.css -->
			//
			dist: {
				files: {
					'<%%= yeoman.dist %>/assets/css/main.css': [
						'.tmp/assets/css/{,*/}*.css',
						'<%%= yeoman.app %>/assets/css/{,*/}*.css'
					]
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					/*removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					//collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true*/
				},
				files: [{
					expand: true,
					cwd: '<%%= yeoman.app %>',
					src: '*.html',
					dest: '<%%= yeoman.dist %>'
				}]
			}
		},
		// Put files not handled in other tasks here
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%%= yeoman.app %>',
					dest: '<%%= yeoman.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'assets/images/{,*/}*.{webp,gif}',
						'assets/fonts/{,*/}*.*'
					]
				}]
			},
			styles: {
				expand: true,
				dot: true,
				cwd: '<%%= yeoman.app %>/assets/css',
				dest: '<%%= yeoman.app %>/assets/css/',
				src: '{,*/}*.css'
			}
		},
		modernizr: {
			devFile: '<%%= yeoman.app %>/assets/js/libs/modernizr.js',
			outputFile: '<%%= yeoman.dist %>/assets/js/libs/modernizr.js',
			files: [
				'<%%= yeoman.dist %>/assets/js/{,*/}*.js',
				'<%%= yeoman.dist %>/assets/css/{,*/}*.css',
				'!<%%= yeoman.dist %>/assets/js/libs/*'
			],
			uglify: true
		},
		uglify: {
			options: {
				mangle: false
			}
		},
		concurrent: {
			server: [
				'compass',
				'copy:styles'
			],
			dist: [
				'compass',
				'copy:styles',
				'imagemin',
				'svgmin',
				'htmlmin'
			]
		},
		bower: {
		},
		bowercopy: {
			options: {
				// Bower components folder will be removed afterwards
				clean: false
			},
			// JavaScript
			libs: {
				options: {
					destPrefix: 'source/assets/js/libs'
				},
				files: {
					'jquery.js': 'jquery/jquery.js'<% if (includeRequireJS) { %>,
					'require.js': 'requirejs/require.js'<% } %><% if (includeModernizr) { %>,
					'modernizr.js': 'modernizr/modernizr.js'<% } %>
				},
			},
			// Less
			// less: {
			//     options: {
			//         destPrefix: 'source/assets/less'
			//     },
			//     files: {
			//         // If either the src or the dest is not present,
			//         // the specified location will be used for both.
			//         // In other words, this will copy
			//         // 'bower_components/bootstrap/less/dropdowns.less' to 'less/bootstrap/less/dropdowns.less'
			//         // See http://gruntjs.com/configuring-tasks#files for recommended files formats
			//         src: 'bootstrap/less/dropdowns.less'
			//     }
			// },
			// Images
			images: {
				options: {
					destPrefix: 'source/assets/images'
				},
				files: {
				}
			},
			// Entire folders
			folders: {
				files: {
					// Note: when copying folders, the destination (key) will be used as the location for the folder
					<% if (includeRequireJS) { %>'source/assets/js/utils': 'amd-modules/src/utils'<% } %>
					// 'source/assets/scss/bower-compass-core': 'bower-compass-core'
				}
			}
		}
		// ,
		// phantomas: {
		// 	brpSite : {
		// 		options : {
		// 			indexPath: './phantomas/',
		// 			raw: [],
		// 			url: '<%= urlName %>'
		// 		}
		// 	}
		// }
	});

	grunt.registerTask('server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'concurrent:server',
			'autoprefixer',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'concurrent:dist',
		'autoprefixer',
		<% if (includeRequireJS) { %>'requirejs',<% } %>
		'concat',
		'cssmin',
		'uglify',
		<% if (includeModernizr) { %>'modernizr',<% } %>
		'copy:dist',
		'rev',
		'usemin',
		'jshint'
		// ,
		// 'phantomas:brpSite'
	]);

	grunt.registerTask('default', [
		// 'bower',
		'bowercopy',
		'build'
	]);
};
