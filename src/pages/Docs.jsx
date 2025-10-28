import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';
import localOpenApiSpec from "../data/openapi.json";

const Docs = () => {
  const [activeSection, setActiveSection] = useState('rest-api');
  const [apiDocs, setApiDocs] = useState(localOpenApiSpec); // Default to local spec
  const [expandedEndpoints, setExpandedEndpoints] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.docs-card');
      let current = 'rest-api';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Açılır/kapanır endpoint toggle
  const toggleEndpoint = (key) => {
    setExpandedEndpoints((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Unique tags'leri paths'den topla
  const getTags = () => {
    if (!apiDocs?.paths) return [];
    const tagsSet = new Set();
    Object.values(apiDocs.paths).forEach((pathData) => {
      Object.values(pathData).forEach((method) => {
        if (method.tags) {
          method.tags.forEach((tag) => tagsSet.add(tag));
        }
      });
    });
    return Array.from(tagsSet);
  };

  // Sidebar için menü oluşturma
  const getSidebarItems = () => {
    return [
      { id: 'rest-api', label: 'REST API', icon: 'fa-server' },
      { id: 'schemas', label: 'API Schemas', icon: 'fa-database' },
    ];
  };

  // Schema $ref çözme
  const resolveRef = (ref) => {
    if (!ref) return null;
    const refName = ref.split('/').pop();
    return apiDocs?.components?.schemas?.[refName] || null;
  };

  // Schema render fonksiyonu
  const renderSchema = (schema, level = 0) => {
    if (!schema) return <span className="text-gray-text">No schema</span>;

    if (schema.$ref) {
      const resolved = resolveRef(schema.$ref);
      if (resolved) {
        return renderSchema(resolved, level);
      }
      return <span className="text-gray-text">No schema definition for {schema.$ref}</span>;
    }

    if (schema.type === 'object' || schema.properties) {
      return (
        <div className={`ml-${level * 4}`}>
          <table className="w-full text-gray-text border-collapse">
            <tbody>
              {Object.entries(schema.properties || {}).map(([key, prop]) => (
                <tr key={key} className="border-b border-white/10">
                  <td className="py-2 px-4 font-semibold">{key}</td>
                  <td className="py-2 px-4">{prop.type || 'any'}</td>
                  <td className="py-2 px-4">{prop.description || 'No description'}</td>
                  <td className="py-2 px-4">
                    {prop.required ? '(Required)' : ''}
                    {prop.default !== undefined ? ` (Default: ${JSON.stringify(prop.default)})` : ''}
                    {prop.items ? ` [Array of ${prop.items.type || (prop.items.$ref ? prop.items.$ref.split('/').pop() : 'items')}]` : ''}
                  </td>
                </tr>
              ))}
              {schema.additionalProperties && (
                <tr className="border-b border-white/10">
                  <td className="py-2 px-4 font-semibold">Additional Properties</td>
                  <td colSpan="3" className="py-2 px-4">
                    {typeof schema.additionalProperties === 'object' ? renderSchema(schema.additionalProperties, level + 1) : 'Allowed'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {schema.required && schema.required.length > 0 && (
            <p className="text-gray-text mt-2">Required fields: {schema.required.join(', ')}</p>
          )}
        </div>
      );
    }

    if (schema.type === 'array') {
      return (
        <div className="text-gray-text">
          Array of {schema.items?.$ref ? schema.items.$ref.split('/').pop() : schema.items?.type || 'items'}
          {schema.items && <div className="ml-4">{renderSchema(schema.items, level + 1)}</div>}
        </div>
      );
    }

    return <span className="text-gray-text">{schema.type || 'unknown'}{schema.description ? `: ${schema.description}` : ''}</span>;
  };

  // OpenAPI endpoint'lerini render etme
  const renderRestApiSection = () => {
    const paths = apiDocs?.paths || {};
    const tag = 'Gateway API';
    const endpoints = Object.entries(paths).filter(([_, pathData]) =>
      Object.values(pathData).some((method) => method.tags?.includes(tag))
    );

    return (
      <Element
        name="rest-api"
        className="bg-dark-card rounded-custom p-8 border border-white/5 hover:border-primary/30 hover:shadow-custom transition-all duration-300 mb-8 docs-card"
      >
        <h2 className="text-2xl font-bold text-light-text mb-5 border-b border-white/10 pb-4">REST API Endpoints</h2>
        <p className="text-gray-text mb-6">API endpoints for interacting with the Plotune Gateway.</p>
        {endpoints.map(([path, pathData]) =>
          Object.entries(pathData).map(([method, details]) => {
            const endpointKey = `${path}-${method}`;
            const isExpanded = expandedEndpoints[endpointKey];
            return (
              <details
                key={endpointKey}
                open={isExpanded}
                onToggle={() => toggleEndpoint(endpointKey)}
                className="mb-4 bg-dark-surface rounded-custom p-4 border border-white/5"
              >
                <summary className="cursor-pointer flex items-center">
                  <span
                    className={`inline-block px-3 py-1 rounded text-white font-bold mr-3 ${
                      method.toUpperCase() === 'GET' ? 'bg-blue-500' :
                      method.toUpperCase() === 'POST' ? 'bg-green-500' :
                      method.toUpperCase() === 'PUT' ? 'bg-yellow-500' :
                      method.toUpperCase() === 'DELETE' ? 'bg-red-500' : 'bg-gray-500'
                    }`}
                  >
                    {method.toUpperCase()}
                  </span>
                  <span className="text-lg font-semibold text-light-text">{path}</span>
                </summary>
                <div className="mt-4 pl-4">
                  <p className="text-gray-text font-semibold mb-2">{details.summary || 'No summary'}</p>
                  <p className="text-gray-text mb-4 whitespace-pre-wrap">{details.description || 'No description'}</p>
                  {details.parameters && details.parameters.length > 0 && (
                    <>
                      <h4 className="text-lg font-semibold text-light-text mt-5 mb-3">Parameters</h4>
                      <table className="w-full text-gray-text border-collapse mb-4">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">In</th>
                            <th className="py-2 px-4 text-left">Type</th>
                            <th className="py-2 px-4 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {details.parameters.map((param, idx) => (
                            <tr key={idx} className="border-b border-white/10">
                              <td className="py-2 px-4">{param.name}</td>
                              <td className="py-2 px-4">{param.in}</td>
                              <td className="py-2 px-4">{param.schema?.type || 'unknown'}</td>
                              <td className="py-2 px-4">{param.description || 'No description'} {param.required ? '(Required)' : ''}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                  {details.requestBody && (
                    <>
                      <h4 className="text-lg font-semibold text-light-text mt-5 mb-3">Request Body {details.requestBody.required ? '(Required)' : ''}</h4>
                      <p className="text-gray-text mb-2">{details.requestBody.description || 'No description'}</p>
                      {details.requestBody.content?.['application/json']?.schema && (
                        <div className="bg-dark-surface p-4 rounded-custom mb-4">
                          <h5 className="text-md font-semibold text-light-text mb-2">Schema:</h5>
                          {renderSchema(details.requestBody.content['application/json'].schema)}
                        </div>
                      )}
                    </>
                  )}
                  {details.responses && (
                    <>
                      <h4 className="text-lg font-semibold text-light-text mt-5 mb-3">Responses</h4>
                      <table className="w-full text-gray-text border-collapse">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="py-2 px-4 text-left">Code</th>
                            <th className="py-2 px-4 text-left">Description</th>
                            <th className="py-2 px-4 text-left">Schema</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(details.responses).map(([code, response]) => (
                            <tr key={code} className="border-b border-white/10">
                              <td className="py-2 px-4">{code}</td>
                              <td className="py-2 px-4">{response.description || 'No description'}</td>
                              <td className="py-2 px-4">
                                {response.content?.['application/json']?.schema ? (
                                  renderSchema(response.content['application/json'].schema)
                                ) : (
                                  'No schema'
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </details>
            );
          })
        )}
      </Element>
    );
  };

  // Schemas bölümünü render etme
  const renderSchemasSection = () => {
    const schemas = apiDocs?.components?.schemas || {};
    return (
      <Element
        name="schemas"
        className="bg-dark-card rounded-custom p-8 border border-white/5 hover:border-primary/30 hover:shadow-custom transition-all duration-300 mb-8 docs-card"
      >
        <h2 className="text-2xl font-bold text-light-text mb-5 border-b border-white/10 pb-4">API Schemas</h2>
        <p className="text-gray-text mb-6">Data models used in the API requests and responses.</p>
        {Object.entries(schemas).map(([schemaName, schemaDef]) => (
          <details key={schemaName} className="mb-4 bg-dark-surface rounded-custom p-4 border border-white/5">
            <summary className="cursor-pointer text-lg font-semibold text-light-text">{schemaName}</summary>
            <div className="mt-4 pl-4">
              <p className="text-gray-text mb-4">{schemaDef.description || 'No description'}</p>
              <div className="bg-dark-surface p-4 rounded-custom">
                {renderSchema(schemaDef)}
              </div>
            </div>
          </details>
        ))}
      </Element>
    );
  };

  return (
    <>
      <section className="min-h-[50vh] flex flex-col justify-center py-36 bg-gradient-to-br from-primary/10 to-secondary/10 text-center">
        <div className="container mx-auto px-5">
          <h1 className="text-4xl md:text-5xl font-bold text-light-text mb-5">Plotune Gateway API</h1>
          <p className="text-lg text-gray-text max-w-2xl mx-auto mb-6">
            Explore the Plotune Gateway API endpoints and data models for building extensions.
          </p>

        </div>
      </section>
      <div className="container mx-auto px-5 flex flex-col md:flex-row gap-10 py-12">
        
        <div className="md:w-64 flex-shrink-0 md:sticky md:top-24">
          <ul className="bg-dark-card rounded-custom overflow-hidden border border-white/5">
            {getSidebarItems().map((item) => (
              <li key={item.id}>
                <ScrollLink
                  to={item.id}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className={`flex items-center py-3 px-5 text-gray-text hover:bg-white/5 hover:text-primary transition-all duration-300 cursor-pointer ${
                    activeSection === item.id ? 'bg-primary/10 text-primary' : ''
                  }`}
                >
                  <i className={`fas ${item.icon} mr-3`}></i> {item.label}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          {apiDocs ? (
            <>
              {renderRestApiSection()}
              {renderSchemasSection()}
            </>
          ) : (
            <div className="bg-dark-card rounded-custom p-8 border border-white/5 text-gray-text">
              Loading API documentation...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Docs;