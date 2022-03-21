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
  const sum = props.p.reduce((p, c) =>({ exercises: p.exercises + c.exercises }));
  return (
    <p>total of {sum.exercises} exercises</p>
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App