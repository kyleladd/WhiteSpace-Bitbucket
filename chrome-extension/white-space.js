
;(function(){

	var search = location.search.length
		? location.search.replace('?', '').split('&')
		: []
	;

	var wsParam 	= 'w=1';
	var wsIndex 	= search.indexOf(wsParam);

	if (wsIndex == -1) {
		search.push(wsParam);
		location.href = location.pathname + '?' + search.join('&') + location.hash;
	}
})();
