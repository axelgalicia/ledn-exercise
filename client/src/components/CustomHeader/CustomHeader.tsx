import { FC } from "react";
import { Header, Divider } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

interface CustomHeaderProps {
    title: string;
    color?: SemanticCOLORS;
}

const CustomHeader: FC<CustomHeaderProps> = (props) => {
    const { color, title, children } = props;

    return (
        <>
            <Header as='h4' color={color ? color : 'black'}>{title}</Header>
            <Divider section />
            {children}
        </>
    )
}

export default CustomHeader;