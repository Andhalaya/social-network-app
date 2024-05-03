import Header from "../../components/Header";
import { useTheme } from "../../context/theme";
import { lazy, Suspense } from "react";
import SpinningIcon from "../../components/SpinningIcon";

const ProjectsBox = lazy(() => import("../../widgets/ProjectsBox"));

function AllProjects() {
    const { theme } = useTheme();

    return (
        <>
            <Header />
            <div className={`main ${theme}`} style={{ height: '100%' }}>
                <Suspense fallback={<div className="loadingBox3">Loading...<SpinningIcon /></div>}>
                    <ProjectsBox />
                </Suspense>
            </div>
        </>
    );
}

export default AllProjects;
