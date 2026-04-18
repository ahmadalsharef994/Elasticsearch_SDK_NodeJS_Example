# Elasticsearch SDK — Node.js Examples

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20+-green?logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Elasticsearch-8.x-yellow?logo=elasticsearch" alt="Elasticsearch">
  <img src="https://img.shields.io/badge/full--text%20search-examples-orange" alt="Search">
  <img src="https://img.shields.io/badge/Docker-local%20cluster-blue?logo=docker" alt="Docker">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
</p>

A comprehensive collection of **Elasticsearch 8.x SDK examples in Node.js** — from basic CRUD to advanced full-text search, aggregations, fuzzy search, and geo-queries.

---

## 📚 Examples Covered

| Example | Description |
|---------|-------------|
| `01-basic-crud` | Index, get, update, delete documents |
| `02-full-text-search` | `match`, `multi_match`, `query_string` |
| `03-aggregations` | Terms, range, histogram, date histogram |
| `04-fuzzy-search` | Typo-tolerant search with fuzziness |
| `05-autocomplete` | Edge n-gram analyzer for suggestions |
| `06-geo-queries` | `geo_distance`, `geo_bounding_box` |
| `07-bulk-indexing` | High-throughput bulk API |
| `08-scroll-api` | Paginate through large result sets |

---

## 🚀 Quick Start

```bash
# Start Elasticsearch locally
docker-compose up -d

# Install and run
npm install
node examples/01-basic-crud.js
```

---

## 💡 Key Code Snippets

### Full-Text Search
```js
const result = await client.search({
  index: 'products',
  query: {
    multi_match: {
      query: 'wireless headphones',
      fields: ['title^3', 'description'],
      fuzziness: 'AUTO',
    }
  },
  highlight: { fields: { title: {}, description: {} } }
});
```

### Aggregation
```js
const result = await client.search({
  index: 'products',
  aggs: {
    price_ranges: {
      range: {
        field: 'price',
        ranges: [{ to: 50 }, { from: 50, to: 200 }, { from: 200 }]
      }
    }
  },
  size: 0
});
```

---

## 📄 License

MIT
