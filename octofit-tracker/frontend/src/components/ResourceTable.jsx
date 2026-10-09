function displayValue(value) {
  if (value === null || value === undefined || value === '') {
    return '-'
  }

  if (typeof value === 'object') {
    return value.displayName ?? value.username ?? value.name ?? value._id ?? '-'
  }

  return value
}

function ResourceTable({ title, items, columns, loading, error }) {
  return (
    <section>
      <h1 className="h2 mb-4">{title}</h1>

      {loading && (
        <p className="text-secondary" role="status">
          Loading {title.toLowerCase()}...
        </p>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="alert alert-info">No {title.toLowerCase()} found.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-striped table-hover align-middle mb-0 bg-white">
            <thead className="table-primary">
              <tr>
                {columns.map((column) => (
                  <th key={column.label} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? index}>
                  {columns.map((column) => (
                    <td key={column.label}>
                      {displayValue(column.render ? column.render(item) : item[column.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ResourceTable
