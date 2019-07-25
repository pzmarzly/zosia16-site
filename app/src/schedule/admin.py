
from django.contrib import admin
from .models import Event, Schedule, ScheduleEntry


admin.site.register(Event)
admin.site.register(Schedule)
admin.site.register(ScheduleEntry)
