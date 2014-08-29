app.factory('serialConnection', function connection($rootScope, $q, log) {

	function requestPermission() {
		var deferred = $q.defer();

		if(window.serial == undefined) {
			deferred.reject();
		}
		else
		{
			serial.requestPermission(function (a) {
				$rootScope.$apply(function() {
					deferred.resolve();
				});
			}, function(thing) {
				$rootScope.$apply(function() {
					deferred.reject();
				});
			});
		}

		return deferred.promise;
	}

	function openSerial() {
		var deferred = $q.defer();

		serial.open({baudRate: 115200}, function (a) {
			$rootScope.$apply(function() {
				deferred.resolve();
			});
		}, function(thing) {
			$rootScope.$apply(function() {
				deferred.reject();
			});
		})

		return deferred.promise;
	}

	return {
		open: function() {


			return requestPermission().then(function() {
				log('permession granted, openning serial...');
				return openSerial();
			}, function() {
				log('failed to get serial open permission.');
				return $q.reject();
			}).then(function() {
				return serial.registerReadCallback(readCallback, 
				function (message) {
					$rootScope.$apply(function() {
						log('failed to register read function.');
					});
					return $q.reject();
				});
			});
		}
	};

	function readCallback(data) {
		var view = new Uint8Array(data);
		var result = "";
		for(var i = 0; i < view.length; i++) {
			result = result + String.fromCharCode(view[i]);
		}
		$rootScope.$apply(function() {
			$rootScope.$broadcast("message", result);
		});
	}
});