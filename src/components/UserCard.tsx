import { User } from "../shared/types";
import { FaXmark } from "react-icons/fa6";
import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdAlternateEmail, MdOutlineLocalPhone } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

type Props = {
    user: User;
}

function UserCard({ user }: Props) {
    const [userInfoOpen, setUserInfoOpen] = useState<boolean>(false);
    const letter = user.name.split("");

    const handleClick = () => {
        setUserInfoOpen(!userInfoOpen);
    };

    return (
        <>
            <div className="usercard">
                <div className="usercard-inner">
                    <div className="initial-container">
                        <p className="initial">{letter[0]}</p>
                    </div>
                    <div className="list">
                        <p><b>{user.name}</b></p>
                        <p>{user.username}</p>
                    </div>
                </div>
                <div className="usercard-inner email" onClick={() => { window.location.href = `mailto:${user.email}` }}>
                    <MdAlternateEmail />
                    <p>{user.email}</p>
                </div>
                <div className="usercard-inner phone">
                    <MdOutlineLocalPhone />
                    <p>{user.phone}</p>
                </div>
                <div className="usercard-inner website">
                    <TbWorld />
                    <a href={user.website}>{user.website}</a>
                </div>
                <button className="userdata-button" onClick={handleClick}><IoMdInformationCircleOutline className="menu-icon" /></button>

                {userInfoOpen ? (
                    <div className="expanded-container">
                        <div className="expanded">
                            <button className="xmark-container" onClick={handleClick}>
                                <FaXmark className="xmark" />
                            </button>
                            <div className="user-info">
                                <div className="info-section">
                                    <div className="info-section-inner">
                                        <h4>Name:</h4>
                                        <p>{user.name}</p>
                                    </div>
                                    <div className="info-section-inner">
                                        <h4>Username:</h4>
                                        <p>{user.username}</p>
                                    </div>
                                    <div className="info-section-inner">
                                        <h4>Email:</h4>
                                        <p>{user.email}</p>
                                    </div>
                                    <div className="info-section-inner">
                                        <h4>Phone:</h4>
                                        <p>{user.phone}</p>
                                    </div>
                                    <div className="info-section-inner">
                                        <h4>Website:</h4>
                                        <p>{user.website}</p>
                                    </div>
                                </div>
                                <div className="info-section">
                                    <h4>Address:</h4>
                                    <p>{user.address.suite}</p>
                                    <p>{user.address.street}</p>
                                    <p>{user.address.city}, {user.address.zipcode}</p>
                                </div>
                                <div className="info-section">
                                    <h4>Company Info:</h4>
                                    <p>{user.company.name}</p>
                                    <p>{user.company.catchPhrase}</p>
                                    <p>{user.company.bs}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    )
}

export default UserCard