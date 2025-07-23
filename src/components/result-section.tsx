export default function ResultSection({ score }: { score: number }) {
  return (
    <section>
      <h1>Results Section</h1>
      <div>Game Over!</div>
      <div>
        You Scored: <span>{score}</span>
      </div>
    </section>
  );
}
