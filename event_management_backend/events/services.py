# events/services.py
from django.db import transaction
from django.db.models import F
from django.core.exceptions import ValidationError
from .models import Event, Attendee

class RegistrationError(Exception):
    pass

def register_attendee_for_event(event_id: int, name: str, email: str) -> Attendee:
   
    email = email.lower().strip()
    with transaction.atomic():
       
        try:
            event = Event.objects.select_for_update().get(pk=event_id)
        except Event.DoesNotExist:
            raise RegistrationError("Event does not exist.")

        if event.attendees.filter(email=email).exists():
            raise RegistrationError("This email is already registered for the event.")

        if event.attendees.count() >= event.max_capacity:
            raise RegistrationError("Event is full; cannot register more attendees.")

        attendee = Attendee.objects.create(event=event, name=name, email=email)
        return attendee
