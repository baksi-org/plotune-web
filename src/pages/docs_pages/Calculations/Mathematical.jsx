// src/pages/docs_pages/Calculations/Mathematical.jsx
export default function Mathematical() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Mathematical</h1>
      <p>Basic arithmetic, trigonometry, and signal-processing functions.</p>

      <h2>Available ops</h2>
      <ul>
        <li>Add, Subtract, Multiply, Divide</li>
        <li>Sin, Cos, FFT</li>
        <li>Derivative / Integral</li>
      </ul>

      <p>
        See <a href="?page=calculations-aggregations">Aggregations</a> for summary stats.
      </p>
    </article>
  );
}