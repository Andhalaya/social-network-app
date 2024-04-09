import { useTheme } from "../context/theme";
import { Divider, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Post from "../components/Post";
import PostBox from "./PostBox";

function FeedBox () {
    const { theme } = useTheme();
    return (
        <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
        <PostBox />
        <div className={`box ${theme}`} style={{maxWidth:'900px'}}>
           <div className="space-between" style={{marginBottom:'10px'}}>
                <h3 style={{fontWeight:'400'}}>Posts</h3>
                <div className="search-box">
                    <input type="text" placeholder="search post"/>
                    <IconButton>
                        <SearchIcon className={`icon ${theme}`} style={{width:'20px'}}/>
                    </IconButton>
                </div>
           </div>
           <div>
           <Divider/>
           <Post/>
           <Divider/>
           <Post/>
           <Divider/>
           <Post/>
           </div>
        </div>
        </div>
    )
}

export default FeedBox;