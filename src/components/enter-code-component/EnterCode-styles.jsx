import styled from "styled-components";

export const Container = styled.div`
    background-image: linear-gradient(to bottom right, #0a8e3d, #9fdb3f);
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    @media (max-width: 768px) {
        /* Add styles for smaller screens here */
        /* For example, reduce the font size or change the container width */
        font-size: 16px;
        width: 100%;
    }
`;

export const Logo = styled.img`
    height: 270px;
    width: 550px;

    @media (max-width: 768px) {
        /* Add styles for smaller screens here */
        /* For example, reduce the image size */
        height: 200px;
        width: 400px;
    }
`;

export const CodeContainer = styled.div`
align-items: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 30px;
    height: 200px;
    width: 850px;
    background-color: #f8f8f8b2;
    border-radius: 50px;
    box-shadow: 0px 4px 10px #00000040;

    @media (max-width: 768px) {
        /* Add styles for smaller screens here */
        /* For example, reduce the width or remove padding */
        width: 90%;
        padding: 10px;
    }
`;

export const Text = styled.h3`
    color: #000000;
    font-family: Helvetica;
    font-size: 40px;
    font-weight: 400;
    line-height: normal;
    height: 24px;
    width: 724px;
    margin-bottom: 20px;
    font-family: 'League Spartan', sans-serif;

    @media (max-width: 768px) {
        /* Add styles for smaller screens here */
        /* For example, reduce the font size or width */
        width: 90%;
        font-size: 26px;
        text-align: center;
    }
`;

export const InputSection = styled.div`
    height: 70px;
    width: 724px;
    display: flex;
    flex-direction: row;

    @media (max-width: 768px) {
        /* Add styles for smaller screens here */
        /* For example, reduce the width or change the flex-direction */
        width: 90%;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }
`;

export const Input = styled.input`
    border-radius: 30px 0px 0px 30px;
    border: 0px solid;
    width: 80%;
    height: 50px;
    padding: 8px 16px;
    line-height: 20px;
    font-size: x-large;
    font-family: 'League Spartan', sans-serif;
    ::placeholder {
        color: #5e5e5ec4;
        font-size: 18px;
    }

    @media (max-width: 768px) {
        /* Add styles for smaller screens here */
        /* For example, change the width or padding */
        padding: 10px;
        border-radius: 30px;
        text-align: center;
    }
`;

export const Button = styled.button`
    height: 50px;
    width: 30%;
    font-family: 'League Spartan', sans-serif;
    background-color: #0b9f43;
    border-radius: 0px 30px 30px 0px;
    position: relative;
    color: white;
    font-size: x-large;
    border: 0px solid;
    cursor: pointer;
    &:hover {
        background-color: #076a2d;
    }

    @media (max-width: 768px) {
        /* Add styles for smaller screens here */
        /* For example, change the width or font-size */
        font-size: 20px;
        padding: 10px;
        border-radius: 30px;
    }
`;