import ResourceTable from './ResourceTable.jsx'
import { useApiCollection } from '../hooks/useApiCollection.js'

const columns = [
  { label: 'Name', key: 'displayName' },
  { label: 'Username', key: 'username' },
  { label: 'Email', key: 'email' },
  { label: 'Team', render: (user) => user.team },
  { label: 'Total points', key: 'totalPoints' },
]

function Users() {
  const { items, loading, error } = useApiCollection(fetch, '/api/users/')

  return (
    <ResourceTable
      columns={columns}
      error={error}
      items={items}
      loading={loading}
      title="Users"
    />
  )
}

export default Users
