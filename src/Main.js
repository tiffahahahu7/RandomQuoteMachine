import { useEffect, useState } from 'react'
import axios from 'axios'
import { TwitterShareButton, TwitterIcon } from 'react-share'
import Saved from './Saved';

const Main = () => {
  const [quote, setQuote] = useState({})
  const [savedQuotes, setSavedQuotes] = useState([])
  const [isSaveBoxVisible, setSaveBoxVisible] = useState(false)

  useEffect(() => {
    fetchQuote()
    const savedQuotesData = localStorage.getItem("savedQuotes")
    if (savedQuotesData !== "[]") {
      setSavedQuotes(JSON.parse(savedQuotesData))
      setSaveBoxVisible(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes))
  }, [savedQuotes])

  const fetchQuote = () => {
    axios.get('https://api.quotable.io/quotes/random')
      .then(response => {
        const randomQuote = response.data[0]
        const { content, author } = randomQuote;
        setQuote({ content, author })
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleClickAdd = () => {
    fetchQuote()
  }

  const handleClickSave = () => {
    const isQuoteSaved = savedQuotes.some((savedQuote) => {
      return savedQuote.content === quote.content && savedQuote.author === quote.author
    })
    
    if (!isQuoteSaved) {
      setSavedQuotes([...savedQuotes, quote])
      setSaveBoxVisible(true)
    } 
  }

  const handleDelete = (quote) => {
    const updatedQuotes = savedQuotes.filter((savedQuote) => savedQuote.content !== quote.content)
    setSavedQuotes(updatedQuotes)
  }
  
  const handleClear = () => {
    setSavedQuotes([])
  }

  return (
    <div id="main-container">
      <div id="quote-box">
        <div className="quote-container">
          <div className="quote-content">
            <q id="text">{quote.content}</q>
            <p id="author"> - {quote.author}</p>
          </div>
        </div>
        <div className="interac-container">
          <div className='button-container'>
            <button onClick={handleClickAdd}>New Quote</button>
            <button onClick={handleClickSave}>Save Quote</button>
          </div>
          <div>
            <TwitterShareButton title={`${quote.content} - ${quote.author}`} url={window.location.href}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
        </div>
      </div>
      {isSaveBoxVisible && <Saved quote={savedQuotes} onDelete={handleDelete} onClear={handleClear}/>}
      <div id="footer">
        <p>Created By Tiffany Hu 2023</p>
      </div>
    </div>
  )
}

export default Main;