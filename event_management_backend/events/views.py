# events/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from django.utils import timezone
from django.db.models import Q

from .models import Event, Attendee
from .serializers import EventSerializer, AttendeeSerializer, CreateAttendeeSerializer
from .services import register_attendee_for_event, RegistrationError

from rest_framework.pagination import PageNumberPagination

class AttendeePageNumberPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100

class EventView(APIView):
    def get(self, request):
        now = timezone.now()
        events = Event.objects.filter(end_time__gte=now).order_by("start_time")
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RegisterAttendeeView(APIView):
  
    def post(self, request, event_id):
        serializer = CreateAttendeeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        name = serializer.validated_data["name"]
        email = serializer.validated_data["email"]
        try:
            attendee = register_attendee_for_event(event_id=event_id, name=name, email=email)
        except RegistrationError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"detail": "Failed to register attendee."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        out = AttendeeSerializer(attendee)
        return Response(out.data, status=status.HTTP_201_CREATED)

class AttendeeListView(generics.ListAPIView):
 
    serializer_class = AttendeeSerializer
    pagination_class = AttendeePageNumberPagination

    def get_queryset(self):
        event_id = self.kwargs.get("event_id")
        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            raise NotFound("Event not found.")
        return event.attendees.all().order_by("-registered_at")
