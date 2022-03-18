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
    <table>
      <tbody>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={all} />
        <StatisticLine text="average" value ={avg} />
        <StatisticLine text="positive" value ={pos} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => (
  <tr><td>{props.text}</td><td>{props.value}</td></tr>
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