from rest_framework import serializers

from .models import Event, Schedule, ScheduleEntry, ScheduleDay

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ("title", "description", "pk")

class ScheduleEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleEntry
        fields = ['start', 'end', 'event']

class ScheduleDaySerializer(serializers.ModelSerializer):
    entries = ScheduleEntrySerializer(many=True, read_only=True)
    class Meta:
        model = ScheduleDay
        fields = ['name', 'start', 'entries', 'pk']

class ScheduleSerializer(serializers.ModelSerializer):
    days = ScheduleDaySerializer(many=True, read_only=True)
    class Meta:
        model = Schedule
        fields = ['name', 'is_active', 'days']


