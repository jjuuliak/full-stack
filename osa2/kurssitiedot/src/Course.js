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

  export default Course