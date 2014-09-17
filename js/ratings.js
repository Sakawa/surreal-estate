var s = new Slider(25, 100, 25, 100, 'Age', 430, 100, 20, document.getElementById('filter-age'));

var sendMessagePopup = function(name) {
	addClass(document.getElementById("ratings-dim"), "open");
	addClass(document.getElementById("ratings-modal-message"), "open");
	document.getElementById('ratings-modal-recipient').innerHTML = name;
};

var toggleHeart = function() {
	toggleClass(document.getElementById('ratings-info-favorite'), "selected");
	var name = document.getElementById('ratings-info-neighborhood-name').innerHTML;
};

var ajaxToggle = function(){
	Dajaxice.neighborhood.favorite(toggle, {'neighborhood': document.getElementById('ratings-info-neighborhood-name').innerHTML});
	return false;
}

var getFavorite = function(){
	Dajaxice.neighborhood.is_favorite(toggle, {'neighborhood': document.getElementById('ratings-info-neighborhood-name').innerHTML});
	return false;
}

var toggle = function(data){
	if(data['yes'])
		favorite();
	else
		defavorite();
}

var favorite = function(){
	if(!hasClass(document.getElementById('ratings-info-favorite'), "selected"))
		addClass(document.getElementById('ratings-info-favorite'), "selected");
}

var defavorite = function(){
	if(hasClass(document.getElementById('ratings-info-favorite'), "selected"))
		removeClass(document.getElementById('ratings-info-favorite'), "selected");
}

var sendMessage = function() {
	removeClass(document.getElementById("ratings-dim"), "open");
	removeClass(document.getElementById("ratings-modal-message"), "open");
};

var cancelFilter = function() {
	removeClass(document.getElementById("ratings-dim"), "open");
	removeClass(document.getElementById("ratings-filter-modal"), "open");
};

var filter = function() {
	addClass(document.getElementById("ratings-dim"), "open");
	addClass(document.getElementById("ratings-filter-modal"), "open");
};

var escape = function() {
	if (hasClass(document.getElementById('ratings-dim'), 'open')) {
		removeClass(document.getElementById("ratings-dim"), "open");
	}
	if (hasClass(document.getElementById('ratings-modal-message'), 'open')) {
		removeClass(document.getElementById("ratings-modal-message"), "open");
	}

	if (hasClass(document.getElementById('ratings-filter'), 'open')) {
		removeClass(document.getElementById('ratings-filter'), 'open');
	}
}

var filterReviews = function(){
	// Make arrays to put, where the occupations array has a list of jobs, kids is a list of booleans, and age is a sublist of
	// ['25-40', '40-65', '>65']
	removeClass(document.getElementById("ratings-filter-modal"), "open");
	Dajaxice.neighborhood.filter(updateReviews, {'occupations': occupations, 'kids': kids, 'ages': ages});
	return false;
}

var updateReviews = function(data){
	if(data['html'] != null){
		document.getElementById('ratings-reviews-list').innerHTML = data['html']
	}
}

window.onload = function() {
	addHeaderListener();
	document.addEventListener('keypress', function(event) {
        if (event.keyCode == 27) {
            event.preventDefault();
            escape();
        } else if (event.keyCode == 23) {
            event.preventDefault();
            // send();
        }
    }, false);
    getFavorite();
}

var send = function() {
	if (hasClass(document.getElementById('ratings-dim'), 'open')) {
		removeClass(document.getElementById("ratings-dim"), "open");
	}
}
