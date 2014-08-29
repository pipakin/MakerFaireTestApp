var app = angular.module('testApp', []);

app.factory('log', function($rootScope) {

	$rootScope.log = "";

	var func = function(text) {
		$rootScope.log += text + "\r\n";
	}

	func.raw = function(text) {
		$rootScope.log += text;		
	}

	return func;
});

function testController($scope, $q, serialConnection, log) {

	log("Loading test...");
	serialConnection.open();

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