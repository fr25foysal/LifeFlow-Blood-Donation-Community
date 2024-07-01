import BoxContainer from "../../components/BoxContainer/BoxContainer";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";

const AboutUs = () => {
  return (
    <div className="py-8">
      <BoxContainer>
        <PageTitle title={"About Us"}></PageTitle>
        <div className="flex mt-14">
          <div className="w-1/2 bg-neutral p-10 text-center flex items-center">
            <div className="max-w-md  mx-auto flex flex-col ">
              <h2 className="font-bold text-3xl"> Our Mission</h2>
              <p className="font-medium py-4 ">
                Our mission is simple: To connect donors with those in need, to
                save lives. We aim to foster a culture of voluntary blood
                donation and create a supportive environment for donors. By
                doing so, we ensuring a reliable blood supply through education,
                community engagement, and dedicated service.
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <img src="about-us-section.jpg" alt="about-us" />
          </div>
        </div>
        {/* Our Vision */}

        <div className="flex my-0">
        <div className="w-1/2">
            <img src="hand-ball.jpg" alt="about-us" />
          </div>
          <div className="w-1/2 bg-neutral p-10 text-center flex items-center">
            <div className="max-w-md  mx-auto flex flex-col ">
              <h2 className="font-bold text-3xl"> Our Vision</h2>
              <p className="font-medium py-4 ">
              We envision a world where blood donations are a common practice and every patient receives the blood they need. We strive to educate the public about the importance of blood donation and inspire more people to become regular donors. Supported by a strong network of committed donors and volunteers.
              </p>
            </div>
          </div>
          
        </div>
      </BoxContainer>
    </div>
  );
};

export default AboutUs;
