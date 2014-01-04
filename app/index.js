'use strict';

var util	= require('util');
var path	= require('path');
var yeoman	= require('yeoman-generator');
var chalk	= require('chalk');

var BrpGenerator = module.exports = function BrpGenerator( args, options, config ) {

	yeoman.generators.Base.apply( this, arguments );

	this.on( 'end', function () {

		this.installDependencies( {

			skipInstall: options['skip-install'],
			skipMessage: options['skip-install-message']
		} );
	} );

	this.pkg = JSON.parse( this.readFileAsString( path.join( __dirname, '../package.json' ) ) );
};

util.inherits( BrpGenerator, yeoman.generators.Base );

BrpGenerator.prototype.askFor = function askFor() {

	var cb = this.async();

	var brp =
		'\n' +
		chalk.bold.yellow(
			'      ____        ____            __\n' +
			'     / __ )      / __ \\___  ___  / /\n' +
			'    / __  ______/ /_/ / _ \\/ _ \\/ / \n' +
			'   / /_/ /_____/ _, _/  __/  __/ /  \n' +
			'  /_____/     /_/ |_|\\___/\\___/_/   \n' +
			'                                    \n' ) +
		chalk.cyan(
			'  --- Y E O M A N   B U I L D ---\n' );
	console.log( brp );

	console.log( this.yeoman );

	// console.log( 'Out of the box I include jQuery.' );

	var prompts = [ {

		name	: 'appName',
		message	: 'What name do you want for the project?'
	},{

		name	: 'className',
		message	: 'What name do you want for the nameSpace of the classes of this project?'
	},{

	// 	name	: 'urlName',
	// 	message	: 'What URL will be running the project ( required for phantomas statistics )?'
	// }, {

		type	: 'checkbox',
		name	: 'features',
		message	: 'What frameworks would you like?',
		choices: [ {

			name	: 'Modernizr',
			value	: 'includeModernizr',
			checked	: true
		},{

			name	: 'jQuery',
			value	: 'includeJQuery',
			checked	: true
		},{

			name	: 'ThreeJS',
			value	: 'includeThreeJS',
			checked	: false
		}, {

			name	: 'RequireJS',
			value	: 'includeRequireJS',
			checked	: true
		}, {

			name	: 'Compass for Sass',
			value	: 'includeCompass',
			checked	: true
		} ]
	} ];

	this.prompt( prompts, function ( props ) {

		this.appName			= props.appName;
		this.className			= props.className;
		this.urlName			= props.urlName;

		var features = props.features;
		function hasFeature( feat ) { return features.indexOf( feat ) !== -1; }

		// manually deal with the response, get back and store the results.
		// we change a bit this way of doing to automatically do this in the self.prompt() method.
		this.includeModernizr	= hasFeature( 'includeModernizr' );
		this.includeRequireJS	= hasFeature( 'includeRequireJS' );
		this.includeCompass		= hasFeature( 'includeCompass' );
		this.includeJQuery		= hasFeature( 'includeJQuery' );
		this.includeThreeJS		= hasFeature( 'includeThreeJS' );

		cb();

	}.bind( this ) );
};


BrpGenerator.prototype.gruntfile = function gruntfile () {

	this.template('Gruntfile.js');
};

BrpGenerator.prototype.packageJSON = function packageJSON () {

	this.template('_package.json', 'package.json');
};

BrpGenerator.prototype.git = function git () {

	this.copy('gitignore', '.gitignore');
	this.copy('gitattributes', '.gitattributes');
};

BrpGenerator.prototype.bower = function bower () {

	this.copy('bowerrc', '.bowerrc');
	this.copy('_bower.json', 'bower.json');
};

BrpGenerator.prototype.jshint = function jshint () {

	this.copy('jshintrc', '.jshintrc');
};

BrpGenerator.prototype.editorConfig = function editorConfig () {

	this.copy('editorconfig', '.editorconfig');
};

BrpGenerator.prototype.h5bp = function h5bp () {

	this.copy('favicon.ico', 'source/favicon.ico');
	// this.copy('404.html', 'source/404.html');
	// this.copy('robots.txt', 'source/robots.txt');
	// this.copy('htaccess', 'source/.htaccess');
};

BrpGenerator.prototype.mainStylesheet = function mainStylesheet () {

	if ( this.includeCompass ) {

		this.copy('main.scss', 'source/assets/scss/main.scss');
	} else {

		this.copy('main.css', 'source/assets/css/main.css');
	}
};

BrpGenerator.prototype.writeIndex = function writeIndex () {

	this.indexFile = this.readFileAsString( path.join( this.sourceRoot(), 'index.html' ) );
	this.indexFile = this.engine( this.indexFile, this );

	if ( this.includeRequireJS ) {

		this.indexFile = this.appendScripts( this.indexFile, 'assets/js/main.js', [ 'assets/js/libs/require.js' ], {
			'data-main': 'assets/js/main'
		});
		this.template( 'require_main.js', 'source/assets/js/main.js' );

	} else {

		if ( this.includeJQuery ) this.indexFile = this.appendScripts( this.indexFile, 'assets/js/libs/jquery.js', [ 'assets/js/libs/jquery.js' ] );
		this.indexFile = this.appendScripts( this.indexFile, 'assets/js/main.js', [ 'assets/js/main.js' ] );
		this.template( 'no_require_main.js', 'source/assets/js/main.js' );
	}
};


BrpGenerator.prototype.app = function app() {

	this.mkdir( 'source' );
	this.mkdir( 'source/assets' );
	this.mkdir( 'source/assets/scss' );
	this.mkdir( 'source/assets/css' );
	this.mkdir( 'source/assets/fonts' );
	this.mkdir( 'source/assets/images' );
	this.mkdir( 'source/assets/js' );
	this.mkdir( 'source/assets/js/thirdparty' );
	this.mkdir( 'source/assets/js/libs' );
	this.mkdir( 'source/assets/js/' + this.className );
	this.mkdir( 'release' );

	if ( this.includeThreeJS ) {

		this.copy( 'libs/three.js/build/three.js', 'source/assets/js/libs/three/three.js' );
	}

	this.write( 'source/index.html', this.indexFile );
};

