
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^events/(?P<version>(v1))/(?P<pk>\d+)', views.EventDetail.as_view(), name="event-detail"),
    url(r'^$', views.index, name='schedule'),
    url(r'^add_event$', views.add_event, name='add_event'),
    url(r'^event/(?P<event_id>\d+)/edit$', views.edit_event, name='event edit'),
    url(r'^event/(?P<event_id>\d+)/show$', views.show_event, name='event_show'),
    url(r'^events$', views.events, name='events'),
    url(r'^planner', views.planner, name='planner'),
]