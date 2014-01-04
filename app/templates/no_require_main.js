'use strict';

<% if (includeJQuery) { %>$( function () {<% } %>

	console.log('APP RUNNING');
<% if (includeJQuery) { %>
	console.log( 'Running jQuery %s', $().jquery );
<% } %>

<% if (includeJQuery) { %>} );<% } %>
