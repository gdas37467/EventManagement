const API_BASE = "http://localhost:8000";

export async function fetchEvents() {
  const res = await fetch(`${API_BASE}/api/events`);
//   console.log(res.json())
  return res.json();
}

export async function createEvent(data: any) {
  const res = await fetch(`${API_BASE}/api/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function registerAttendee(eventId: number, data: any) {
  const res = await fetch(`${API_BASE}/api/events/${eventId}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchAttendees(eventId: number, page: number = 1) {
  const res = await fetch(`${API_BASE}/api/events/${eventId}/attendees/?page=${page}`);
  return res.json();
}
