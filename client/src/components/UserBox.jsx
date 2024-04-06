import { useTheme } from "../theme";
function UserBox () {
    const { theme } = useTheme();
    return (
        <div className={`box ${theme}`}>
        </div>
    )
}

export default UserBox;