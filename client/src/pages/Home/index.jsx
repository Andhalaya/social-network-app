import Header from "../../components/Header";
import UserBox from "../../components/UserBox";
import { useTheme } from "../../theme";

function Home () {
    const { theme } = useTheme();
    return (
        <>
        <Header />
        <div className={`home ${theme}`}>
            <UserBox/>
            <UserBox/>
            <UserBox/>
        </div>
        </>
        
    )
}

export default Home;