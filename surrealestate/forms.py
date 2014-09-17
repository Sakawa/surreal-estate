from django import forms
import re

class UserCreationForm(forms.Form):
	username = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'placeholder':'Username'}), required=True)
	password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Password'}), required=True)

	def clean(self):
		cleaned_data = super(UserCreationForm, self).clean()

		return cleaned_data