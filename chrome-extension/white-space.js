
;(function(){

	// Tabs.
	chrome.storage.sync.get({
			hideWS: 	true,
			tabSpace: 	4,
			useTabs: 	false
		},
		function(items) {

			var search = location.search.length
				? location.search.replace('?', '').split('&')
				: []
			;
			var update = false;

			// Tabs.
			if (items.useTabs) {

				var tsParam 	= 'ts=' + items.tabSpace;

				if (search.indexOf(tsParam) == -1) {

					search.push(tsParam);
					update = true;
				}
			}

			// White space
			if (items.hideWS) {

				var wsParam 	= 'w=1';

				if (search.indexOf(wsParam) == -1) {

					search.push(wsParam);
					update = true;
				}
			}

			if (update) {

				location.href = location.pathname
					+ '?'
					+ search.join('&')
					+ location.hash
				;
			}
		}
	);
})();
