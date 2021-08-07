import { Message } from "semantic-ui-react";

type ErrorMessageProps = {
    visible: boolean;
    message: string;
    title?: string;
}


const ErrorMessage = ({ message, visible, title }: ErrorMessageProps) => {
    if (!visible) {
        return (<></>)
    }
    
    return (
        <Message negative>
            <Message.Header>{!!title ? title : 'There was an error'}</Message.Header>
            <p>{message}</p>
        </Message>
    )
}

export default ErrorMessage;