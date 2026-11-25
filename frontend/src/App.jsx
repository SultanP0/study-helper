import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeckList from "./pages/DeckList";
import CardsPage from "./pages/CardsPage";
import StudyPage from "./pages/StudyPage";

function App() {
  return (
    <BrowserRouter>
      <h1>Study Helper</h1>
      <Routes>
        <Route path="/" element={<DeckList />} />
        <Route path="/decks/:deckId" element={<CardsPage />} />
        <Route path="/decks/:deckId/study" element={<StudyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;