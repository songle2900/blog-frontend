import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 1024px;
    margin: 0 auto; /* Center aligned */

    /* Change horizontal size based on browser size */
    @media (max-width: 1024px) {
        width: 768px;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Responsive = ({ children, ...rest }) => {
    // Pass it to ResponsiveBlock using ... rest to use props like 
    // style, className, onClick, onMouseMove, etc
    return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;