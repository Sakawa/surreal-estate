from dajax.core import Dajax
import json
from dajaxice.decorators import dajaxice_register
from surrealestate.models import UserInfo, Neighborhood, Review
from django.template import Template, Context, loader

@dajaxice_register(method='POST', name='neighborhood.favorite')
def favorite(request, neighborhood):
	if request.user.is_authenticated():
		info = UserInfo.objects.filter(user=request.user)
		if not info:
			info = UserInfo(user=request.user)
			info.save()
		else:
			info = info[0]
		nbrhd = Neighborhood.objects.filter(name__iexact=neighborhood)
		if not nbrhd:
			return json.dumps({'yes': False})
		else:
			nbrhd = nbrhd[0]
			ans = False
			if nbrhd in info.favorites.all():
				info.favorites.remove(nbrhd)
			else:
				ans = True
				info.favorites.add(nbrhd)
		return json.dumps({'yes': ans})
	return

@dajaxice_register(method='GET', name='neighborhood.is_favorite')
def is_favorite(request, neighborhood):
	if request.user.is_authenticated():
		info = UserInfo.objects.filter(user=request.user)
		if not info:
			info = UserInfo(user=request.user)
			info.save()
		else:
			info = info[0]
		nbrhd = Neighborhood.objects.filter(name__iexact=neighborhood)
		if not nbrhd:
			return json.dumps({'yes': False})
		else:
			nbrhd = nbrhd[0]
			ans = False
			if nbrhd in info.favorites.all():
				ans = True
		return json.dumps({'yes': ans})
	return

@dajaxice_register(method='GET', name='neighborhood.filter')
def filter(request, occupations, kids, ages):
	relevant = Review.objects.all()
	if occupations:
		relevant = Review.objects.filter(jobs__in=occupations)
	if kids == [True,]:
		relevant = relevant.filter(kids__gte=0)
	elif kids == [False,]:
		relevant = relevant.filter(kids__exact=0)
	if '25-40' not in ages:
		relevant = relevant.exclude(age__range=(25, 40))
	if '40-65' not in ages:
		relevant = relevant.exclude(age__range=(40, 65))
	if '>65' not in ages:
		relevant = relevant.exclude(age__gte=65)
	html = []
	t = loader.get_template('review-template.html')
	for review in relevant:
		c = Context({'review': review})
		html.append(t.render(c))
	final_html = html.join('')
	return json.dumps({'html': final_html})