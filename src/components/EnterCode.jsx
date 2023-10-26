import styled from "styled-components";

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
    flex-direction: column;
    position: relative;
    gap: 10px;
    padding: 30px 0px 30px 30px;
    position: relative;
    align-items: center;
    height: 200px;
    width: 850px;
    background-color: #f8f8f8b2;
    border-radius: 50px;
    box-shadow: 0px 4px 10px #00000040;
`;

const Text = styled.h3`
    color: #000000;
    font-family: Helvetica;
    font-size: 40px;
    font-weight: 400;
    line-height: normal;
    position: fixed;
    padding-left: 55px;
    position: relative;
    height: 24px;
    width: 724px;
    font-family: 'League Spartan', sans-serif;
`;

const InputSection = styled.div`
    position: relative;
    height: 70px;
    width: 724px;
    position: relative;
    display: flex;
    flex-direction: row;
    padding-left: 55px;
    text-align: center;
`;

const Input = styled.input`
    border-radius: 30px 0px 0px 30px;
    border: 0px solid;
    display: flex;
    position: relative;
    width: 80%;
    height: 38px;
    padding: 8px 16px;
    line-height: 20px;
    font-size: x-large;
    font-family: 'League Spartan', sans-serif;
    ::placeholder {
        color: #5e5e5ec4;
        font-size: 18px;
    }
`;

const Button = styled.button`
    height: 55px;
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
`

function EnterCode() {
    return(
        <Container>
            <Logo src="./img/callhubLogo-cropped.svg" alt="Callhub Logo" />
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

export default EnterCode;