import React from "react"

export default function Start(props) {
    return (
        <div className="start">
            <h2 className="start-title">Quizical</h2>
            <h5 className="start-description">Frensi Angjo</h5>
            <button onClick={props.startQuiz} className="start-button">Start quiz</button>
        </div>
    )
}