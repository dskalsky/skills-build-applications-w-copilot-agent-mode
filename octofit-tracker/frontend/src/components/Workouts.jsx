import ResourceTable from './ResourceTable.jsx'
import { useApiCollection } from '../hooks/useApiCollection.js'

const columns = [
  { label: 'Workout', key: 'name' },
  { label: 'Category', key: 'category' },
  { label: 'Difficulty', key: 'difficulty' },
  { label: 'Duration (min)', key: 'durationMinutes' },
  {
    label: 'Exercises',
    render: (workout) =>
      Array.isArray(workout.exercises) ? workout.exercises.length : 0,
  },
  { label: 'Description', key: 'description' },
]

function Workouts() {
  const { items, loading, error } = useApiCollection(fetch, '/api/workouts/')

  return (
    <ResourceTable
      columns={columns}
      error={error}
      items={items}
      loading={loading}
      title="Workouts"
    />
  )
}

export default Workouts
