import { 
    Container,
    Logo,
    CodeContainer,
    Text,
    InputSection,
    Input,
    Button,
} from "./EndSession-styles";

function EndSession() {
    return(
        <Container>
            <Logo src="./img/callhubLogo-cropped.svg" alt="Callhub Logo" />
            <CodeContainer>
                <Text>Your session has now ended.</Text>
                <InputSection>
                    <Input placeholder="Email Address" />
                    <Button>Get Email Transcript</Button>
                </InputSection>
                {/* <Button>Get Email Transcript</Button> */}
            </CodeContainer>
        </Container>
    );
}

export default EndSession;