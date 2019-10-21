from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from schedule.api.serializers import EventSerializer, ScheduleSerializer
from schedule.models import Event, Schedule


class EventDetail(APIView):
    def get(self, request, version, pk, format=None):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class EventList(APIView):
    def get(self, request, version, format=None):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ScheduleDetail(APIView):
    def get(self, request, version, pk, format=None):
        schedule = get_object_or_404(Schedule, pk=pk)
        serializer = ScheduleSerializer(schedule, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, version, pk, format=None):
        schedule = get_object_or_404(Schedule, pk=pk)
        schedule.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class ScheduleList(APIView):
    def post(self, request, version, format=None):
        serializer = ScheduleSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, version, format=None):
        schedules = Schedule.objects.all()
        serializer = ScheduleSerializer(schedules, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
