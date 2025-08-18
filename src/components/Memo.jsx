import { useState, useMemo } from "react";

const users = [
    { id: 1, name: 'Kim', active: true },
    { id: 2, name: 'Lee', active: false },
    { id: 3, name: 'Park', active: true },
];

const Memo = () => {
    const [ showActive, setShowActive ] = useState(true);

    const filteredUsers = useMemo(() => {
        console.log('filter array');

        return users.filter((user) => user.active === showActive);
    }, [showActive])

    return (
        <div>
            <button onClick={() => setShowActive(!showActive)}>
                { showActive ? "비활성" : "활성" } 사용자를 보려면 클릭하세요.
            </button>
            <ul>
                {filteredUsers.map( (filter) => (
                    <li key={filter.id}>{filter.name}</li>
                ))}
            </ul>

        </div>
    );
};

export default Memo;