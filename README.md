# Study Helper

A full stack flashcard app. Create decks, add question and answer cards, and study a deck one card at a time.

## Features

- Create and delete decks
- Add and delete cards inside each deck
- Study mode: flip each card to see the answer, and move through the deck
- Data is saved in a SQLite database
- Multiple pages with React Router

## Tech Stack

- **Frontend:** React, Vite, React Router
- **Backend:** Python, Flask, flask-cors
- **Database:** SQLite

## How to Run It

You need Python and Node.js installed.

### 1. Backend

From the main folder:

```
pip install flask flask-cors
python app.py
```

The API runs at http://127.0.0.1:5000

### 2. Frontend

In a second terminal:

```
cd frontend
npm install
npm run dev
```

Open the link Vite shows (usually http://localhost:5173).

## API Routes

| Method | Route | What it does |
| --- | --- | --- |
| GET | /decks | List all decks |
| POST | /decks | Create a deck |
| DELETE | /decks/<id> | Delete a deck and its cards |
| GET | /decks/<id>/cards | List the cards in a deck |
| POST | /decks/<id>/cards | Add a card to a deck |
| DELETE | /cards/<id> | Delete a card |

## What I Learned

- Designing a database with two linked tables (decks and cards)
- Building a REST API in Flask with GET, POST and DELETE routes
- Using React Router with URL parameters to open a specific deck
- Managing state in React to build a flip-through study mode