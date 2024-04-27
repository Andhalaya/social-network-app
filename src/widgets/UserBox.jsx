import { useTheme } from "../context/theme";
import { useAuth } from '../context/AuthProvider';
import { API_DOMAIN } from "../utils/api-domain";
import * as Icons from "../utils/Icons";
import AnimatedBox from "../components/Box";

function UserBox() {
    const { theme } = useTheme();
    const { user } = useAuth();

    return (
        <div className="user">
            <AnimatedBox >
                <div className="inline-left gap">
                    <div style={{ borderRadius: '20px', }}>
                        <img src={`${API_DOMAIN}/public/${user.profilePicture ? user.profilePicture : 'uploads/default-profile-picture.jpg'}`} alt="name" style={{ borderRadius: '40px', width: '70px' }} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <p className={`poppins h4 bold ${theme}`}>{`${user.fullName}`}</p>
                        <p className={`typography1 ${theme}`}>@{user.userName}</p>
                    </div>

                </div>
                <div className="inline-left">
                    <div className="numbers">
                        <h2 className=" ">10</h2>
                        <p className={`typography1 ${theme}`}>followers</p>
                    </div>
                    <div className="" style={{ fontSize: '25px' }}>|</div>
                    <div className="numbers">
                        <h2 className="">6</h2>
                        <p className={`typography1 ${theme}`}>following</p>
                    </div>
                    <div className="grey" style={{ fontSize: '25px' }}>|</div>
                    <div className="numbers">
                        <h2 className="">4</h2>
                        <p className={`typography1 ${theme}`}>posts</p>
                    </div>
                </div>
                <div className="margin-bottom margin-top">
                    <div className="inline-left gap" >
                        <Icons.IoFolderOutline className={`icon ${theme}`} style={{fontSize:'30px'}}/>
                        <h4 className="">LATEST PROJECTS</h4>
                    </div>
                    <div className="info-projects">
                        <div className="space-between" >
                            <p className={`typography2 ${theme}`}>Super project</p>
                            <Icons.MdOpenInNew className={`icon ${theme}`} style={{fontSize:'20px'}}/>
                        </div>
                        <div className="space-between">
                            <p className={`typography2 ${theme}`}>Second Super project</p>
                            <Icons.MdOpenInNew className={`icon ${theme}`} style={{fontSize:'20px'}}/>

                        </div>
                    </div>

                </div>
                <div className="margin-bottom margin-top">
                    <div className="inline-left gap" >
                    <Icons.FaGithub className={`icon ${theme}`} style={{fontSize:'30px'}}/>
                        <h4 className="">GITHUB</h4>
                    </div>
                    <div className="info-projects">
                        <p className={`typography2 ${theme}`}>github.com/happylion175</p>
                    </div>
                </div>
                <div className="margin-bottom margin-top">
                    <div className="inline-left gap" >
                    <Icons.MdInfoOutline className={`icon ${theme}`} style={{fontSize:'32px'}}/>
                        <h4 className="">ABOUT ME</h4>
                    </div>
                    <div className="info-projects">
                        <p className={`typography2 ${theme}`}>slkdjf flskdf fdfd df fdfd skds sdlfkjdfls fsd sldkf sfkd sdjhfksjf sdfksjdfh</p>
                    </div>
                </div>
            </AnimatedBox>
        </div>

    )
}

export default UserBox;