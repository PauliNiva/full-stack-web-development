import React, { useState } from 'react'

const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad
  let average = ((props.good * 1) + (props.bad * -1)) / all
  let positive = (props.good / all) * 100

  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
  <table>
    <tbody>
    <StatisticLine text="good" value={props.good} />
    <StatisticLine text="neutral" value={props.neutral} />
    <StatisticLine text="bad" value={props.bad} />
    <StatisticLine text="all" value={all} />
    <StatisticLine text="average" value={average} />
    <StatisticLine text="positive" value={positive} />
    </tbody>
  </table>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text, value}) => {
  if (text === "positive") {
    return <tr><td>{text}</td><td>{value}</td><td>%</td></tr>
  }
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App