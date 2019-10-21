from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from schedule.api.serializers import EventSerializer, ScheduleSerializer
from schedule.models import Event, Schedule
from utils.api import ReadAuthenticatedWriteAdmin


class EventViewSet(ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]


class ScheeduleViewSet(ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [ReadAuthenticatedWriteAdmin]
