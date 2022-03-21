const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>  
      {props.p.map(prop => <Part key={prop.id} p={prop.name} e={prop.exercises}/>)}
    </div>
  )
}

const Total = (props) => {
  let sum = 0
  props.p.map(prop => sum += prop.exercises)
  return (
    <p>Number of exercises {sum}</p>
  )
}

const Part = (props) => {
  return (
    <p>{props.p} {props.e}</p>
  )
}

const Course = (props) => {
  return (
    <>
      <Header course={props.course.name} />
      <Content p={props.course.parts}/>
      <Total p={props.course.parts}/>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App