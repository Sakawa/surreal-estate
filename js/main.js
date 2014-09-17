var selectTab = function(n) {
	l1 = document.getElementsByClassName('main-selection-filter');
	l2 = document.getElementsByClassName('main-neighborhood-rating');
	for (var i = 0; i < l1.length; i++) {
		removeClass(l1[i], 'main-selected');
	}
	addClass(l1[n], 'main-selected');

	for (var i = 0; i < l2.length; i++) {
		removeClass(l2[i], 'main-selected');
	}
	addClass(l2[n], 'main-selected');
	addClass(l2[n + 5], 'main-selected');
	addClass(l2[n + 10], 'main-selected');
	addClass(l2[n + 15], 'main-selected');
}

window.onload = function() {
	addHeaderListener();
	mapSetup();
}