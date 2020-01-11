# -*- coding: utf-8 -*-
from django.contrib import admin

from schedule.models import Event, Schedule, ScheduleDay, ScheduleEntry

admin.site.register(Event)
admin.site.register(Schedule)
admin.site.register(ScheduleDay)
admin.site.register(ScheduleEntry)
