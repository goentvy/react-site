import React from 'react';
import LogoBox from './components/Header/LogoBox';
import MainMenu from './components/Header/MainMenu';
import ImageSlider from './components/Slider/ImageSlider';
import NoticeGalleryTabs from './components/NoticeGallery/NoticeGalleryTabs';
import Banner from './components/Banner';
import Shortcut from './components/Shortcut';
import FooterLogo from './components/Footer/FooterLogo';
import Copyright from './components/Footer/Copyright';
import SNSLinks from './components/Footer/SNSLinks';
import './styles/global.css';


function WebDesign() {
    return (
        <>
            <header className="web_header">
                <LogoBox />
                <MainMenu />
            </header>
            <ImageSlider images={[
            './assets/images/code_1.jpg',
            './assets/images/code_2.jpg',
            './assets/images/code_3.jpg'
            ]} />
            <div className="contents_wrap">
                <NoticeGalleryTabs />
                <Banner />
                <Shortcut />
            </div>
            <footer className="web_footer">
                <FooterLogo />
                <Copyright />
                <SNSLinks />
            </footer>
        </>
    );
}

export default WebDesign;