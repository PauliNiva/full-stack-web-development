import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header coursename={course.name} />
        <Content parts={course.parts} />
        <Total total={course.parts} />
      </div>
    )
}

const Header = ({coursename}) => {
    return (
        <h2>{coursename}</h2>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Total = ({total}) => {
    const totalExercises =
    total.map(parts => parts.exercises).reduce( (sum, val) => sum + val, 0)

    return (
        <b>Total of {totalExercises} exercises</b>
    )
}

const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

export default Course