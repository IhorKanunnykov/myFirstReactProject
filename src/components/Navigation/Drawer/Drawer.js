import React, { Component } from 'react'
import './Drawer.css'
import BackDrop from '../../UI/BackDrop/BackDrop'
import { NavLink } from 'react-router-dom'

const links = [
    { to: '/', label: 'Список', exact: true },
    { to: '/auth', label: 'Авторизация', exact: false },
    { to: '/quiz-creator', label: 'Создать тест', exact: false }
]

class Drawer extends Component {
    clickHandler = () => {
        this.props.onClose()
    }
    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={'active'}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }
    render() {
        const cls = ['drawer']
        if (!this.props.isOpen) {
            cls.push('close')
        }
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.onClose} /> : null}

            </React.Fragment>
        )
    }
}
export default Drawer