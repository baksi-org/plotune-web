// src/pages/docs_pages/API.jsx
export default function API() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>REST API</h1>
      <p>Programmatic control of the Plotune Gateway.</p>

      <h2>Base URL</h2>
      <p><code>https://api.plotune.example/v1</code></p>

      <h2>Authentication</h2>
      <p>Bearer token in <code>Authorization</code> header.</p>

      <h2>Key endpoints</h2>
      <ul>
        <li><code>GET /streams</code> – List active streams</li>
        <li><code>POST /components</code> – Create a component instance</li>
        <li><code>DELETE /components/:id</code> – Remove component</li>
      </ul>

      <p>
        Detailed OpenAPI spec available at <code>/openapi.json</code>.
      </p>
    </article>
  );
}