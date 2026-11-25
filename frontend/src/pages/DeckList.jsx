import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API = "http://127.0.0.1:5000";

function DeckList() {
  const [decks, setDecks] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`${API}/decks`)
      .then((res) => res.json())
      .then((data) => setDecks(data));
  }, []);

  function addDeck() {
    if (name.trim() === "") {
      return;
    }
    fetch(`${API}/decks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name }),
    })
      .then((res) => res.json())
      .then((newDeck) => {
        setDecks([newDeck, ...decks]);
        setName("");
      });
  }

  function deleteDeck(id) {
    fetch(`${API}/decks/${id}`, { method: "DELETE" }).then(() => {
      setDecks(decks.filter((deck) => deck.id !== id));
    });
  }

  return (
    <div>
      <div className="add-row">
        <input
          type="text"
          placeholder="New deck name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addDeck}>Add Deck</button>
      </div>

      {decks.length === 0 ? (
        <p>No decks yet. Add one above.</p>
      ) : (
        <ul className="deck-list">
          {decks.map((deck) => (
            <li key={deck.id} className="deck-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
              <button className="delete-button" onClick={() => deleteDeck(deck.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeckList;