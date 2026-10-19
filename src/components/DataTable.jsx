// Simple responsive table. columns: [{ key, label, render? }]
export default function DataTable({ columns, rows, caption }) {
  return (
    <div className="table-scroll" tabIndex={0} role="region" aria-label={caption}>
      <table className="data-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>{columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function StatusBadge({ status }) {
  const tone = { Open: 'badge-warn', 'In review': 'badge-accent', Resolved: 'badge-ok', Active: 'badge-ok', Suspended: 'badge-warn' }[status] ?? ''
  return <span className={`badge ${tone}`}>{status}</span>
}
