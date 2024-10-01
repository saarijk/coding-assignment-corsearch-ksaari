import { useEffect, useState } from 'react';
import axios from "axios";
import { User } from '../shared/types';
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import UserCard from '../components/UserCard';
import { FaMagnifyingGlass } from "react-icons/fa6";

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
            <div className="header">
                {/* flavour text */}
                <p>Corsearch / <b>Coding Assignment</b></p>
                <p>K. Saari</p>
            </div>
            <div className="hero">
                {/* main title */}
                <h1>User Management</h1>
                <p className="body-text">Browse user information here</p>
            </div>
            <div className="buffer">
                {/* stats + search */}
                {!showSearch ? <p className="buffer-users">Users <span className="buffer-number">{users.length}</span></p> : <p className="buffer-users">Users <span className="buffer-number">{filteredResults.length}</span></p>}
                {/* buttons */}
                <div className="buttons">
                    {/* search */}
                    <div className="search-container">
                        <FaMagnifyingGlass />
                        <input type="text" placeholder="Search..." className="search-input" onChange={handleSearchInput} />
                        <button onClick={clearInput} className="search-button">Clear</button>
                    </div>
                </div>
            </div>
            <div className="sorting-buttons">
                <button className="sort-by-button" onClick={() => setSortByName(!sortByName)}>{sortByName ? "Name" : "Email"}</button>
                <GoSortAsc className="sort-button" onClick={() => sortAscending()} />
                <GoSortDesc className="sort-button" onClick={() => sortDescending()} />
            </div>
            <div className="userdata">
                {!showSearch && (
                    <>
                        {/* userdata */}
                        {users.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </>
                )}

                {/* search results */}
                {showSearch && filteredResults.length > 0 && (
                    <div className="userdata">
                        {filteredResults.map((result, index) => (
                            <div key={index}>
                                <UserCard key={index} user={result} />
                            </div>
                        ))}
                    </div>
                )}

                {/* no results found */}
                {showSearch && filteredResults.length === 0 && (
                    <div className="no-results">No results found with "{searchTerm}"</div>
                )}
            </div>
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