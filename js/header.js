function visibility(){
	div_login = document.getElementById('login-box');
	toggleClass(div_login, 'visible');
}

var addHeaderListener = function() {
	var headerSearchText = document.getElementById('header-search-text');
	headerSearchText.contentEditable = true;
	headerSearchText.addEventListener('keypress', function(event) {
			if (event.keyCode == 13) {
				event.preventDefault();
				search(headerSearchText.innerHTML);
			}
		}, false);
}

window.onload = function() {
	addHeaderListener();
}

var search = function(term) {
	var searchTerm = term.toLowerCase();
	if(searchTerm.search("lakeside") != -1) {
		window.location = "/ratings/lakeside";
		return;
	}

	if(searchTerm.search("alamo square") != -1 ||
	   searchTerm.search("alamo") != -1 ||
	   searchTerm.search("square") != -1) {
		window.location = "/ratings/alamo-square";
		return;
	}

	if(searchTerm.search("midtown") != -1) {
		window.location = "/ratings/midtown";
		return;
	}

	if(searchTerm.search("the mission district") != -1 ||
	   searchTerm.search("mission district") != -1 ||
	   searchTerm.search("district") != -1 ||
	   searchTerm.search("mission") != -1) {
		window.location = "/ratings/the-mission-district";
		return;
	}

	if(searchTerm.search("financial district") != -1 ||
	   searchTerm.search("district") != -1 ||
	   searchTerm.search("financial") != -1) {
		window.location = "/ratings/financial-district";
		return;
	}

	if(searchTerm.search("murray hill") != -1 ||
	   searchTerm.search("murray") != -1 ||
	   searchTerm.search("hill") != -1) {
		window.location = "/ratings/murray-hill";
		return;
	}

	if(searchTerm.search("upper west side") != -1 ||
		searchTerm.search("upper side") != -1 ||
		searchTerm.search("upper west") != -1 ||
		searchTerm.search("west side") != -1 ||
		searchTerm.search("side") != -1 ||
		searchTerm.search("west") != -1 ||
		searchTerm.search("upper") != -1) {
		window.location = "/ratings/upper-west-side";
		return;
	}

	if(searchTerm.search("riverside") != -1) {
		window.location = "/ratings/riverside";
		return;
	}

	if(searchTerm.search("east cambridge") != -1 ||
    	searchTerm.search("east") != -1 ||
		searchTerm.search("cambridge") != -1) {
		window.location = "/ratings/east-cambridge";
		return;
	}

	if(searchTerm.search("area four") != -1 ||
    	searchTerm.search("area") != -1 ||
		searchTerm.search("four") != -1) {
		window.location = "/ratings/area-four";
		return;
	}

	if(searchTerm.search("mit") != -1) {
		window.location = "/ratings/mit";
		return;
	}

	if(searchTerm.search("soho") != -1) {
		window.location = "/ratings/soho";
		return;
	}

	window.location = "/";
	return;
};