import Lottie from "lottie-react";
import loadingLotieGif from '../../assets/amins/loadingLotie.json'

const LoadingLotie = () => {
    const style = {
        height: '200px',
        width: '200px',
        
      };
     
      
    return (
        <div className="flex justify-center items-center">
          <Lottie animationData={loadingLotieGif} style={style} loop={true}  >
            
        </Lottie> 
        </div>
           
      
        
    );
};

export default LoadingLotie;