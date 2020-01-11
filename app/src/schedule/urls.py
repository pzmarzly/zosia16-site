# -*- coding: utf-8 -*-
from django.urls import re_path

from . import views

urlpatterns = [
    re_path(r'^$', views.index, name='schedule'),
    re_path(r'^add_event$', views.add_event, name='add_event'),
    re_path(r'^event/(?P<event_id>\d+)/edit$', views.edit_event, name='event edit'),
    re_path(r'^event/(?P<event_id>\d+)/show$', views.show_event, name='event_show'),
    re_path(r'^events$', views.events, name='events'),
    re_path(r'^planner', views.planner, name='planner'),
]
