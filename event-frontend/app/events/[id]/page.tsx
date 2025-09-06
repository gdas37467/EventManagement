"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function EventDetail() {
  const [attendees, setAttendees] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  const params = useParams();
  const eventId = params.id;

  const fetchAttendees = async (url?: string) => {
    const fetchUrl = url || `http://localhost:8000/api/events/${eventId}/attendees`;
    const res = await fetch(fetchUrl);
    const data = await res.json();
    setAttendees(data.results);
    setNextPage(data.next);
    setPrevPage(data.previous);
  };

  useEffect(() => {
    fetchAttendees();
  }, [eventId]);

  const handleAddAttendee = async () => {
    const res = await fetch(
      `http://localhost:8000/api/events/${eventId}/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      }
    );
    if (res.ok) {
      const newAttendee = await res.json();
      setAttendees((prev) => [newAttendee, ...prev]);
      setName("");
      setEmail("");
      setShowForm(false);
    } else {
      let data = await res.json()
      console.log(data.detail
      )
      alert(data.detail);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Attendees</h1>

      <Button onClick={() => setShowForm((prev) => !prev)} className="mb-4">
        {showForm ? "Cancel" : "Add Attendee"}
      </Button>

      {showForm && (
        <div className="mb-4 p-4 border rounded space-y-2">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <Button onClick={handleAddAttendee}>Register</Button>
        </div>
      )}

      <div className="space-y-2">
        {attendees.map((a, index) => (
          <div key={a.id} className="p-2 border rounded flex gap-4">
            <span className="font-bold">{index + 1}</span>
            <span>
              {a.name} &lt;{a.email}&gt;
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        <Button
          onClick={() => prevPage && fetchAttendees(prevPage)}
          disabled={!prevPage}
        >
          Previous
        </Button>
        <Button
          onClick={() => nextPage && fetchAttendees(nextPage)}
          disabled={!nextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
