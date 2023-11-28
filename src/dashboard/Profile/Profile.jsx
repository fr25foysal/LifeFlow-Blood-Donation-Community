import useProvider from "../../hooks/useProvider";

const Profile = () => {
    const {user} = useProvider()
    return (
        <div>
            <div>
                <h2 className="text-center">
                    Welcome, {user?.displayName}
                </h2>
            </div>
        </div>
    );
};

export default Profile;