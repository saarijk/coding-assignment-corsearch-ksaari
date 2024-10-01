import { useEffect, useState } from 'react';
import axios from "axios";
import { User } from '../shared/types';

type Props = {}

function HomePage({ }: Props) {
    const url = "https://jsonplaceholder.typicode.com/users";
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get(url).then((response) => {
            if (response == null) {
                console.error("Response failed.");
                return
            }
            setUsers(response.data ?? []);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <div>
            {/* userdata */}
            {users.map((user) => (
                <div>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <p>{user.website}</p>
                    <p>{user.address.city}</p>
                </div>
            ))}
        </div>
    )
}

export default HomePage