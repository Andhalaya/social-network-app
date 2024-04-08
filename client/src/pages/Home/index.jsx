import Header from "../../components/Header";
import UserBox from "../../widgets/UserBox";
import FeedBox from "../../widgets/FeedBox"
import { useTheme } from "../../theme";

function Home () {
    const { theme } = useTheme();
    return (
    <div className="home-container">
        <Header />
        <div className={`home ${theme}`}>
            <UserBox/>
            <FeedBox />
            <UserBox/>   
        </div>
    </div>
        
    )
}

export default Home;