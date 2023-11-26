import StartSessionButton from '../../helper-components/start-session-button-component/StartSessionButton';
import { 
    Container,
    Logo,
    CodeContainer,
    Text,
} from './GenerateSession.styles';

function GenerateSession() {
    return (
        <Container>
            <Logo src="./img/callhubLogo-cropped.svg" alt="Callhub Logo" />
            <CodeContainer>
                <Text>Employee Side</Text>
                <StartSessionButton>Generate Session</StartSessionButton>
            </CodeContainer>
        </Container>
    );
}

export default GenerateSession;
