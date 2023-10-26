import styled from "styled-components";

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.img`
    height: 240px;
    width: 760px;
`;

const CodeContainer = styled.div`
    flex-direction: column;
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
    font-family: Helvetica;
    font-size: 48px;
    font-weight: 400;
    line-height: normal;
    position: fixed;
    padding-left: 60px;
    position: relative;
`;

const InputSection = styled.div`
    position: relative;
    height: 75px;
    width: 920px;
    display: flex;
    flex-direction: row;
    padding-left: 60px;
    text-align: center;
`;

const Input = styled.input`
    border-radius: 30px 0px 0px 30px;
    border: 3px solid;
    border-color: #badcb4;
    display: flex;
    position: relative;
    width: 80%;
    height: 38px;
    padding: 10px 16px;
    line-height: 20px;
    font-size: x-large;
    ::placeholder {
        color: #5e5e5ec4;
        font-size: 20px;
    }
`;

const Button = styled.button`
    height: 65px;
    width: 30%;
    background-color: #0b9f43;
    border-radius: 0px 30px 30px 0px;
    position: relative;
    color: white;
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
            <Logo src="./img/callhubLogo.png" alt="Callhub Logo" />
            <CodeContainer>
                <Text>Enter your session code</Text>
                <InputSection>
                    <Input placeholder="ex. abcd123"/>
                    <Button>Connect</Button>
                </InputSection>
            </CodeContainer>
        </Container>
    );
}

export default EndSession;