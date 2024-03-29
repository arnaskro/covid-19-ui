import { useState, useEffect } from "react"
import Api from "utils/Api"

const useData = (path = "", enabled = true, secondary = null) => {
  const [state, setState] = useState({
    path: null,
    loading: false,
    loaded: false,
    error: null,
    data: null,
  })

  useEffect(() => {
    if (enabled && !state.loading && state.path !== path) {
      setState(state => ({
        ...state,
        loading: true,
        loaded: false,
        path,
        error: null,
      }))

      Api.get(path)
        .then(data => {
          setState(state => ({
            ...state,
            loading: false,
            loaded: true,
            data,
          }))
        })
        .catch(async err => {
          if (secondary) {
            return Api.get(secondary).then(data => {
              setState(state => ({
                ...state,
                loading: false,
                loaded: true,
                data,
              }))
            })
          } else throw new Error(`API error. ${path}`)
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
  }, [secondary, path, state, enabled])

  return state
}

export default useData
