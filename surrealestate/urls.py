from django.conf.urls import patterns, include, url
from surrealestate.views import *
from dajaxice.core import dajaxice_autodiscover, dajaxice_config
dajaxice_autodiscover()

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'surrealestate.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', home),
    url(r'^login$', login_user),
    url(r'^favorites[/]$', favorites),
    url(r'^neighborhood[/]$', neighborhood),
    url(r'^ratings/([a-zA-Z0-9\-]+)$', ratings),
    url(r'^topresults[/]$', top_results),
    url(r'^survey[/]$', survey),
    url(r'^register/try$', register),
    url(r'^reset_staff$', reset_test),
    url(dajaxice_config.dajaxice_url, include('dajaxice.urls')),
)
