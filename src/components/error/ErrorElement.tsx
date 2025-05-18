// src/components/ErrorElement.tsx
import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import './ErrorElement.css';
const ErrorElement: React.FC = () => {
    const error = useRouteError();

    let errorMessage = 'Đã xảy ra lỗi không xác định.';

    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText || error.data || errorMessage;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <div className="wrapper">
            <h1 className="title">Oops! Có lỗi xảy ra.</h1>
            <p className="subtitle">Trang không thể hiển thị vì lỗi sau:</p>
            <p className="message">{errorMessage}</p>
        </div >
    );
};

export default ErrorElement;
