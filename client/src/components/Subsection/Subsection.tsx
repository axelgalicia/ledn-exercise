import { Header, Divider } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

type Subsection = {
    title: string;
    color?: SemanticCOLORS;
    children?: any;
}

const Subsection = ({ title, color, children }: Subsection) => {
    return (
        <>
            <Header as='h4' color={color ? color : 'black'}>{title}</Header>
            <Divider section />
            {children}
        </>
    )
}

export default Subsection;