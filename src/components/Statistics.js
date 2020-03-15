import React from "react"
import styled from "styled-components"
import StatCard from "components/StatCard"
import Error from "components/Error"
import { Spinner } from "@blueprintjs/core"

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (min-width: 48rem) {
    flex-direction: row;
  }
`

const Statistics = ({ loaded, error, data }) => {
  if (error) return <Error text={error} />
  if (loaded)
    return (
      <Cards>
        <StatCard label="Confirmed" value={data.confirmed.value} />
        <StatCard label="Deaths" value={data.deaths.value} />
        <StatCard label="Recovered" value={data.recovered.value} />
        <StatCard
          label="Infected"
          value={
            data.confirmed.value - data.recovered.value - data.deaths.value
          }
        />
      </Cards>
    )

  return <Spinner intent="primary" />
}

export default Statistics
