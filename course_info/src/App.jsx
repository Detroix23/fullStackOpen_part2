
const CoursePart = ({ name, exercises }) => (
  <li>
    {name}: {exercises}
  </li>
);

const CourseExercisesSum = ({ sum }) => (
  <p>
    <b>Total of {sum} exercises.</b>
  </p>
);


const Course = ({ name, parts }) => {
  // Already using reduce (ex2.3).
  let exercises_sum = parts.reduce((sum, part) => sum + part.exercises, 0);
  
  console.log(`Comp.Course: ${name}, ex sum: ${exercises_sum}, with parts:`, parts);
  
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {parts.map((part) => <CoursePart key={part.id} name={part.name} exercises={part.exercises} />)}
      </ul>
      <CourseExercisesSum sum={exercises_sum}/>
    </div>
  );
}; 

const CourseList = ({ courses }) => courses.map((course) => (
    <Course key={course.id} name={course.name} parts={course.parts} />
  ));

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
  ];

  return (
    <>
      <h1>COURSE INFO 2</h1>
      <CourseList courses={courses} />
    </>
    
  );
}

export default App;
