require.config({
	paths: {

		<% if (includeJQuery) { %>'jquery': 'libs/jquery'<% if (includeThreeJS) { %>,<% } %><% } %>
		<% if (includeThreeJS) { %>'three': 'libs/three/three'<% } %>
	},
	shim: {

		<% if (includeThreeJS) { %>'three': { exports: 'three' }<% } %>
	}
});

require( [
	<% if (includeJQuery) { %>'jquery'<% if (includeThreeJS) { %>,<% } %><% } %>
	<% if (includeThreeJS) { %>'three'<% } %>
], function (
	<% if (includeJQuery) { %>$<% if (includeThreeJS) { %>,<% } %><% } %>
	<% if (includeThreeJS) { %>three<% } %>
) {

	'use strict';

	console.log('APP RUNNING');
	<% if (includeJQuery) { %>console.log( 'Running jQuery %s', $().jquery );<% } %>
	<% if (includeThreeJS) { %>console.log( 'Running THREE %s', THREE.REVISION );<% } %>
});
