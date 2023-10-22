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
    padding: 30px 0px 30px 0px;
    position: relative;
    height: 299px;
    width: 1078px;
    background-color: #f8f8f8b2;
    border-radius: 50px;
    box-shadow: 0px 4px 10px #00000040;
`;

const Text = styled.h3`
    height: 50px;
    width: 724px;
    color: #000000;
    font-family: Helvetica;
    font-size: 48px;
    font-weight: 400;
    line-height: normal;
    position: fixed;
    padding-left: 100px;
    position: relative;
`;

const InputSection = styled.div`
    position: relative;
    height: 75px;
    width: 920px;
    flex-direction: row;
    padding-left: 100px;
    align-items: start;
`;

const Input = styled.input`
    border-radius: 30px;
    border: 3px solid;
    border-color: #badcb4;
    display: flex;
    position: relative;
    width: 90%;
    padding: 16px;
    line-height: 25px;
    font-size: x-large;
    ::placeholder {
        color: #5e5e5ec4;
        font-size: 100px;
    }
`;

function EnterCode() {
    return(
        <Container>
            <Logo src="./img/callhubLogo.png" alt="Callhub Logo" />
            <CodeContainer>
                <Text>Enter your session code</Text>
                <InputSection>
                    <Input placeholder="Session code"/>
                </InputSection>
            </CodeContainer>
        </Container>
    );
}

export default EnterCode;