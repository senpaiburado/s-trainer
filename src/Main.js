import React, { useRef } from 'react';
import STrainer from "./VTrainer";
import { ReactComponent as MicrophoneIcon } from './Icons/microphone-svgrepo-com 1.svg';
import lines from './Icons/lines.png'

import Image1 from "./images/image1.jpeg";
import Image2 from "./images/image2.jpeg";
import Image3 from "./images/image3.jpeg";
import Image4 from "./images/image4.jpeg";
import Image5 from "./images/image5.jpeg";

export function MainPage() {

    const trainer = useRef();

    return (<div className="body">
        <div className="header">
            <div className="header-row">
                <div><a id="title" href="#">STrainer</a></div>
                <div className="nav-row">
                    <a href="#trainer-block">Trainer</a>
                    <a href="#downloads-contacts-block">Downloads/Contact</a>
                    <a href="#presentations-block">Presentation</a>
                </div>
            </div>

            <div className="header-body">
                <p className="header-title">
                    Welcome to <span className="gold-text">STrainer</span>
                </p>
                <p className="header-desc">
                    It’s powerful vocal tool that
                    will help you to <span className="gold-text">sing better</span>.
                </p>
                <p className="header-desc">
                    <span className="gold-text">Scroll down</span> to read more.
                </p>
            </div>

            <div id="trainer-block">
                <STrainer ref={trainer} />
                <div>
                    <p className="header-desc">
                        This <span className="gold-text">vocal trainer</span> is useful tool
                        for improving intonation.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                        <div className="header-desc">
                            Click
                        </div>
                        <div style={{ marginLeft: "30px" }}></div>
                        <div style={{
                            width: 50, height: 50, borderRadius: 25, background: '#E51A1A', boxShadow: '0px 2px 32px #FF1E1C, 0px 2px 5px rgba(238, 57, 0, 0.1)',
                            border: '1px solid #AA1313', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
                        }}>
                            <div style={{ background: `url(${lines}) no-repeat`, backgroundSize: 30, width: 25, height: 25, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <MicrophoneIcon width={25} height={25} />
                            </div>

                        </div>
                    </div>
                    <div className="header-desc">
                        and try it right now!
                    </div>
                </div>
            </div>

            <div id="downloads-contacts-block">
                <div className="downloads">
                    <p className="header-desc"><span className="gold-text">STrainer</span> is available on: </p>
                    <div className="playmarkets">
                        <a href="https://play.google.com/store/apps/details?id=com.cholak.s_trainer" target='_blank'><img src={"https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"} width={"250px"} /></a>
                        {/* <a href="" target='_blank'><img src={"https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"} width={"250px"} /></a> */}
                    </div>
                </div>

                <div className="contacts">
                    <p className="header-desc">Email us: </p>
                    <a href="mailto:cholak.apps@gmail.com"><span className="header-desc gold-text">cholak.apps@gmail.com</span></a>
                </div>
            </div>

            <div id="presentations-block">
                <div>
                    <img src={Image1} width={"20%"} />
                    <img src={Image2} width={"20%"} />
                    <img src={Image3} width={"20%"} />
                    <img src={Image4} width={"20%"} />
                    <img src={Image5} width={"20%"} />
                </div>
            </div>

            <div>
                <p className="header-desc" style={{ fontSize: "20pt" }}>&copy; CholakApps - <span className="gold-text">STrainer</span> 2022. All rights reserved.</p>
            </div>
        </div>

    </div >);
}