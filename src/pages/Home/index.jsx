import Header from "../../components/Header";
import { useTheme } from "../../context/theme";
import { lazy, Suspense } from "react";
import './Home.css';
import SpinningIcon from "../../components/SpinningIcon";

const UserBox = lazy(() => import("../../widgets/UserBox"));
const FeedBox = lazy(() => import("../../widgets/FeedBox"));
const FriendsBox = lazy(() => import("../../widgets/FriendsBox"));

function Home() {
    const { theme } = useTheme();

    return (
        <>
            <Header />
            <div className={`main ${theme}`}>
                <Suspense fallback={<div className="loadingBox1 box">Loading...<SpinningIcon /></div>}>
                    <UserBox />  
                </Suspense>
                <Suspense fallback={<div className="loadingBox2 box">Loading...<SpinningIcon /></div>}>
                    <FeedBox />
                </Suspense>
                <Suspense fallback={<div className="loadingBox3 box">Loading...<SpinningIcon /></div>}>
                    <FriendsBox type="home" />
                </Suspense>
            </div>
        </>
    );
}

export default Home;
