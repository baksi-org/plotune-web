// src/pages/docs_pages/Extensions/Simulation.jsx
export default function Simulation() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Simulation Extensions</h1>
      <p>Generate synthetic data streams for testing.</p>

      <h2>Generators</h2>
      <ul>
        <li>Sine wave</li>
        <li>Noise (white, pink)</li>
        <li>Step / ramp</li>
      </ul>

      <p>
        Useful with <a href="?page=components-oscilloscope">Oscilloscope</a>.
      </p>
    </article>
  );
}