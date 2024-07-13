import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
    <div>
        <h1>Page Not Found</h1>
        <Link to="/">Go to Home Page</Link>
    </div>
    );
}
