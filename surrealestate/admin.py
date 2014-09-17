from django.contrib import admin
from models import UserInfo, Neighborhood, City, Review, Survey, Message

class NeighborhoodAdmin(admin.ModelAdmin):
    list_display = ('parent_city', 'name', 'overall_rating')

class CityAdmin(admin.ModelAdmin):
	list_display = ('name', 'avg_low', 'avg_high')

class ReviewAdmin(admin.ModelAdmin):
	list_display = ('author', 'neighborhood', 'upvotes', 'downvotes')

class SurveyAdmin(admin.ModelAdmin):
	list_display = ('user',)

class MessageAdmin(admin.ModelAdmin):
	list_display = ('sender', 'recipient', 'date')

admin.site.register(UserInfo)
admin.site.register(Neighborhood, NeighborhoodAdmin)
admin.site.register(City, CityAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Survey, SurveyAdmin)
admin.site.register(Message, MessageAdmin)