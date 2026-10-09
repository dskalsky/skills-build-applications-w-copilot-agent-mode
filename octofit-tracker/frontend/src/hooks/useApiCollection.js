import { useEffect, useState } from 'react'
import { apiUrl, getCollection } from '../api.js'

export function useApiCollection(fetcher, endpoint) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const response = await fetcher(apiUrl(endpoint), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}.`)
        }

        setItems(getCollection(await response.json()))
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'The request could not be completed.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void loadCollection()
    return () => controller.abort()
  }, [endpoint, fetcher])

  return { items, loading, error }
}
