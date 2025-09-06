"use client";

import { useState } from "react";
import { createEvent } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateEvent() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    start_time: "",
    end_time: "",
    max_capacity: 10,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createEvent(form);
    alert("Event created!");
    setForm({ name: "", location: "", start_time: "", end_time: "", max_capacity: 10 });
  };

  const handleSubmit1 = async (e: React.FormEvent) => {
  e.preventDefault();

    console.log(form)
    const result = await createEvent(form);

   if(result.ok)
   {

       alert("Event created!");
       setForm({ name: "", location: "", start_time: "", end_time: "", max_capacity: 10 });
   }else{
      alert(result.end_time);
    console.log(result)
   }


};

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-bold">Create Event</h1>
      <form onSubmit={handleSubmit1} className="grid gap-4 max-w-md">
        <Input placeholder="Event Name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Location" value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <Input type="datetime-local" value={form.start_time}
          onChange={(e) => setForm({ ...form, start_time: e.target.value })} />
        <Input type="datetime-local" value={form.end_time}
          onChange={(e) => setForm({ ...form, end_time: e.target.value })} />
        <Input type="number" value={form.max_capacity}
          onChange={(e) => setForm({ ...form, max_capacity: Number(e.target.value) })} />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
