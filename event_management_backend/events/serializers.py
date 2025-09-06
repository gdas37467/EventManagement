# events/serializers.py
from rest_framework import serializers
from .models import Event, Attendee
from django.utils import timezone
from datetime import datetime
from zoneinfo import ZoneInfo

IST = ZoneInfo("Asia/Kolkata")

def parse_datetime_assume_ist_if_naive(value):
    if isinstance(value, datetime):
        dt = value
    else:
        dt = value

    if dt is None:
        return None

    if dt.tzinfo is None:
        aware = dt.replace(tzinfo=IST)
        return aware
    return dt

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ["id", "name", "location", "start_time", "end_time", "max_capacity", "created_at","registered_count", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at","registered_count"]

    def validate(self, attrs):
        start = attrs.get("start_time")
        end = attrs.get("end_time")

        if start is not None:
            start = parse_datetime_assume_ist_if_naive(start)
        if end is not None:
            end = parse_datetime_assume_ist_if_naive(end)

        if start and end and end <= start:
            raise serializers.ValidationError({"end_time": "end_time must be after start_time."})

        attrs["start_time"] = timezone.make_aware(start) if start and start.tzinfo is None else start
        attrs["end_time"] = timezone.make_aware(end) if end and end.tzinfo is None else end

        return attrs

class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendee
        fields = ["id", "event", "name", "email", "registered_at"]
        read_only_fields = ["id", "registered_at", "event"]

class CreateAttendeeSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()

    def validate_email(self, value):
        return value.lower()
