import ResourceTable from './ResourceTable.jsx'
import { useApiCollection } from '../hooks/useApiCollection.js'

const columns = [
  { label: 'Team', key: 'name' },
  { label: 'Description', key: 'description' },
  {
    label: 'Members',
    render: (team) => (Array.isArray(team.members) ? team.members.length : 0),
  },
  { label: 'Total points', key: 'totalPoints' },
]

function Teams() {
  const { items, loading, error } = useApiCollection(fetch, '/api/teams/')

  return (
    <ResourceTable
      columns={columns}
      error={error}
      items={items}
      loading={loading}
      title="Teams"
    />
  )
}

export default Teams
