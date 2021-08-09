import { Segment, Header, Divider, Label } from "semantic-ui-react"
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic"

type CustomSectionProps = {
    color?: SemanticCOLORS;
    title: string;
    children?: React.ReactNode[] | React.ReactNode;
    stackable?: boolean;
    showLabel?: boolean;
    labelValue?: string;
}

const CustomSection = ({ title, color, stackable, showLabel, labelValue, children }: CustomSectionProps) => {
    return (
        <Segment color={color} stacked={stackable}>
            <Header as='h3' color={color ? color : 'black'}>{title}
                {showLabel ? <Label circular size='large' color='green'>{labelValue}</Label> : <></>}
            </Header>
            <Divider section />
            {children}
        </Segment>
    )
}

export default CustomSection;