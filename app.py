from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


def get_db():
    conn = sqlite3.connect("studyhelper.db")
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.execute(
        "CREATE TABLE IF NOT EXISTS decks ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT, "
        "name TEXT NOT NULL)"
    )
    conn.execute(
        "CREATE TABLE IF NOT EXISTS cards ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT, "
        "deck_id INTEGER NOT NULL, "
        "question TEXT NOT NULL, "
        "answer TEXT NOT NULL)"
    )
    conn.commit()
    conn.close()


@app.route("/")
def home():
    return jsonify({"message": "Study Helper API is running"})


@app.route("/decks", methods=["GET"])
def get_decks():
    conn = get_db()
    rows = conn.execute(
        "SELECT id, name FROM decks ORDER BY id DESC").fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])


@app.route("/decks", methods=["POST"])
def add_deck():
    data = request.get_json()
    name = data.get("name", "").strip()
    if not name:
        return jsonify({"error": "Name is required"}), 400
    conn = get_db()
    cursor = conn.execute("INSERT INTO decks (name) VALUES (?)", (name,))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return jsonify({"id": new_id, "name": name}), 201


@app.route("/decks/<int:deck_id>", methods=["DELETE"])
def delete_deck(deck_id):
    conn = get_db()
    conn.execute("DELETE FROM cards WHERE deck_id = ?", (deck_id,))
    conn.execute("DELETE FROM decks WHERE id = ?", (deck_id,))
    conn.commit()
    conn.close()
    return jsonify({"deleted": deck_id})


@app.route("/decks/<int:deck_id>/cards", methods=["GET"])
def get_cards(deck_id):
    conn = get_db()
    rows = conn.execute(
        "SELECT id, deck_id, question, answer FROM cards WHERE deck_id = ? ORDER BY id",
        (deck_id,),
    ).fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])


@app.route("/decks/<int:deck_id>/cards", methods=["POST"])
def add_card(deck_id):
    data = request.get_json()
    question = data.get("question", "").strip()
    answer = data.get("answer", "").strip()
    if not question or not answer:
        return jsonify({"error": "Question and answer are required"}), 400
    conn = get_db()
    cursor = conn.execute(
        "INSERT INTO cards (deck_id, question, answer) VALUES (?, ?, ?)",
        (deck_id, question, answer),
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return (
        jsonify(
            {"id": new_id, "deck_id": deck_id,
                "question": question, "answer": answer}
        ),
        201,
    )


@app.route("/cards/<int:card_id>", methods=["DELETE"])
def delete_card(card_id):
    conn = get_db()
    conn.execute("DELETE FROM cards WHERE id = ?", (card_id,))
    conn.commit()
    conn.close()
    return jsonify({"deleted": card_id})


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
