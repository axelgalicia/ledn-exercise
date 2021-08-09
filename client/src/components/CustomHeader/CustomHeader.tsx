import { Header, Divider } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

type CustomHeaderProps = {
    title: string;
    color?: SemanticCOLORS;
    children?: any;
}

const CustomHeader = ({ title, color, children }: CustomHeaderProps) => {
    return (
        <>
            <Header as='h4' color={color ? color : 'black'}>{title}</Header>
            <Divider section />
            {children}
        </>
    )
}

export default CustomHeader;