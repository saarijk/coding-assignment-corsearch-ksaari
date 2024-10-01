import { useEffect, useState } from 'react';
import axios from "axios";
import { User } from '../shared/types';
import { GoSortAsc, GoSortDesc } from "react-icons/go";

type Props = {}

function HomePage({ }: Props) {
    const url = "https://jsonplaceholder.typicode.com/users";
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<String>("");
    const [typingTimeout, setTypingTimeout] = useState<number | null>(null);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [filteredResults, setFilteredResults] = useState<any[]>([]);
    const [sortByName, setSortByName] = useState<boolean>(true);

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

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        const timeout = window.setTimeout(() => {
            if (value === "") {
                setShowSearch(false);
                setFilteredResults([]);
            } else {
                const filteredData = users.filter((user) =>
                    ["name", "username", "email", "phone", "website", "company.name", "address.city"].some((field) =>
                        getFieldValue(user, field).toLowerCase().includes(value.toLowerCase())
                    )
                );

                setFilteredResults(filteredData);
                setShowSearch(true);
            }
        }, 500);

        setTypingTimeout(timeout);
    };

    const clearInput = () => {
        setSearchTerm("");
        setShowSearch(false);
        setFilteredResults([]);
    };

    const sortAscending = () => {
        if (showSearch) {
            const sortedUsers = [...filteredResults].sort((a, b) => sortByName ? a.name.localeCompare(b.name) : a.email.localeCompare(b.email));
            setFilteredResults(sortedUsers);
        } else {
            const sortedUsers = [...users].sort((a, b) => sortByName ? a.name.localeCompare(b.name) : a.email.localeCompare(b.email));
            setUsers(sortedUsers);
        }
    };

    const sortDescending = () => {
        if (showSearch) {
            const sortedUsers = [...filteredResults].sort((a, b) => sortByName ? b.name.localeCompare(a.name) : b.email.localeCompare(a.email));
            setFilteredResults(sortedUsers);
        } else {
            const sortedUsers = [...users].sort((a, b) => sortByName ? b.name.localeCompare(a.name) : b.email.localeCompare(a.email));
            setUsers(sortedUsers);
        }
    };

    return (
        <div>
            <div>
                <p>SEARCH</p>
                <input type="text" placeholder="Search..." onChange={handleSearchInput} />
                <button onClick={clearInput} className="search-button">Clear</button>
            </div>
            <div>
                <p>SORT / FILTER</p>
                <div>
                    <button onClick={() => setSortByName(!sortByName)}>{sortByName ? "Name" : "Email"}</button>
                    <GoSortAsc onClick={() => sortAscending()} />
                    <GoSortDesc onClick={() => sortDescending()} />
                </div>
            </div>
            {!showSearch && (
                <>
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
                </>
            )}

            {/* search results */}
            {showSearch && filteredResults.length > 0 && (
                <div>
                    {filteredResults.map((result, index) => (
                        <div key={index}>
                            <p>{result.name}</p>
                            <p>{result.email}</p>
                            <p>{result.phone}</p>
                            <p>{result.website}</p>
                            <p>{result.address.city}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* no results found */}
            {showSearch && filteredResults.length === 0 && (
                <div>No results found with "{searchTerm}"</div>
            )}
        </div>
    )
}

export default HomePage

{/* properties that can be searched from */ }
const getFieldValue = (user: User, field: string): string => {
    switch (field) {
        case "name":
            return user.name;
        case "email":
            return user.email;
        case "phone":
            return user.phone;
        case "website":
            return user.website;
        case "address.city":
            return user.address?.city || "";
        default:
            return "";
    }
};