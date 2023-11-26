import { useNavigate } from "react-router-dom";
import { 
    Container,
    ButtonContainer,
    Logo,
    Button,
} from "./Welcome.styles";

function Welcome() {
    let navigate = useNavigate(); 

    const routeChangeCustomer = () =>{ 
        let path = `/enter`; 
        navigate(path);
    }

    const routeChangeEmployee = () =>{ 
        let path = `/generate`; 
        navigate(path);
    }

    return(
        <Container>
            <Logo src="./img/callhubLogo-cropped.svg" alt="Callhub Logo" />
            <ButtonContainer>
                <Button onClick={routeChangeCustomer}>Customer</Button>
                <Button onClick={routeChangeEmployee}>Employee</Button>
            </ButtonContainer >
        </Container>
    );
}

export default Welcome;