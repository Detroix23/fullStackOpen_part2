
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

export default CourseList;