import React from "react"

export default function Question(props) {
    
    const showChoices = props.choices.map(c => {
        let styles 
        if (props.finish) {
            if (c.isHeld) {
                styles = {
                    backgroundColor: c.correct ? "#94D7A2" : "#F8BCBC"
                }
            } else {
                styles = {
                    backgroundColor: c.correct ? "#94D7A2" : "#F5F7FB"
                }
            }
        } else {
            styles = {
                backgroundColor: c.isHeld ? "#D6DBF5" : "#F5F7FB"
            }
        }
            
        return <button 
                key={c.id}
                style={styles}
                id={c.id}
                onClick={() => props.handleClick(props.id, c.choice)}
                className="choices" 
                >{c.choice}</button>})
    return (
        <div className="question-all">
            <h3 className="question">{props.question}</h3>
            <div className="choices-all">{showChoices}</div>
        </div>
    )
}