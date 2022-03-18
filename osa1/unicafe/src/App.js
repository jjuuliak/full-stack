import { useState } from 'react'

const Statistics = (props) => {

  const all = props.good + props.neutral + props.bad
  let avg = ((props.good*1)+(props.bad*-1))/(all)
  let pos = ((props.good/(all)) * 100) + " %"
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
  return (
    <div>
      <StatisticLine text="good" value ={props.good} /><br/>
      <StatisticLine text="neutral" value ={props.neutral} /><br/>
      <StatisticLine text="bad" value ={props.bad} /><br/>
      <StatisticLine text="all" value ={all} /><br/>
      <StatisticLine text="average" value ={avg} /><br/>
      <StatisticLine text="positive" value ={pos} />
    </div>
  )
}

const StatisticLine = (props) => (
  <>{props.text} {props.value}</>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />

      </div>
      <div>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </>
  )
}

export default App