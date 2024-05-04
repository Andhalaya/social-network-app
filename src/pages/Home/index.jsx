import Header from "../../components/Header";
import { useTheme } from "../../context/theme";
import { lazy, Suspense } from "react";
import './Home.css';
import './Feed.css';
import SpinningIcon from "../../components/SpinningIcon";

const UserBox = lazy(() => import("../../widgets/UserBox"));
const FeedBox = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import("../../widgets/FeedBox")), 2000); 
    });
});
const FriendsBox = lazy(() => import("../../widgets/FriendsBox"));

function Home() {
    const { theme } = useTheme();

    return (
        <>
            <Header />
            <div className={`main ${theme}`}>
                <Suspense fallback={<div className={`loadingBox1 box ${theme}`}>Loading...<SpinningIcon /></div>}>
                    <UserBox />  
                </Suspense>
                <Suspense fallback={<div className={`loadingBox2 box ${theme}`}>Loading...<SpinningIcon /></div>}>
                    <FeedBox />
                </Suspense>
                <Suspense fallback={<div className={`loadingBox3 box ${theme}`}>Loading...<SpinningIcon /></div>}>
                    <FriendsBox type="home" />
                </Suspense>
            </div>
        </>
    );
}

export default Home;
