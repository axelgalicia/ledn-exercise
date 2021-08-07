import { List } from "semantic-ui-react"


type DeveloperInfoProps = {
    name: string;
    city: string;
    email: string;
    websiteLink: string;
    linkLabel: string;
}

const DeveloperInfo = ({ name, city, email, websiteLink, linkLabel }: DeveloperInfoProps) => {

    return (
        <List>
            <List.Item>
                <List.Icon name='users' />
                <List.Content>{name}</List.Content>
            </List.Item>
            <List.Item>
                <List.Icon name='marker' />
                <List.Content>{city}</List.Content>
            </List.Item>
            <List.Item>
                <List.Icon name='mail' />
                <List.Content>
                    <a href='mailto:axelgalicia@gmail.com'>{email}</a>
                </List.Content>
            </List.Item>
            <List.Item>
                <List.Icon name='linkify' />
                <List.Content>
                    <a href={websiteLink} target='_blank' rel="noreferrer">{linkLabel}</a>
                </List.Content>
            </List.Item>
        </List>
    )

}

export default DeveloperInfo;