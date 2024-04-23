import Header from "../../components/Header";
import UserBox from "../../widgets/UserBox";
import FeedBox from "../../widgets/FeedBox"
import FriendsBox from "../../widgets/FriendsBox"
import { useTheme } from "../../context/theme";
import './Home.css'

function Home () {
    const { theme } = useTheme();
    return (
    <>
        <Header />
        <div className={`main ${theme}`}>
            <UserBox/>
            <FeedBox />
            <FriendsBox type="home"/>    
        </div>
    </>
        
    )
}

export default Home;