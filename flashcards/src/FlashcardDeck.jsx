import { useState } from "react";

const CARDS = [
  { term: "Closure", definition: "A function that remembers the variables from the scope where it was created, even after that scope has finished running." },
  { term: "Hook", definition: "A special React function (like useState) that lets function components use state and other React features." },
  { term: "API", definition: "A set of rules that lets one piece of software request data or actions from another." },
  { term: "Recursion", definition: "When a function calls itself to solve smaller versions of the same problem until it hits a base case." },
  { term: "Promise", definition: "An object representing a value that will be available later, or an error if the async operation fails." },
  { term: "Immutable", definition: "Data that cannot be changed after creation; updates produce a new copy instead." },
];

function Card({ term, definition }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`card ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFlipped((f) => !f)}
      aria-label={flipped ? `Definition of ${term}` : `Term: ${term}`}
    >
      <div className="card-inner">
        <div className="card-face card-front">
          <span className="label">Term</span>
          <h3>{term}</h3>
        </div>
        <div className="card-face card-back">
          <span className="label">Definition</span>
          <p>{definition}</p>
        </div>
      </div>
    </div>
  );
}

export default function FlashcardDeck({ cards = CARDS }) {
  return (
    <>
      <style>{css}</style>
      <div className="deck">
        {cards.map((c) => (
          <Card key={c.term} {...c} />
        ))}
      </div>
    </>
  );
}

const css = `
.deck {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 24px;
  font-family: system-ui, sans-serif;
}
.card {
  perspective: 1000px;
  height: 160px;
  cursor: pointer;
  outline: none;
}
.card:focus-visible .card-inner { box-shadow: 0 0 0 3px #6366f1; }
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}
.card.flipped .card-inner { transform: rotateY(180deg); }
.card-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  text-align: center;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.card-front { background: #eef2ff; color: #1e1b4b; }
.card-back { background: #1e1b4b; color: #eef2ff; transform: rotateY(180deg); }
.card-face h3 { margin: 0; font-size: 1.25rem; }
.card-face p { margin: 0; font-size: 0.85rem; line-height: 1.4; }
.label {
  position: absolute;
  top: 10px;
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.6;
}
`;
