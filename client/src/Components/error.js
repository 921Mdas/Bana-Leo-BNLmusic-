
import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
    return (
        <div>
            <h1> 404 PAGE DOESNT EXIST </h1>
            <Link to="/"> click here to return to Home page</Link>
        </div>
    )
}

export default ErrorPage;
