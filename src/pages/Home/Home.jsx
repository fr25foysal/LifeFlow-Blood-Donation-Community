import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import BoxContainer from "../../components/BoxContainer/BoxContainer";
import ContactSection from "../../components/ContactSection/ContactSection";
import PageTitle from "../../components/PageTitle/PageTitle";
import FeaturedRequest from "./FeaturedRequest/FeaturedRequest";
import HomeSlider from "./HomeSlider";

const Home = () => {
    return (
        <div>
            <HomeSlider></HomeSlider>
            <div className="py-10 mx-5">
                <PageTitle title={'Featured Request'}></PageTitle>
                <FeaturedRequest></FeaturedRequest>
            </div>
            <div className="py-10 bg-neutral">
                <PageTitle title={'About Us'} ></PageTitle>
                <BoxContainer><AboutUsSection></AboutUsSection></BoxContainer>
            </div>

            <div className="py-10 bg-neutral">
                <PageTitle title={'Contact Us'} ></PageTitle>
                <BoxContainer><ContactSection></ContactSection></BoxContainer>
            </div>

            
        </div>
    );
};

export default Home;