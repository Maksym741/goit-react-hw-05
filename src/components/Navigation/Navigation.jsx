import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

export default function Navigation() {
    const makeNavLinkClass = ({ isActive }) => clsx(css.link, isActive && css.active);

    return (
    <header className={css.container}>
        <NavLink to="/" className={makeNavLinkClass}>
        Home
        </NavLink>
        <NavLink to="/movies" className={makeNavLinkClass}>
        Movies
        </NavLink>
    </header>
    );
}
