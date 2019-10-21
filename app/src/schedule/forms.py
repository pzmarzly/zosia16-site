# -*- coding: utf-8 -*-
from django import forms

from schedule.models import Event


class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = ['title', 'description', 'duration', 'notes']
