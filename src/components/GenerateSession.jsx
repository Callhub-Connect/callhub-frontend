import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    background-image: linear-gradient(to bottom right, #0a8e3d, #9fdb3f);
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const Logo = styled.img`
    height: 270px;
    width: 550px;
`;

const CodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 30px 0px 30px 30px;
    height: 200px;
    width: 850px;
    background-color: #f8f8f8b2;
    border-radius: 50px;
    box-shadow: 0px 4px 10px #00000040;
`;

const Text = styled.h3`
    height: 25px;
    width: 724px;
    color: #000000;
    font-size: 40px;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    position: relative;
    margin-bottom: 30px;
`;

const Button = styled.button`
    height: 50px;
    width: 60%;
    background-color: #0b9f43;
    border-radius: 30px 30px 30px 30px;
    position: relative;
    color: white;
    font-family: 'League Spartan', sans-serif;
    font-size: x-large;
    border: 0px solid;
    cursor: pointer;
    &:hover {
        background-color: #076a2d;
    }
`

function GenerateSession() {
    let navigate = useNavigate(); 

    // this is just for demo purposes, we're going to need to integrate this with specific session
    const routeChange = () =>{ 
        let path = `/session`; 
        navigate(path);
    }

    return(
        <Container>
            <Logo src="./img/callhubLogo-cropped.svg" alt="Callhub Logo" />
            <CodeContainer>
                <Text>Employee Side</Text>
                <Button onClick={routeChange}>Generate Session</Button>
            </CodeContainer>
        </Container>
    );
}

export default GenerateSession;
