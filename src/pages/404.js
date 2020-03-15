import React, { useState } from "react"
import { Spinner } from "@blueprintjs/core"
import { isClient } from "utils/layout"
import "normalize.css/normalize.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "@blueprintjs/core/lib/css/blueprint.css"

export default () => {
  const [redirected, setRedirected] = useState(false)

  if (!redirected && isClient()) {
    window.location = "/"
    setRedirected(true)
  }
  return <Spinner intent="primary" />
}
