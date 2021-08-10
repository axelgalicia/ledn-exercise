import { FC } from "react";
import { Message } from "semantic-ui-react";

interface ErrorMessageProps {
    visible: boolean;
    message: string;
    title?: string;
}


const ErrorMessage: FC<ErrorMessageProps> = (props) => {
    const { visible, message, title } = props;

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