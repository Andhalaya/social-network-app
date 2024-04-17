import Header from "../../components/Header";
import UserBox from "../../widgets/UserBox";
import FeedBox from "../../widgets/FeedBox"
import FriendsBox from "../../widgets/FriendsBox"
import { useTheme } from "../../context/theme";

function Home () {
    const { theme } = useTheme();
    return (
    <div className="home-container">
        <Header />
        <div className={`home ${theme}`}>
            <UserBox/>
            <FeedBox />
            <FriendsBox/>   
        </div>
    </div>
        
    )
}

export default Home;