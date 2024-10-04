import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Linkdin from './assets/linkedin-logo.png';
import Github from './assets/github-logo.png';
import YouTube from './assets/youtube-logo.png';

const mySkills = [
    { id: 1, server: "Client-Side", skills: ["Html5", "css3", "Javascript", "Es6", "Bootstrap", "React-Bootstrap", "React js"] },
    { id: 2, server: "Server-Side", skills: ["Node Js", "C-language", "Graphql"] },
    { id: 3, server: "DataBase", skills: ["MySql", "Sql"] },
    { id: 4, server: "Server-Tools", skills: ["WinScp", "FileZilla", "PostMan", "Beyond Compare 4"] },
];

const exprienceProjects = [
    { id: 1, project: "C3crm", link: "https://user.c3crm.in/" },
    { id: 2, project: "Rizee", link: "https://rizee.in/" },
    { id: 3, project: "Farmers", link: "" },
];

const myDetailData = [
    { id: 1, name: "Naresh Tanuri" },
    { id: 2, name: "nareshtanuri1418@gmail.com" },
    { id: 3, name: "+91 9347081115" },
    { id: 4, name: "Vijayawada,Andhra pradesh" }
];

const socialMedia = [
    { id: 1, http: "" },
];

const onlineJobPortalsData = [
    { id: 1, name: "LinkedIn", http: "https://www.linkedin.com/in/naresh-tanuri-320295257/", logo: Linkdin },
    { id: 2, name: "Naukri", http: "https://www.naukri.com/mnjuser/profile?id=&altresid", logo: Linkdin },
    { id: 3, name: "GitHub", http: "https://github.com/NareshTanuri", logo: Github },
    { id: 4, name: "YouTube", http: "https://www.youtube.com/channel/UC1GkOlrcnsICGbgNk6AabnA", logo: YouTube },
];

const educationData = [
    { id: 1, platformName: "Bsc Computer", collegeName: "Teja Dvr Degree College - Nandigama", yearoffPassOut: "2019-2022" },
    { id: 2, platformName: "Mpc", collegeName: "Teja Dvr Junior College - Nandigama", yearoffPassOut: "2017-2019" },
    { id: 3, platformName: "Ssc", collegeName: "PavanSu", yearoffPassOut: "2016-2017" },
];

const ResumeTemplate = () => {
    const [onlineJobPortals] = useState(onlineJobPortalsData);
    const [myDetails] = useState(myDetailData);
    const [educationDetails] = useState(educationData);

    const nameDetail = myDetails.find(item => item.id === 1)?.name;
    const negativePlace = myDetails.find(item => item.id === 4)?.name;
    return (
        <>
            <div>
                <div className="card row">
                    <div className="card-body col-lg-12">

                        <header className="text-center">
                            <div className="h3">{nameDetail}</div>
                            <div className="h5">{negativePlace}</div>
                        </header>

                        <section>
                            <nav className="container d-flex justify-content-center mt-4">
                                {onlineJobPortals.map((item, index) => (
                                    <div
                                        key={item.id}
                                        style={{ width: '18rem', cursor: 'pointer', margin: '0 5px', textAlign: 'center' }}
                                        className={index !== 0 ? 'ml-2' : ''}
                                    >
                                        <a href={item.http} className="h6" target="_blank" style={{ color: "#000" }}><img src={item.logo} width={20} height={20} style={{ marginRight: "10px" }} />{item.name}</a>
                                    </div>
                                ))}
                            </nav>
                        </section>

                        <body>
                            <h4 className="mt-3 text-center">EDUCATION</h4>
                            <hr className="w-100 h6" />
                            {
                                educationDetails.map((item) => (
                                    <dl className="mt-3">
                                        <dt>{item.platformName}</dt>
                                        <dd>{item.collegeName}</dd>
                                        <dt>{item.yearoffPassOut}</dt>
                                    </dl>
                                ))
                            }
                        </body>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResumeTemplate;
