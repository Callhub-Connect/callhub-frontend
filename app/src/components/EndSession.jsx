import styled from 'styled-components'

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
`;

const Button = styled.button`
    height: 55px;
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

function EndSession() {
    return(
        <Container>
            <Logo src="./img/callhubLogo-cropped.svg" alt="Callhub Logo" />
            <CodeContainer>
                <Text>Your session has now ended.</Text>
                <Button>Get Email Transcript</Button>
            </CodeContainer>
        </Container>
    );
}

export default EndSession