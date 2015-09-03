
;(function(){

	var _qsArr 		= null;
	var _settings 	= null;

	var _methods 	= {

		init: function() {

			_qsArr = location.search.length
				? location.search.replace('?', '').split('&')
				: []
			;

			_methods.setExtensionSettings();

			// Wait for settings to populate.
			var settingsIntv = setInterval(function() {

				if (_settings) {

					clearInterval(settingsIntv);

					_methods.updateQueryString();
				}

			}, 5);
		},

		isTabsParamAdded: function() {

			if (! _settings.useTabs) return false;

			var tsParam = 'ts=' + _settings.tabSpace;

			if (_qsArr.indexOf(tsParam) == -1) {

				_qsArr.push(tsParam);
				return true;
			}

			return false;
		},

		isWhiteSpaceParamAdded: function() {

			if (! _settings.hideWS) return false;

			var wsParam = 'w=1';

			if (_qsArr.indexOf(wsParam) == -1) {

				_qsArr.push(wsParam);
				return true;
			}

			return false;
		},

		setExtensionSettings: function() {

			chrome.storage.sync.get({
					hideWS: 	true,
					tabSpace: 	4,
					useTabs: 	false
				},
				function(settings) {

					_settings = settings;
				}
			);
		},

		updateQueryString: function() {

			var isTabs 	= _methods.isTabsParamAdded();
			var isWS 	= _methods.isWhiteSpaceParamAdded();

			if (isTabs || isWS) {

				var url = location.pathname
					+ '?'
					+ _qsArr.join('&')
					+ location.hash
				;

				location.replace(url);
			}
		},
	};

	_methods.init();

})();
