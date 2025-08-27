
const CoursePart = ({ name, exercises }) => {
  console.log(`Comp.CoursePart: ${name}`);
  
  return (
    <li>
      {name}: {exercises}
    </li>
  );
};

const CourseExercisesSum = ({ sum }) => {
  console.log(`Comp.CourseExercisesSum: ${sum}`);
  
  return(
    <p>
      <b>Total of {sum} exercises.</b>
    </p>
  );
}

const Course = ({ name, parts }) => {
  // Already using reduce (ex2.3).
  let exercises_sum = parts.reduce((sum, part) => sum + part.exercises, 0);
  
  console.log(`Comp.Course: ${name}, ex sum: ${exercises_sum}, with parts:`, parts);
  
  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {parts.map((part) => <CoursePart key={part.id} name={part.name} exercises={part.exercises} />)}
      </ul>
      <CourseExercisesSum sum={exercises_sum}/>
    </div>
  );
}; 

const App = () => {
  const course = {
    id: 1,
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
  };

  return (
    <Course key={course.id} name={course.name} parts={course.parts} />
  );
}

export default App;
