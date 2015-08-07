
// Saves options to chrome.storage.sync.
function save_options() {

	var hideWS 		= document.getElementById('hide-ws').checked;
	var useTabs 	= document.getElementById('use-tabs').checked;
	var tabSpace 	= (useTabs)
		? document.getElementById('tab-space').value
		: null
	;

	chrome.storage.sync.set({
			hideWS: 	hideWS,
			tabSpace: 	tabSpace,
			useTabs: 	useTabs,
		},
		function() {

			// Update status to let user know options were saved.
			var status = document.getElementById('status');
			status.className = '';

			setTimeout(function() {
				status.className = 'invisible';
			}, 2000);
		}
	);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

	// Use default values tabSpace = 4, useTabs = false.
	chrome.storage.sync.get({
			hideWS: 	true,
			tabSpace: 	4,
			useTabs: 	false
		},
		function(items) {
			document.getElementById('hide-ws').checked 		= items.hideWS;
			document.getElementById('tab-space').value 		= items.tabSpace;
			document.getElementById('use-tabs').checked 	= items.useTabs;
		}
	);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
