"use client";

import { useEffect, useState } from "react";
import { fetchEvents } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EventList() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Upcoming Events</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {events.map((event) => (
          <Card key={event.id} className="shadow-md">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p>{event.location}</p>
              <p>
                {new Date(event.start_time).toLocaleString()} –{" "}
                {new Date(event.end_time).toLocaleString()}
              </p>
              <p>
                Capacity: {event.registered_count}/{event.max_capacity}
              </p>
              <Link href={`/events/${event.id}`}>
                <Button className="mt-2">View</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
