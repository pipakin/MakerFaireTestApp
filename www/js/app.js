var app = angular.module('testApp', []);

function testController($scope, $q) {

	$scope.log = "";

	function requestPermission() {
		var deferred = $q.defer();
		log('- got deferred!')

		serial.requestPermission(function (a) {
			$scope.$apply(function() {
				log('success? ' + a);
				deferred.resolve();
			});
		}, function(thing) {
			$scope.$apply(function() {
				log('lolfail... ' + a);
				deferred.reject();
			});
		})

		return deferred.promise;
	}

	function openSerial() {
		var deferred = $q.defer();
		log('- got deferred!')

		serial.open({baudRate: 115200}, function (a) {
			$scope.$apply(function() {
				deferred.resolve();
			});
		}, function(thing) {
			$scope.$apply(function() {
				log('lolfail... ' + a);
				deferred.reject();
			});
		})

		return deferred.promise;
	}

	function readCallback(data) {
		var view = new Uint8Array(data);
		var result = "";
		for(var i = 0; i < view.length; i++) {
			result = result + String.fromCharCode(view[i]);
		}
		$scope.$apply(function() {
			logRaw(result);
		});
	}

	function logRaw(text) {
		$scope.log += text;
	}

	function log(text) {
		$scope.log += text + "\r\n";
	}

	log("Loading test...");
	log("serial: " + serial)
	requestPermission().then(function() {
		return openSerial();
	}, function() {
		$scope.$apply(function() {
			log('lolfail... ');
		});
	}).then(function() {
		serial.registerReadCallback(readCallback, 
		function () {
			$scope.$apply(function() {
				log('lolfail... ');
			});
		});
		log('registered read...');
		return;
	}, function(){
		$scope.$apply(function() {
			log('lolfail... ');
		});
	});
	log('OMGWTF...')

	$scope.getTemp = function() {
		log("sent: M105");
		serial.write("M105\n", function() {}, function() {});
	}

	$scope.homeX = function() {
		log("sent: G28 X0");
		serial.write("G28 X0\n", function() {}, function() {});
	}

	$scope.homeY = function() {
		log("sent: G28 X0");
		serial.write("G28 X0\n", function() {}, function() {});
	}

	$scope.setTemp = function() {
		log("sent: M104 S100");
		serial.write("M104 S100\n", function() {}, function() {});
	}
}

app.controller('testController', testController);

window.onerror = function(msg, url, line, col, error) {
   // Note that col & error are new to the HTML 5 spec and may not be 
   // supported in every browser.  It worked for me in Chrome.
   var extra = !col ? '' : '\ncolumn: ' + col;
   extra += !error ? '' : '\nerror: ' + error;

   // You can view the information in an alert to see things working like this:
   alert("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);

   // TODO: Report this error via ajax so you can keep track
   //       of what pages have JS issues

   var suppressErrorAlert = true;
   // If you return true, then error alerts (like in older versions of 
   // Internet Explorer) will be suppressed.
   return suppressErrorAlert;
};