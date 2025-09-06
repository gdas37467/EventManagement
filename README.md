# Event Management System

A simple Event Management System built with **Django** (backend) and **Next.js + Shadcn UI** (frontend). Users can create events, register attendees, and view attendee lists.

---

## Features

- Create, list, and manage events
- Register attendees for events
- Prevent overbooking
- Prevent duplicate attendee registration
- View attendee lists (paginated)
- Timezone-aware datetimes (IST → other timezones)
- Clean architecture using Django ORM
- CORS enabled for Next.js frontend

---

## Tech Stack

- Backend: Django, Django REST Framework, PostgreSQL
- Frontend: Next.js, React, Shadcn UI
- ORM: Django ORM
- Database: PostgreSQL
- Environment Management: `.env` via `python-decouple`

---

## Project Setup

### 1️⃣ Clone the repository
```bash
git clone github.com/gdas37467/EventManagement
cd event-management

2️⃣ Setup Backend (Django)
Install dependencies
cd  event_management_backend
pip install -r requirements.txt

Create .env in the root (same level as manage.py)
SECRET_KEY=your_django_secret_key
DEBUG=True
DB_NAME=event_db
DB_USER=events_user
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432

Run migrations
python manage.py makemigrations
python manage.py migrate

Run the Django server
python manage.py runserver 8000

3️⃣ Setup Frontend (Next.js)
Navigate to frontend folder
cd event-frontend

Install dependencies
npm install

Run Next.js dev server
npm run dev


Frontend should now be available at http://localhost:3000
.

4️⃣ CORS Configuration

Backend must allow requests from frontend:

Make sure django-cors-headers is installed

Add to INSTALLED_APPS and MIDDLEWARE

Add allowed origins in settings.py:

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

5️⃣ API Endpoints
Method	Endpoint	Description
POST	/api/events/	Create new event
GET	/api/events/	List all events
POST	/api/events/{id}/register/	Register attendee
GET	/api/events/{id}/attendees/	Get attendee list (paginated)


6️⃣ Notes

Ensure PostgreSQL is running locally

Use .env to store secrets and DB credentials

Attendee list is paginated (default 10 per page)

Timezone handling is automatic via Django USE_TZ=True
