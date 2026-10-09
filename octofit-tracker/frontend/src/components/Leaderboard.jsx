import ResourceTable from './ResourceTable.jsx'
import { useApiCollection } from '../hooks/useApiCollection.js'

const columns = [
  { label: 'Rank', key: 'rank' },
  { label: 'User', render: (entry) => entry.user },
  { label: 'Team', render: (entry) => entry.team },
  { label: 'Points', key: 'points' },
  { label: 'Period', key: 'period' },
]

function Leaderboard() {
  const { items, loading, error } = useApiCollection(fetch, '/api/leaderboard/')

  return (
    <ResourceTable
      columns={columns}
      error={error}
      items={items}
      loading={loading}
      title="Leaderboard"
    />
  )
}

export default Leaderboard
