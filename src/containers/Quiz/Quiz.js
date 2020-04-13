import React, { Component } from 'react'
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends Component {
    state = {
        results: {},//{[id]: success error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null,//тут храню стейт ответа, он либо правильный,либо нет
        quiz: [],
        loading: true
    }
    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {//проверка,если true, то нужно 
            //запретить обработку последующих кликов до  окончания
            //работы setTimeout
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return //то будет пустой ретерн,чтоо выйдет из
                //метода onAnswerClickHandler, и дальнейшие клики
                //не будут обработаны до появления след вопроса
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: { [answerId]: 'success' },
                results
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {//тут отлавливаю последний вопрос
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null//обнуляю его,так как в момент клика
                        //я подменяю с его помощью класс,что подсвечивает
                        //правильный или не правильный ответ
                    })
                }
                window.clearTimeout(timeout)//убрал утечку памяти,очистив timeout 
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: { [answerId]: 'error' },
                results
            })
        }
    }
    isQuizFinished() {//если номер вопроса = длине всего массива,то есть 
        //последнему вопросу, этот метод вернет true и в проверке выше, 
        //переключение вопросов нужно прервать
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }
    async componentDidMount() {
        try {
            const response = await axios.get(`quizes/${this.props.match.params.id}.json`)
            const quiz = response.data
            this.setState({
                quiz,
                loading: false
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    render() {
        return (
            <div className={'quiz'}>
                <div className={'quizWrapper'}>
                    <h1>Дайте ответы на все вопросы</h1>
                    {
                        this.state.loading
                            ? Loader
                            : this.state.isFinished
                                ? <FinishedQuiz
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    onRetry={this.retryHandler}
                                />//тернанрый ? :
                                : <ActiveQuiz
                                    answers={this.state.quiz[this.state.activeQuestion].answers}
                                    question={this.state.quiz[this.state.activeQuestion].question}
                                    onAnswerClick={this.onAnswerClickHandler}
                                    quizLength={this.state.quiz.length}
                                    answerNumber={this.state.activeQuestion + 1}
                                    state={this.state.answerState}
                                />

                    }
                </div>
            </div>
        )
    }
}

export default Quiz