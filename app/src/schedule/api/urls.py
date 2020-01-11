# -*- coding: utf-8 -*-
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from schedule.api import views

urlpatterns = format_suffix_patterns([
    path("", views.ScheeduleViewSet.as_view({"get": "list", "post": "create"}),
         name="schedule-list"),
    path("<int:pk>/", views.ScheeduleViewSet.as_view({"get": "retrieve",
                                                      "put": "partial_update",
                                                      "delete": "destroy"}),
         name="schedule-detail"),
    path("events/", views.EventViewSet.as_view({"get": "list"}), name="event-list"),
    path("events/<int:pk>/", views.EventViewSet.as_view({"get": "retrieve"}), name="event-detail"),
])
