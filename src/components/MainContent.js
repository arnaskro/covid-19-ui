import React, { useState } from "react"
import styled from "styled-components"
import NumberFormat from "react-number-format"
import StatCard from "components/StatCard"
import useData from "hooks/useData"
// import useCountries from "hooks/useCountries"
import dayjs from "dayjs"
import { Spinner } from "@blueprintjs/core"
import Helmet from "react-helmet"

const Details = styled.div`
  font-size: 1.15rem;
  margin-bottom: 5vh;
`

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 48rem) {
    flex-direction: row;
  }
`

const MainContent = () => {
  // const [country, setCountry] = useState()
  const { loaded, data, error } = useData()

  if (loaded)
    return (
      <main>
        <Helmet>
          <meta property="og:image" content={data.image} />
        </Helmet>
        <Details>
          <p>
            Last Update: <i>{dayjs(data.lastUpdate).format("L LTS")}</i>
          </p>
          <p>
            Source: <a href={data.source}>John Hopkins University CSSE</a>
          </p>
        </Details>
        <p>
          More than{" "}
          <NumberFormat
            value={data.confirmed.value}
            displayType="text"
            thousandSeparator={true}
          />{" "}
          cases of coronavirus (COVID-19) have been registered in the world.
          <br />
          In this page you can see data about infections, deaths & recoveries
          and filter by country.
        </p>

        <Cards>
          <StatCard label="Confirmed" value={data.confirmed.value} />
          <StatCard label="Deaths" value={data.deaths.value} />
          <StatCard label="Recovered" value={data.recovered.value} />
        </Cards>
      </main>
    )

  return <Spinner intent="primary" />
}

export default MainContent
