//аналитика
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'TODO: REPLACE!']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


window.onerror = function(msg, url, line) {
	var preventErrorAlert = true;
	_gaq.push(['_trackEvent', 'JS Error', msg, navigator.userAgent + ' -> ' + url + " : " + line, 0, true]);
	return preventErrorAlert;
};