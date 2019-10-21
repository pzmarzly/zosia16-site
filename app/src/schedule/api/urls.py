# -*- coding: utf-8 -*-
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from schedule.api import views

urlpatterns = format_suffix_patterns([
    path(r'', views.ScheduleList.as_view(), name="schedule-list"),
    path(r'<int:pk>/', views.ScheduleDetail.as_view(), name="schedule-detail"),
    path(r'events/', views.EventList.as_view(), name="event-list"),
    path(r'events/<int:pk>/', views.EventDetail.as_view(), name="event-detail"),
])
