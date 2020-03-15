import React, { useState, useCallback } from "react"
import { Helmet } from "react-helmet"
import styled, { createGlobalStyle } from "styled-components"
import "normalize.css/normalize.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "@blueprintjs/core/lib/css/blueprint.css"
// import useCountries from "hooks/useCountries"
import Footer from "components/Footer"
import MainContent from "components/MainContent"
import localizedFormat from 'dayjs/plugin/localizedFormat'
import dayjs from 'dayjs'
import { Button, Icon, Switch, Popover, Position, Tooltip, FocusStyleManager } from "@blueprintjs/core"
dayjs.extend(localizedFormat)
FocusStyleManager.onlyShowFocusOnTabs();

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }

  body {
    font-size: 1.125rem;
    background: ${props => props.isDark ? '#293742' : 'rgb(255, 255, 255)'};
    transition: background 200ms ease, color 200ms ease;

    width: 100%;
    max-width: 62rem;
    margin: 0 auto;
    padding: 0 1rem;


    @media (min-width: 48rem) {
      font-size: 1.25rem;
    }
  }


`

const Header = styled.header`
  display: flex;
  justify-content: space-between;

  > div {
    padding: 2.5rem 1rem 1rem;

    .bp3-icon {
      top: -0.0625rem;
      position: relative;
      margin-left: 1rem;
    }

    label {
      margin: 0;
    }
  }
`

const App = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "true")

  const changeTheme = useCallback((theme) => {
    console.log("newTheme", theme)
    localStorage.setItem("theme", theme)
    setIsDark(theme)
  }, [setIsDark])

  return (
    <>
      <GlobalStyle isDark={isDark} />
      <Helmet>
        <title>COVID19 updates</title>
        <meta
          name="description"
          content="Updates on infections, deaths & recoveries from the COVID-19 (Coronavirus)"
        />
      </Helmet>
      <div className={isDark ? 'bp3-dark' : ''}>
        <Header>
          <h1>COVID19</h1>
          <div>
            <Tooltip content="Change theme" position={Position.LEFT}>
              <Switch large={true} alignIndicator={"right"} checked={isDark} label={<Icon icon={isDark ? 'moon' : 'flash'} iconSize={16} />} onChange={() => changeTheme(!isDark)} />
            </Tooltip>
          </div>
        </Header>
        <MainContent />
        <Footer />
      </div>
    </>
  )
}

export default App
