import React from 'react';
import { Link } from "react-router-dom";

export function Login({ match }) {
    return (
        <>
            <h1>Hello</h1>
            <Link to="/dashboard/overview">Click to login</Link>
        </>
    );
}
