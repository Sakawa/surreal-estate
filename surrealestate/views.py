from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render_to_response, redirect
from django.template import RequestContext
from django.template.defaultfilters import striptags
from surrealestate.models import *
import json, string, random

def home(request):
	cities = City.objects.filter(name__iexact = 'Cambridge, MA')
	city = cities[0]
	neighborhoods = Neighborhood.objects.filter(parent_city = city)
	info = []
	for n in neighborhoods:
		info.append(calculate_ratings(n))
	return render_to_response('index.html', {'neighborhoods': info}, context_instance = RequestContext(request))

def neighborhood(request):
	neighborhoods = Neighborhood.objects.all()
	return render_to_response('neighborhood.html', {'neighborhoods': neighborhoods}, context_instance = RequestContext(request))

def ratings(request, neighborhood):
	neighborhood = neighborhood.lower()
	neighborhood = string.replace(neighborhood, '-', ' ')
	neighborhood = Neighborhood.objects.filter(name__iexact=neighborhood)
	if not neighborhood:
		return redirect('index.html')
	neighborhood = neighborhood[0]
	dictionary = calculate_ratings(neighborhood)
	reviews = Review.objects.filter(neighborhood=neighborhood)
	pictures = neighborhood.picture_list.split('\n')
	dictionary.update({'reviews': reviews, 'pictures': pictures})
	return render_to_response('ratings.html', dictionary, context_instance = RequestContext(request))

def favorites(request):
	if request.user.is_authenticated():
		info = UserInfo.objects.filter(user=request.user)
		if info:
			info = info[0]
		else:
			return HttpResponse("Something go wrong, you have no favorite")
		favorites = info.favorites.all()
		favs = []
		for favorite in favorites:
			favs.append(calculate_ratings(favorite))
		return render_to_response('favorites.html', {'favorites': favs}, context_instance = RequestContext(request))
	else:
		return HttpResponse("Hi you do not log in so no favorite.")

def reset_test(request):
	if request.user.is_authenticated():
		if request.user.is_staff:
			user = User.objects.get(username='guestuser')
			info = UserInfo.objects.get(user=user)
			info.favorites.clear()
			return HttpResponse("Cleared.")
	return HttpResponse("Stop hacking us, damn it.")

def top_results(request):
	# if request.method == 'POST':
	neighborhoods = []
	neighs = []
	if request.POST:
		neighborhoods_names = request.POST.getlist('neighborhoods')
		for name in neighborhoods_names:
			if name[-7:] == '-select':
				neighborhood = Neighborhood.objects.filter(name__iexact=name[:-7])
				neighborhoods.extend(neighborhood)
		for neighborhood in neighborhoods:
			neighs.append(calculate_ratings(neighborhood))
		random.shuffle(neighs, random.random)
		# Do stuff with neighborhoods, do this by passing in the appropriate context
	return render_to_response('topresults.html', {'neighborhoods': neighs}, context_instance = RequestContext(request))

def login_user(request):
	if request.method == 'POST':
		if 'username' in request.POST and 'password' in request.POST:
			username = request.POST['username']
			password = request.POST['password']
			user = authenticate(username=username, password=password)
			if user is not None:
				login(request,user)
				return HttpResponse("You are now logged in as %s." % username)
		if 'HTTP_REFERER' in request.META:
			return redirect(request.META['HTTP_REFERER'])
		else:
			return redirect('/home')
	else:
		return render_to_response('login.html', context_instance = RequestContext(request))
	return redirect('/home')

def register(request):
	if request.user.is_authenticated():
		return redirect('/')
	if request.method == 'POST':
		form = UserCreationForm(request.POST)
		if form.is_valid():
			# Should really put some messages to tell the user what went wrong
			if len(User.objects.filter(username=form.cleaned_data['username'])) > 0:
				ans = False
			elif len(User.objects.filter(email=form.cleaned_data['email'])) > 0:
				ans = False
			else:
				new_user = User.objects.create_user(form.cleaned_data['username'], password=form.cleaned_data['password'])
				ans = True
		else:
			if form['username'].errors or form['password'].errors or form['email'].errors or form['first_name'].errors or form['last_name'].errors:
				ans = False
			elif form.non_field_errors():
				ans = False
	return redirect('/')

def survey(request):
	return render_to_response('survey.html', context_instance = RequestContext(request))

def calculate_ratings(neighborhood):
	name = neighborhood.name
	url = string.replace(neighborhood.name.lower(), ' ', '-')
	temp_rating = int(round(neighborhood.overall_rating))
	overall_p = temp_rating * 'j'
	overall_n = (5-temp_rating) * 'a'
	temp_rating = int(round(neighborhood.recreation_rating))
	recreation_p = temp_rating * 'u'
	recreation_n = (5-temp_rating) * 'u'
	temp_rating = int(round(neighborhood.school_rating))
	school_p = temp_rating * 'k'
	school_n = (5-temp_rating) * 'k'
	temp_rating = int(round(neighborhood.nature_rating))
	nature_p = temp_rating * 'h'
	nature_n = (5-temp_rating) * 'h'
	temp_rating = int(round(neighborhood.shopping_rating))
	shopping_p = temp_rating * 'm'
	shopping_n = (5-temp_rating) * 'm'
	temp_rating = int(round(neighborhood.price_rating))
	price_p = temp_rating * 'f'
	price_n = (5-temp_rating) * 'f'
	avg_low = neighborhood.parent_city.avg_low
	avg_high = neighborhood.parent_city.avg_high
	thumbnail70 = neighborhood.thumbnail70
	thumbnail320 = neighborhood.thumbnail320
	map_url = neighborhood.map_link
	return {'url': url, 'parent': neighborhood.parent_city.name,
			'population': neighborhood.parent_city.population,
			'rainfall':neighborhood.parent_city.annual_rainfall,
			'name': name, 'avg_low': avg_low, 'avg_high': avg_high,
			'overall_p': overall_p, 'overall_n': overall_n,
			'recreation_p': recreation_p, 'recreation_n': recreation_n,
			'school_p': school_p, 'school_n': school_n,
			'nature_p': nature_p, 'nature_n': nature_n,
			'shopping_p': shopping_p, 'shopping_n': shopping_n,
			'price_p': price_p, 'price_n': price_n,
			'thumbnail320': thumbnail320, 'thumbnail70': thumbnail70,
			'maplink': map_url}
