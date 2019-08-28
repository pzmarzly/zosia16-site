
from django.contrib import admin
from .models import Event, Schedule, ScheduleEntry, ScheduleDay

admin.site.register(Event)
admin.site.register(Schedule)
admin.site.register(ScheduleDay)
admin.site.register(ScheduleEntry)
