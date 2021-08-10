import { FC } from "react";
import { Message } from "semantic-ui-react";

interface SuccessMessageProps {
    visible: boolean;
    message: string;
    title?: string;
}


const SuccessMessage: FC<SuccessMessageProps> = (props) => {

    const { visible, message, title } = props;

    if (!visible) {
        return (<></>)
    }

    return (
        <Message positive>
            <Message.Header>{!!title ? title : 'Successfully!'}</Message.Header>
            <p>{message}</p>
        </Message>
    )
}

export default SuccessMessage;