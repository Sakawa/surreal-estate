from django.db import models
from django.contrib.auth.models import User

class City(models.Model):
	name = models.CharField(max_length=20)
	avg_low = models.DecimalField(max_digits=4, decimal_places=1)
	avg_high = models.DecimalField(max_digits=4, decimal_places=1)
	population = models.IntegerField()
	annual_rainfall = models.DecimalField(max_digits=5, decimal_places=2)

	def __unicode__(self):
		return self.name

class Neighborhood(models.Model):
	parent_city = models.ForeignKey(City)
	name = models.CharField(max_length=25)
	overall_rating = models.DecimalField(max_digits=2, decimal_places=1)
	nature_rating = models.DecimalField(max_digits=2, decimal_places=1)
	price_rating = models.DecimalField(max_digits=2, decimal_places=1)
	nature_rating = models.DecimalField(max_digits=2, decimal_places=1)
	school_rating = models.DecimalField(max_digits=2, decimal_places=1)
	recreation_rating = models.DecimalField(max_digits=2, decimal_places=1)
	shopping_rating = models.DecimalField(max_digits=2, decimal_places=1)
	picture_list = models.TextField()
	thumbnail70 = models.TextField()
	thumbnail320 = models.TextField()
	map_link = models.TextField()

	def __unicode__(self):
		return self.name

class UserInfo(models.Model):
	favorites = models.ManyToManyField('Neighborhood')
	user = models.OneToOneField(User)

	def __unicode__(self):
		return self.user.email

class Review(models.Model):
	author = models.CharField(max_length=25)
	body = models.TextField()
	upvotes = models.IntegerField()
	downvotes = models.IntegerField()
	voted_users = models.ManyToManyField(UserInfo, related_name="voted_reviews")
	neighborhood = models.ForeignKey(Neighborhood)
	jobs = models.TextField(null=True, blank=True)
	age = models.PositiveSmallIntegerField(null=True, blank=True)
	kids = models.PositiveSmallIntegerField(null=True, blank=True)
	date = models.DateTimeField(auto_now=True, auto_now_add=True)

	def __unicode__(self):
		return "%s %s" % (self.author, self.date)

class Survey(models.Model):
	user = models.OneToOneField(UserInfo)
	house = models.NullBooleanField(null=True, blank=True)
	apartment = models.NullBooleanField(null=True, blank=True)
	coop = models.NullBooleanField(null=True, blank=True)
	min_price = models.PositiveIntegerField(null=True, blank=True)
	max_price = models.PositiveIntegerField(null=True, blank=True)
	city = models.NullBooleanField(null=True, blank=True)
	country = models.NullBooleanField(null=True, blank=True)
	suburb = models.NullBooleanField(null=True, blank=True)
	bedrooms = models.PositiveSmallIntegerField(null=True, blank=True)
	bathrooms = models.PositiveSmallIntegerField(null=True, blank=True)
	num_people = models.PositiveSmallIntegerField(null=True, blank=True)
	kids = models.NullBooleanField(null=True, blank=True)
	num_kids = models.PositiveSmallIntegerField(null=True, blank=True)
	min_temp = models.PositiveSmallIntegerField(null=True, blank=True)
	max_temp = models.PositiveSmallIntegerField(null=True, blank=True)
	few_shopping = models.NullBooleanField(null=True, blank=True)
	some_shopping = models.NullBooleanField(null=True, blank=True)
	many_shopping = models.NullBooleanField(null=True, blank=True)
	few_rec = models.NullBooleanField(null=True, blank=True)
	some_rec = models.NullBooleanField(null=True, blank=True)
	many_rec = models.NullBooleanField(null=True, blank=True)

	def __unicode__(self):
		return "%s Survey", self.user

class Message(models.Model):
	sender = models.ForeignKey(UserInfo, related_name="sender_user")
	recipient = models.ForeignKey(UserInfo)
	message = models.TextField()
	date = models.DateTimeField(auto_now=True, auto_now_add=True)

	def __unicode__(self):
		return "Message from %s to %s" % (self.sender, self.recipient)