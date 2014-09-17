/**
 * Adds a class to a div element.
 * @param div Div element to add the class to
 * @param name Class name to add
 */
var addClass = function(div, name) {
	div.classList.add(name);
}

/**
 * Removes a class from a div element.
 * @param div Div element to remove the class from
 * @param name Class name to remove
 */
var removeClass = function(div, name) {
	div.classList.remove(name);
}

/**
 * Checks whether the div has a class.
 * @param div Div element to check
 * @param name Class name to check
 * @return True if the div has the class, false otherwise.
 */
var hasClass = function(div, name) {
	if(div.classList.contains(name)) {
		return true;
	} else {
		return false;
	}
}

var toggleClass = function(div, name) {
	if (hasClass(div, name)) {
		removeClass(div, name);
	} else {
		addClass(div, name);
	}
}

var submitRegister = function(){
	document.getElementById('r_username').value = document.getElementById('login_username').value;
	document.getElementById('r_password').value = document.getElementById('login_password').value;
	document.getElementById('register-form').submit();
}