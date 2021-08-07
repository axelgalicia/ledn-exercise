import { Container, Icon, Header } from "semantic-ui-react"
import { SemanticCOLORS, SemanticICONS } from "semantic-ui-react/dist/commonjs/generic"

type MainHeaderProps = {
    title: string;
    subheader: string;
    color: SemanticCOLORS;
    icon: SemanticICONS;
}

const MainHeader = ({ title, subheader, color, icon }: MainHeaderProps) => {
    return (
        <>
            <Container textAlign='center'>
                <Icon
                    float='center'
                    color={color}
                    name={icon}
                    size='massive'
                ></Icon>
            </Container>

            <Header
                color={color}
                textAlign='center'
                as='h1'
                content={title}
                subheader={subheader}
            />

        </>
    )
}

export default MainHeader;