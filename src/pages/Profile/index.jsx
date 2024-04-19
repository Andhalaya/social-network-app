import Header from "../../components/Header";
import { useTheme } from "../../context/theme";
import ProfileBox from "../../widgets/ProfileBox";

function Profile () {
    const { theme } = useTheme();
    return (
    <>
        <Header />
        <div className={`profile-container ${theme}`}>
            <ProfileBox />
        </div>
    </>
        
    )
}

export default Profile;
