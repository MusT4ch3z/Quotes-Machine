import React, { useState, useEffect, } from "react";
import { Col, Container, Row, Button } from 'react-bootstrap';

function Quote_box() {
  const quoteURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
  const colorsArr = ['#590d22', "#c44900", '#023047', '#69995D', '#04151f', '#6a040f', '#3a606e', '#b5179e', '#004b23', '#012a4a', '#890620', '#c879ff', '#344e41']

  const [quoteArray, setQuoteArray] = useState(null);
  const [currentQuote, setCurrentQuote] = useState({ quote: 'You are', author: "Awesome!" })
  const [accentColor, setAccentColor] = useState('#590d22');

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const jsoned = await response.json();
    setQuoteArray(jsoned.quotes);
  }

  useEffect(() => {
    fetchQuotes(quoteURL);
    // console.log(quoteArray);
  }, [quoteURL])

  useEffect(() => {
    if (quoteArray) {
      getRandomQuote()
    }
  }, [quoteArray])

  const getRandomQuote = () => {
    let randomNum = Math.floor(Math.random() * quoteArray.length)
    let randomColor = Math.floor(Math.random() * colorsArr.length)
    setAccentColor(colorsArr[randomColor])
    setCurrentQuote(quoteArray[randomNum]);
  }

  return (
    <div id="quote-box" style={{ backgroundColor: `${accentColor}`, color: `${accentColor}` }}>
      <Container>
        <Row className="justify-content-md-center">
          <Col id="text" md='auto'>
            "{currentQuote.quote}"
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col id="author" md='auto'>
            -{currentQuote.author}
          </Col>
        </Row>
        <div className="buttonsLine">
          <Button id="tweet-quote"
            style={{ backgroundColor: `${accentColor}` }}
            href={`https://twitter.com/intent/tweet?text=${currentQuote.quote}-${currentQuote.author}&hashtags=quote`}
          >
            Tweet me
          </Button>
          <Button id="new-quote" style={{ backgroundColor: `${accentColor}` }}
            onClick={getRandomQuote}
          >
            Be wiser!
          </Button>
        </div>
      </Container>
    </div>
  )
}
export default Quote_box