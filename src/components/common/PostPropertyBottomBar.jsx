import { useContext, useEffect } from "react"
import { UserContext } from "../../context/userContext"
import { useNavigate, useLocation } from 'react-router-dom';


const PostPropertyBottomBar = () => {
  const { formStep, setFormStep, user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const nextStep = () => {
    if (!user) {
      alert('No user');
      return;
    }

    if (formStep < 3) {
      setFormStep(formStep + 1);
    }

    if (location.pathname === '/postProperty') {
      navigate('/postProperty/add');
    }
  };

  const prevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  }


  const saveProperty = () => {
    setFormStep(4)
  }

  if (formStep === 4) {
    return null;
  }

  return (
    <div className={`bottom-0 px-20 items-center py-4 border-t-2 flex ${formStep == 1 ? 'justify-end' : 'justify-between'}`}>
      {
        formStep !== 1 && (
          <div className="font-semibold underline cursor-pointer" onClick={prevStep}> Back </div>
        )
      }
      {
        formStep === 3 ? (
          <div className='bg-[#1D4CBE] rounded-lg px-10 py-3 text-white w-fit cursor-pointer' onClick={saveProperty}>Save Property</div>
        ) : (
          <div className='bg-[#1D4CBE] rounded-lg px-10 py-3 text-white w-fit cursor-pointer' onClick={nextStep}>Continue</div>
        )
      }
    </div>
  )
}

export default PostPropertyBottomBar
