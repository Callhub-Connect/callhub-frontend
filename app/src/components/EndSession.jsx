import styled from 'styled-components'

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.img`
    height: 420px;
    width: 1520px;
`;

const CodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: 10px;
    padding: 30px 0px 30px 30px;
    height: 250px;
    width: 1078px;
    background-color: #f8f8f8b2;
    border-radius: 50px;
    box-shadow: 0px 4px 10px #00000040;
`;

const Text = styled.h3`
    height: 30px;
    width: 724px;
    color: #000000;
    font-size: 48px;
    font-weight: 400;
    line-height: normal;
    padding-left: 60px;
    position: relative;
`;

const Button = styled.button`
    height: 65px;
    width: 920px;
    background-color: #0b9f43;
    border-radius: 30px 30px 30px 30px;
    position: relative;
    color: white;
    font-family: 'League Spartan', sans-serif;
    font-size: x-large;
    border: 3px solid;
    border-color: #badcb4;
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
