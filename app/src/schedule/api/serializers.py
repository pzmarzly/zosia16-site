from rest_framework import serializers

from schedule.models import Event, Schedule, ScheduleDay, ScheduleEntry


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ["id", "title", "description"]


class ScheduleEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleEntry
        fields = ["start", "end", "event"]


class ScheduleDaySerializer(serializers.ModelSerializer):
    entries = ScheduleEntrySerializer(many=True, read_only=True)

    class Meta:
        model = ScheduleDay
        fields = ["id", "name", "start", "entries"]


class ScheduleSerializer(serializers.ModelSerializer):
    days = ScheduleDaySerializer(many=True, read_only=True)

    class Meta:
        model = Schedule
        fields = ["id", "name", "days", "is_active"]
