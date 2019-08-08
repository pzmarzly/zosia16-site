from rest_framework import serializers

from .models import Event

class EventSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects)

    class Meta:
        model = Event
        fields = ("title", "description")
