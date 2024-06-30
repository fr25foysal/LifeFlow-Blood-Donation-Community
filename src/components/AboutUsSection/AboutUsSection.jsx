import Button from "../Button/Button";

const AboutUsSection = () => {
    return (
        <div className="flex my-14">
            <div className="w-1/2 bg-white p-10 text-center flex items-center">
          <div className="max-w-md  mx-auto flex flex-col ">
            <h2 className="font-bold text-3xl">
              {" "}
              Saving lives, one donation at a time!
            </h2>
            <p className="font-medium py-4">
            We organize regular blood drives in various locations to make donating convenient and accessible. We offer support to donors throughout the donation process, ensuring a safe and comfortable experience.
            </p>
            <div className='flex justify-center'>
                 <Button to={"/about-us"} text={"Learn More"}></Button>
            </div>
           
          </div>
        </div>
        <div className="w-1/2">
        <img src="about-us-section.jpg" alt="about-us" />
        </div>
        
      </div>
    );
};

export default AboutUsSection;