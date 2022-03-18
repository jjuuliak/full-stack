import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <button onClick={() => setGood(good + 1)}> good </button>
        <button onClick={() => setNeutral(neutral + 1)}> neutral </button>
        <button onClick={() => setBad(bad + 1)}> bad </button>

      </div>
      <div>
        <h1>statistics</h1>
        
        <p>
          good {good}<br/>
          neutral {neutral}<br/>
          bad {bad}<br/>
          all {good+neutral+bad}<br/>
          average {((good*1)+(bad*-1))/(good+neutral+bad)}<br/>
          positive {(good/(good+neutral+bad)) * 100} %
        </p>
      </div>
    </>
  )
}

export default App