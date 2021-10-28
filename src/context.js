import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
  science: 17,
  films: 11,
  music: 12,
  computers: 18,
  mathematics: 19,
  geography: 22,
  gadgets: 30,
  any: 10,
  general_knowlwdge: 9
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''

const tempUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

const [loading, setLoading] = useState(true)
const [waiting, setWaiting] = useState(true)
const [questions, setQuestions] = useState([])
const [correct, setCorrect] = useState(0)
const [index, setIndex] = useState(0)
const [isModelOpen, setIsModelOpen] = useState(false)
const [error, setError] = useState(false)
const [quiz, setQuiz] = useState({
  number: 10,
  category: 'sports',
  difficulty: 'easy'
})


const fetchUrl = async (url) => {
  setLoading(true)
  setWaiting(false)
  const response = await axios(url).catch((error)=> console.log(error))
  
  if (response) {
      const data = response.data.results
  
      if (data.length > 0) {
        setQuestions(data)
        setWaiting(false)
        setLoading(false)
        setError(false)
      }
    } else {
      setWaiting(true)
      setError(true)
    }
}

const checkAnswer = (value) => {
  if (value) {
    setCorrect((old) => old + 1)
  }
  nextQuestion()
}

const nextQuestion = () => {
  setIndex((old) => {
    const index = old + 1
    if (index > questions.length - 1) {
      openModel()
      return 0
    }
      return index

  })
}

const openModel = () => {
  setIsModelOpen(true)
}

const closeModel = () => {
  setWaiting(true)
  setCorrect(0)
  setIsModelOpen(false)
}

const handleChange = (e) => {
  const name = e.target.name
  const value = e.target.value
  setQuiz({...quiz, [name]: value})
}
const handleSubmit = (e) => {
  e.preventDefault()

  const API_ENDPOINT = 'https://opentdb.com/api.php?'

  const url = `https://opentdb.com/api.php?amount=10&category=${table[quiz.category]}&difficulty=medium&type=multiple`

  const tempUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple   ${API_ENDPOINT}amount=${quiz.number}&difficulty=${quiz.difficulty}&category=30&type=multiple' 

  fetchUrl(url)
}




  return <AppContext.Provider
   value={{loading,
          waiting,
          questions,
          correct,
          index,
          isModelOpen,
          nextQuestion,
          checkAnswer,
          openModel,
          closeModel,
          quiz,
          handleChange,
          handleSubmit,
        }}
        >{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
