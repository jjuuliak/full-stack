import { useState } from 'react'

const Statistics = (props) => {

  const all = props.good + props.neutral + props.bad
  let avg = ((props.good*1)+(props.bad*-1))/(all)
  let pos = (props.good/(all)) * 100
  if (all === 0) {
    avg = 0
    pos = 0
  }

  
  return (
    <p>
      good {props.good}<br/>
      neutral {props.neutral}<br/>
      bad {props.bad}<br/>
      all {all}<br/>
      average {avg}<br/>
      positive {pos} %
    </p>
  )
}

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
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </>
  )
}

export default App