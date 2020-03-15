import React from 'react';
import styled from 'styled-components'


const FooterStyle = styled.footer`
  margin-top: 10vh;
  font-size: 0.9rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: -0.5rem;
  margin-right: -0.5rem;

  div {
    display: flex;
    flex-direction: column;
    width: calc(50% - 1rem);
    margin: 0.5rem;

    label {
      font-weight: bold;
    }

    span {
    }
  }


  @media (min-width: 48rem) {
    div {
      flex-grow: 1;
      width: auto;
    }
  }
`

const Footer = () => {


  return (
    <FooterStyle>
      <div>
        <label>Source Code</label>
        <span><a href="https://github.com/arnaskro/covid-19-ui">covid-19-ui</a></span>
      </div>
      <div>
        <label>API</label>
        <span><a href="https://github.com/mathdroid/covid-19-api">covid-19-api</a></span>
      </div>
      <div>
        <label>Contact me</label>
        <span><a href="mailto:arnas@kromelis.lt">arnas@kromelis.lt</a></span>
      </div>
      <div>
        <label>My website</label>
        <span><a href="https://kromelis.lt">Kromelis.lt</a></span>
      </div>
      <div>
        <label>UI toolkit</label>
        <span><a href="https://blueprintjs.com/">Blueprint</a></span>
      </div>
    </FooterStyle>
  )
}

export default Footer;