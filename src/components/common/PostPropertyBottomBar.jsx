import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import JSConfetti from "js-confetti";
import { useDispatch } from "react-redux";
import { toggleError } from "../../store/slices/PropertyFormSlice";
import { savePropertyHelper } from "../../helperFunctions/propertyHelpers/CreateProperty";
import toast from "react-hot-toast";
import { toggleIsSignInOpen } from "../../store/slices/SignInSlice";
import SignInModal from "../signIn/SignInModal";

const PostPropertyBottomBar = () => {
  const jsConfetti = new JSConfetti();
  const { formStep, setFormStep, user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const propertyForm = useSelector((state) => state.propertyForm);
  const { isSignInModalOpen } = useSelector((state) => state.signInModal);

  const nextStep = () => {
    if (!user) {
      toast.error("Please Sign Up to continue");
      dispatch(toggleIsSignInOpen());
      return
    }

    if (formStep < 3) {
      setFormStep(formStep + 1);
    }

    if (location.pathname === "/postProperty") {
      navigate("/postProperty/add");
    }
  };

  const prevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };


  const saveProperty = async () => {
    const res = await savePropertyHelper({ propertyForm, dispatch, user, toggleError });

    if (res.data.success) {
      jsConfetti.addConfetti({
        emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
      });
      setFormStep(4);
      return;
    }
  }

  if (formStep === 4) {
    return null;
  }

  return (
    <>
      <div
        className={`bottom-0 md:px-20 px-5 items-center py-4 border-t-2 flex ${formStep == 1 ? "justify-end" : "justify-between"
          }`}
      >
        {formStep !== 1 && (
          <div
            className="font-semibold underline cursor-pointer"
            onClick={prevStep}
          >
            {" "}
            Back{" "}
          </div>
        )}
        {formStep === 3 ? (
          <div
            className="bg-[#1D4CBE] rounded-lg px-10 py-3 text-white w-fit cursor-pointer"
            onClick={saveProperty}
          >
            Save Property
          </div>
        ) : (
          <div
            className="bg-[#1D4CBE] rounded-lg px-10 py-3 text-white w-fit cursor-pointer"
            onClick={nextStep}
          >
            Continue
          </div>
        )}
      </div>

      {
        isSignInModalOpen && (
          <SignInModal/>
        )
      }
    </>

  );
};

export default PostPropertyBottomBar;
