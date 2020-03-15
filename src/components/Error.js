import React from "react"

const Error = ({ text }) => {
  return (
    <div className="bp3-callout bp3-intent-danger">
      <h4 className="bp3-heading">Failed to load content</h4>
      {text}
    </div>
  )
}

export default Error
