import React from "react"
import Start from "./components/Start"
import Trivia from "./components/Trivia"

export default function App() {
    const [start, setStart] = React.useState(false)
    function startQuiz() {
        setStart(x => !x)
    }
    return (
        <div>
            {!start && <Start startQuiz={startQuiz}/>}
            {start && <Trivia />}
        </div>
    )
}