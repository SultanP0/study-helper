import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const API = "http://127.0.0.1:5000";

function CardsPage() {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetch(`${API}/decks/${deckId}/cards`)
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, [deckId]);

  function addCard() {
    if (question.trim() === "" || answer.trim() === "") {
      return;
    }
    fetch(`${API}/decks/${deckId}/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question, answer: answer }),
    })
      .then((res) => res.json())
      .then((newCard) => {
        setCards([...cards, newCard]);
        setQuestion("");
        setAnswer("");
      });
  }

  function deleteCard(id) {
    fetch(`${API}/cards/${id}`, { method: "DELETE" }).then(() => {
      setCards(cards.filter((card) => card.id !== id));
    });
  }

  return (
    <div>
      <div className="top-row">
        <Link to="/" className="back-link">
          ← Back to decks
        </Link>
        {cards.length > 0 && (
          <Link to={`/decks/${deckId}/study`} className="study-button">
            Study
          </Link>
        )}
      </div>

      <div className="card-form">
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={addCard}>Add Card</button>
      </div>

      {cards.length === 0 ? (
        <p>No cards in this deck yet.</p>
      ) : (
        <ul className="deck-list">
          {cards.map((card) => (
            <li key={card.id} className="card-item">
              <div>
                <strong>{card.question}</strong>
                <div className="card-answer">{card.answer}</div>
              </div>
              <button className="delete-button" onClick={() => deleteCard(card.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CardsPage;