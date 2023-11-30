import { FaSearch } from 'react-icons/fa';
import banner1 from '../../assets/banner1.jpg'
import { MdVolunteerActivism } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useProvider from '../../hooks/useProvider'
const HomeSlider = () => {
  const {user} = useProvider()
    return (
      <div
        className="hero min-h-[calc(100vh-76px)]"
        style={{
          backgroundImage:
            `url(${banner1})`,
        }}
      >
        <div className="hero-overlay  bg-black bg-opacity-50"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl text-white">
            <h1 className="mb-5 text-6xl font-bold">Be a Lifesaver: Donate Blood, Save Lives!</h1>
            <p className="mb-5 text-lg">
            Embrace the hero within and join us in the noble cause of blood donation. Your selfless act can be the beacon of hope for someone in need, providing them with the precious gift of life. 
            </p>
            <div className='flex gap-5 justify-center text-white'>
                <Link to={user ? '/dashboard' : '/sign-up'} className="btn btn-accent text-white hover:text-white hover:bg-transparent border-2">Join as a Donor <MdVolunteerActivism /></Link>
                <Link to={'/search'} className="btn btn-outline hover:bg-accent hover:border-transparent text-white hover:text-white ">Search Donors <FaSearch/></Link>
            </div>
            
          </div>
        </div>
      </div>
    );
};

export default HomeSlider;