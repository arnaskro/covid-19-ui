import React, { useState } from "react"
import styled from "styled-components"
import NumberFormat from "react-number-format"
import Error from "components/Error"
import Statistics from "components/Statistics"
import useData from "hooks/useData"
import dayjs from "dayjs"
import { Spinner, Button, MenuItem } from "@blueprintjs/core"
import { Select } from "@blueprintjs/select"
import Helmet from "react-helmet"

const MainText = styled.div`
  margin-bottom: 3rem;
`

const SelectWrapper = styled.div`
  max-height: 32rem;
  margin-bottom: 1rem;
`

const Details = styled.div`
  font-size: 1rem;
  margin-bottom: 5rem;
`

const MainContent = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    label: "World",
    value: null,
  })
  const countries = useData("countries")
  const summary = useData()
  const country = useData(
    `countries/${selectedCountry.label}`,
    Boolean(selectedCountry.value),
    `countries/${selectedCountry.value}`
  )

  const isLoaded = summary.loaded && countries.loaded
  const error = summary.error || countries.error
  if (Boolean(error)) return <Error text={error} />

  if (isLoaded) {
    const activeData = selectedCountry.value === null ? summary : country

    const items = [
      { label: "World", value: null },
      ...Object.keys(countries.data.countries).map(key => ({
        label: key,
        value: countries.data.iso3[countries.data.countries[key]],
      })),
    ]

    return (
      <main>
        <Helmet>
          <meta property="og:image" content={summary.data.image} />
        </Helmet>
        <Details>
          <p>
            Last Update: <i>{dayjs(summary.data.lastUpdate).format("L LTS")}</i>
          </p>
          <p>
            Source:{" "}
            <a href={summary.data.source}>John Hopkins University CSSE</a>
          </p>
        </Details>
        <MainText>
          <p>
            More than{" "}
            <NumberFormat
              value={summary.data.confirmed.value}
              displayType="text"
              thousandSeparator={true}
            />{" "}
            cases of coronavirus (COVID-19) have been registered in the world.
            <br />
            In this page you can see data about infections, deaths & recoveries
            and filter by country.
          </p>
        </MainText>

        <SelectWrapper>
          <Select
            items={items}
            noResults={<MenuItem disabled={true} text="No results." />}
            itemPredicate={(query, { label, value }, _index) => {
              const normalizedTitle = label.toLowerCase()
              const normalizedValue = (value || "world").toLowerCase()
              const normalizedQuery = query.toLowerCase()

              return (
                `${normalizedTitle} ${normalizedValue}`.indexOf(
                  normalizedQuery
                ) >= 0
              )
            }}
            itemRenderer={({ label, value }, { handleClick, modifiers }) => {
              return (
                <MenuItem
                  key={label}
                  label={value}
                  text={label}
                  active={modifiers.active}
                  onClick={() => handleClick(value)}
                />
              )
            }}
            onItemSelect={selection => {
              setSelectedCountry(selection)
            }}
          >
            <Button
              text={selectedCountry ? selectedCountry.label : "World"}
              rightIcon="double-caret-vertical"
            />
          </Select>
        </SelectWrapper>

        <Statistics
          loaded={
            isLoaded &&
            (selectedCountry.value === null ||
              (selectedCountry.value !== null && country.loaded))
          }
          error={error || country.error}
          data={activeData.data}
        />
      </main>
    )
  }

  return <Spinner intent="primary" />
}

export default MainContent
