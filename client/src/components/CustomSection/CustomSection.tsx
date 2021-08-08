import { Segment, Header, Divider } from "semantic-ui-react"
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic"

type CustomSectionProps = {
    color?: SemanticCOLORS;
    title: string;
    children?: React.ReactNode[] | React.ReactNode;
}

const CustomSection = ({ title, color, children }: CustomSectionProps) => {
    return (
        <Segment color={color}>
            <Header as='h3' color={color ? color : 'black'}>{title}</Header>
            <Divider section />
            {children}
        </Segment>
    )
}

export default CustomSection;