import { useTheme } from "../context/theme";
import { useAuth } from '../context/AuthProvider';
import { API_DOMAIN } from "../utils/api-domain";
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
                        <h4 className="">{`${user.fullName}`}</h4>
                        <p className="">@{user.userName}</p>
                    </div>

                </div>
                <div className="inline-left">
                    <div className="numbers">
                        <h2 className=" ">10</h2>
                        <p className="">followers</p>
                    </div>
                    <div className="" style={{ fontSize: '25px' }}>|</div>
                    <div className="numbers">
                        <h2 className="">6</h2>
                        <p className="">following</p>
                    </div>
                    <div className="grey" style={{ fontSize: '25px' }}>|</div>
                    <div className="numbers">
                        <h2 className="">4</h2>
                        <p className="">posts</p>
                    </div>
                </div>
                <div className="margin-bottom margin-top">
                    <div className="inline-left gap" >
                        <img src="public\icons\icons8-folder.svg" alt="" width={'30px'} />
                        <h4 className="">LATEST PROJECTS</h4>
                    </div>
                    <div className="info-projects">
                        <div className="space-between" >
                            <p>Super project</p>
                            <img src="public\icons\open.svg" alt="" width={'20px'}/>
                        </div>
                        <div className="space-between">
                            <p>Second Super project</p>
                            <img src="public\icons\open.svg" alt="" width={'20px'}/>

                        </div>
                    </div>

                </div>
                <div className="margin-bottom margin-top">
                    <div className="inline-left gap" >
                        <img src="public\icons\link.png" alt="" width={'25px'} />
                        <h4 className="">LINKS</h4>
                    </div>
                    <div className="info-projects">
                        <p>github.com/happylion175</p>
                    </div>
                </div>
                <div className="margin-bottom margin-top">
                    <div className="inline-left gap" >
                        <img src="public\icons\about.png" alt="" width={'25px'} />
                        <h4 className="">ABOUT ME</h4>
                    </div>
                    <div className="info-projects">
                        <p>slkdjf flskdf fdfd df fdfd skds sdlfkjdfls fsd sldkf sfkd sdjhfksjf sdfksjdfh</p>
                    </div>
                </div>
            </AnimatedBox>
        </div>

    )
}

export default UserBox;