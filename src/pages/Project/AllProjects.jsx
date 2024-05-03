import Header from "../../components/Header";
import { useTheme } from "../../context/theme";
import { lazy, Suspense } from "react";
import SpinningIcon from "../../components/SpinningIcon";

const UserBox = lazy(() => import("../../widgets/UserBox"));
const FeedBox = lazy(() => import("../../widgets/FeedBox"));
const FriendsBox = lazy(() => import("../../widgets/FriendsBox"));

function AllProjects() {
    const { theme } = useTheme();

    return (
        <>
            <Header />
            <div className={`main ${theme}`}>
                Under construction...
                {/* <Suspense fallback={<div className={`loadingBox1 box ${theme}`}>Loading...<SpinningIcon /></div>}>
                    <UserBox />  
                </Suspense> */}
            </div>
        </>
    );
}

export default AllProjects;
