const UserInfo = ({user, handleLogout}) => {
    return (
        <>
            <h1>Hello user! {user}</h1>
            <button onClick={handleLogout}>Odhlasit</button>
        </>
    );
}
 
export default UserInfo;