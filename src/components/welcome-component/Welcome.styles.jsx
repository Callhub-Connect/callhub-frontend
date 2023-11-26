import styled from 'styled-components';

export const Container = styled.div`
    background-image: linear-gradient(to bottom right, #0a8e3d, #9fdb3f);
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;  
    align-items: center;
    width: 100%;
`;

export const Logo = styled.img`
    height: 270px;
    width: 550px;
`;

export const Button = styled.button`
    height: 55px;
    width: 20%;
    background-color: #f8f8f8b2;
    border-radius: 30px 30px 30px 30px;
    position: relative;
    color: black;
    font-family: 'League Spartan', sans-serif;
    font-size: x-large;
    border: 0px solid;
    cursor: pointer;
    &:hover {
        background-color: white;
    }
    &:first-child {
        margin-right: 10px; // Add right margin to the first button
    }
    &:last-child {
        margin-left: 10px; // Add left margin to the last button
    }
`;