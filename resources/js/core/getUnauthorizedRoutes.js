import React from 'react';
import LoginPage from '../components/pages/LoginPage';
import NotFoundPage from '../components/pages/NotFoundPage';

const getUnauthorizedRoutes = () => (
    <>
        <LoginPage path="/"/>
        <LoginPage path="/login"/>
        <NotFoundPage default/>
    </>
);

export default getUnauthorizedRoutes;
