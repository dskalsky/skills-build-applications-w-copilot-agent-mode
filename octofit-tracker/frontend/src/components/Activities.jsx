import ResourceTable from './ResourceTable.jsx'
import { useApiCollection } from '../hooks/useApiCollection.js'

const columns = [
  { label: 'User', render: (activity) => activity.user },
  { label: 'Activity', key: 'activityType' },
  { label: 'Duration (min)', key: 'durationMinutes' },
  { label: 'Distance (km)', key: 'distanceKm' },
  { label: 'Points', key: 'points' },
  {
    label: 'Performed',
    render: (activity) =>
      activity.performedAt ? new Date(activity.performedAt).toLocaleString() : null,
  },
]

function Activities() {
  const { items, loading, error } = useApiCollection(fetch, '/api/activities/')

  return (
    <ResourceTable
      columns={columns}
      error={error}
      items={items}
      loading={loading}
      title="Activities"
    />
  )
}

export default Activities
