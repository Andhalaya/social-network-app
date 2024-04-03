import Form from "./Form";
import { Box, Button } from "@mui/material";

function LoginPage () {
    return (
        <div className="loginPage">
            <Box>
              <h1 style={{textDecoration: 'line-through'}}>Hello World!</h1>
              <Box>
                <h2>Welcome to the <span>LazyCoder</span>,</h2>
                <p>
                    a social media/platform built by developers for developers. 
                    Here you can share, post and learn everything about programming. 
                    You can begin by sharing an idea about a project and get feedback from other developers. 
                    Post your gitHub link, a screenshot of your webpage or just a snap of code. There are no limits!
                </p>
                <Button>Start sharing</Button>  
              </Box>
              <Box>
                <img src="src\assets\loginImage.jpg" alt="devImage" width={300}/>
              </Box>
            </Box>
            <Box className="form">
                <h2>Join the club</h2>
                <h3>it's free!</h3>
               <Form />
            </Box>
        </div>
    )
}

export default LoginPage;