import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const API = "http://127.0.0.1:5000";

function StudyPage() {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch(`${API}/decks/${deckId}/cards`)
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, [deckId]);

  if (cards.length === 0) {
    return (
      <div>
        <Link to={`/decks/${deckId}`} className="back-link">
          ← Back to cards
        </Link>
        <p>No cards to study in this deck yet.</p>
      </div>
    );
  }

  const card = cards[index];

  function nextCard() {
    setShowAnswer(false);
    setIndex((index + 1) % cards.length);
  }

  function previousCard() {
    setShowAnswer(false);
    setIndex((index - 1 + cards.length) % cards.length);
  }

  return (
    <div>
      <Link to={`/decks/${deckId}`} className="back-link">
        ← Back to cards
      </Link>

      <p className="progress">
        Card {index + 1} of {cards.length}
      </p>

      <div className="study-card" onClick={() => setShowAnswer(!showAnswer)}>
        {showAnswer ? (
          <div>
            <div className="study-label">Answer</div>
            <div className="study-text">{card.answer}</div>
          </div>
        ) : (
          <div>
            <div className="study-label">Question</div>
            <div className="study-text">{card.question}</div>
          </div>
        )}
      </div>

      <div className="study-controls">
        <button onClick={previousCard}>Previous</button>
        <button onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? "Show Question" : "Show Answer"}
        </button>
        <button onClick={nextCard}>Next</button>
      </div>
    </div>
  );
}

export default StudyPage;