# events/models.py
from django.db import models
from django.utils import timezone

class Event(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    # timezone-aware datetimes (Django stores in UTC if USE_TZ=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    max_capacity = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ["start_time"]

    def __str__(self):
        return f"{self.name} @ {self.location} ({self.start_time.isoformat()})"

    @property
    def registered_count(self):
        return self.attendees.count()

    @property
    def available_spots(self):
        return max(0, self.max_capacity - self.registered_count)

class Attendee(models.Model):
    event = models.ForeignKey(Event, related_name="attendees", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    registered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("event", "email")
        ordering = ["-registered_at"]

    def __str__(self):
        return f"{self.name} <{self.email}> for {self.event_id}"
