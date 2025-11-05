// src/pages/docs_pages/Extensions/Bridging.jsx
export default function Bridging() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Bridging Extensions</h1>
      <p>Translate between Plotune and third-party protocols.</p>

      <h2>Supported protocols</h2>
      <ul>
        <li>MQTT</li>
        <li>OPC-UA</li>
        <li>Modbus TCP</li>
      </ul>

      <p>
        Pair with <a href="?page=components-bridge">Bridge component</a>.
      </p>
    </article>
  );
}