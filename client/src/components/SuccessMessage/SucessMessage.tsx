import { Message } from "semantic-ui-react";

type SuccessMessageProps = {
    visible: boolean;
    message: string;
    title?: string;
}


const SuccessMessage = ({ message, visible, title }: SuccessMessageProps) => {
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