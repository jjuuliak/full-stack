const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
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
    <p><b>total of {sum.exercises} exercises</b></p>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <Course key={course.id} course={course}/>
      )}
    </div>
  )
}

export default App