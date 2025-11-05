// src/pages/docs_pages/Calculations/Aggregations.jsx
export default function Aggregations() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Aggregations</h1>
      <p>Reduce streams to statistical summaries over windows.</p>

      <h2>Functions</h2>
      <ul>
        <li>Min / Max</li>
        <li>Average, RMS</li>
        <li>Count, Percentile</li>
      </ul>

      <p>
        Use with <a href="?page=components-statistical">Statistical component</a>.
      </p>
    </article>
  );
}