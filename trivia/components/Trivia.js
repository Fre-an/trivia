import React from "react"
import Question from "../components/Question"
import {nanoid} from "nanoid"

export default function Trivia() {
    const [questions, setQuestions] = React.useState([])
    const [finish, setFinish] = React.useState(false)
    const [correct, setCorrect] = React.useState([])
    
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    
    React.useEffect(function() {
        if (!finish) {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(quest => getQuestions(quest.results))
        setCorrect([])
        }
    }, [finish])
    
    function getQuestions(data) {
        const tempQuestions = data.map(question => {
            const arr = question.incorrect_answers.map(choice => {
            return {
                choice:decodeHtml(choice),
                isHeld:false,
                correct: false
                }
            })
            arr.splice(Math.floor(Math.random() * (arr.length + 1)), 0, {choice:decodeHtml(question.correct_answer), isHeld: false, correct: true});
            const tempId = nanoid()
            const tempQuestion = {
                question: decodeHtml(question.question),
                choices: arr,
                id: tempId,
                key: tempId
            }
            return tempQuestion
        })
        setQuestions(tempQuestions)
    }
    
    function handleClick(id, choice) {
        setQuestions(questions.map(question => {
            if (question.id === id) {
                return {...question,
                        choices:question.choices.map(item => {
                            if(item.choice === choice) {
                                return {...item, isHeld:true}
                            }
                            return {...item, isHeld: false}
                        })}
            } else {
                return question
            }
        }))
    }
    
    const questShow = questions.map(quest => (
        <Question 
        key={quest.id}
        id={quest.id}
        question={quest.question}
        choices={quest.choices}
        finish={finish}
        answered_correct={correct}
        handleClick={handleClick}
        />
    ))
    function submitAnswers() {
        
        for(let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].choices.length; j++) {
                if(questions[i].choices[j].isHeld && questions[i].choices[j].correct) {
                    setCorrect(prevCorrect => [...prevCorrect, true])
                } else {
                    setCorrect(prevCorrect => [...prevCorrect, false])
                }
            }
        }
        
        setFinish(x => !x)
    }
    
    return (
        <div className="trivia">
            {questShow}
            {finish && <h4>You scored {correct.filter(Boolean).length}/5 correct answers</h4>}
            <button onClick={submitAnswers} className="submit">{finish ? "Play again" : "Check answers"}</button>
        </div>
    )
}