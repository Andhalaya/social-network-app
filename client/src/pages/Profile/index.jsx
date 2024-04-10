import Header from "../../components/Header";
import { useTheme } from "../../context/theme";
import ProfileBox from "../../widgets/ProfileBox";

function Profile () {
    const { theme } = useTheme();
    return (
    <div className="home-container">
        <Header />
        <div className={`home ${theme}`}>
            <ProfileBox />
        </div>
    </div>
        
    )
}

export default Profile;
