import { useState, useEffect } from "react"
import Api from "utils/Api"

const useData = (path = "") => {
  const [state, setState] = useState({
    loading: false,
    loaded: false,
    error: null,
    data: null,
  })

  useEffect(() => {
    if (!state.loading && !state.loaded && !state.error) {
      setState(state => ({ ...state, loading: true, loaded: false }))

      Api.get(path)
        .then(data => {
          setState(state => ({ ...state, loading: false, loaded: true, data }))
        })
        .catch(err => {
          setState(state => ({
            ...state,
            loading: false,
            loaded: false,
            error: err.message,
          }))
        })
    }
  }, [state])

  return state
}

export default useData
