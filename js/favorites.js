var toggleSelect = function(div) {
	toggleClass(div, 'favorite-selected');
	var s = div.children[0].value;
	if (hasClass(div, 'favorite-selected')) {
		console.log
		div.children[0].value = s + '-select';
	} else {
		div.children[0].value = s.substring(0, s.length - 7);
	}
}

var grabSelectedNames = function() {
	var slist = document.getElementsByClassName('favorite-selected');
	var s = '';
	for (var i = 0; i < slist.length; i++) {
		s += slist[i].children[1].children[0].children[0].children[0].innerHTML;
		if (i != sList.length - 1) {
			s += ',';
		}
	}
	return s;
}

var submitChoices = function(){
	neighborhoods = '' // Replace this with some logic to get a string with list of Neighborhoods separated by COMMA
	neighborhoods = grabSelectedNames();
	document.topchoices.neighborhoods.value = neighborhoods;
	document.getElementById('topchoices').submit();
}