import React from "react"
import styled from "styled-components"
import NumberFormat from "react-number-format"
import { Card } from "@blueprintjs/core"

const StatCardStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0.5rem 0;

  .bp3-card {
    display: flex;
    flex-direction: column;
    label {
      font-weight: bold;
    }

    span {
    }
  }

  @media (min-width: 48rem) {
    margin: 1rem;

    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`

const StatCard = ({ label, value }) => {
  return (
    <StatCardStyle>
      <Card>
        <label>{label}</label>
        <NumberFormat
          value={value}
          displayType="text"
          thousandSeparator={true}
        />
      </Card>
    </StatCardStyle>
  )
}

export default StatCard
