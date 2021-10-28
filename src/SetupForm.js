import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const {quiz, handleChange, handleSubmit, error} = useGlobalContext()
  return <main>
    <section className='quiz quiz-small'>
      <form className='setup-form'>
        <h1>quiz app</h1>
        {/* amount */}
        <div className="form-control">
          <label htmlFor="number">number of questions</label>
          <input type="text" name='number' id='number' min={1}
              max={50} className='form-input' value={quiz.number} onChange={handleChange} />
        </div>
        {/* category */}
        <div className="form-control">
          <label htmlFor="category">category</label>
          <select name='category' className='form-input'  id='category' value={quiz.category} onChange={handleChange}>
            <option value="history">history</option>
            <option value="sports">sports</option>
            <option value="politics">politics</option>
            <option value="science">science</option>

            <option value="films">films</option>
            <option value="music">music</option>
            <option value="computers">computers</option>
            <option value="mathematics">mathematics</option>
            <option value="geography">geography</option>
            <option value="gadgets">gadgets</option>
            <option value="general_knowlwdge">general_knowlwdge</option>
            <option value="any">Any</option>
          </select>
        </div>
        {/* difficulty */}
        <div className="form-control">
          <label htmlFor="difficulty">category</label>
          <select name='difficulty' className='form-input' id='difficulty' value={quiz.difficulty} onChange={handleChange}>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
        {error && (
            <p className='error'>
              can't generate questions, please try different options
            </p>
          )}
          <button type='submit' onClick={handleSubmit} className='submit-btn'>
            start
          </button>
      </form>
    </section>
  </main>
}

export default SetupForm
