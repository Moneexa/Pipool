import React from 'react';
import { Link } from "react-router-dom";

export function Signup({ match }) {
    return (
        <>
            <Link to="/dashboard/overview">Click to signup</Link>
        </>
    );
}
