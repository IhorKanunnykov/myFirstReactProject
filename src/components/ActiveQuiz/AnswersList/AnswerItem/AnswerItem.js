import React from 'react'
import './AnswerItem.css'

const AnswerItem = props => {
    const cls = ['answerItem']

    if (props.state) {//суда прилетает props.state, это success или error
        //в зависимости от правильности ответа,далее я буду поменять стиль css
        //для фона ответа success-зеленый,,,
        cls.push(props.state)
    }
    return (
        <li
            onClick={() => props.onAnswerClick(props.answer.id)}
            className={cls.join(' ')}//тут положил динамический класс
        //что склеивается в строку после того,как прилетает props.state
        //по клику
        >
            {props.answer.text}

        </li>
    )
}
export default AnswerItem