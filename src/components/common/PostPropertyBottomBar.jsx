import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import JSConfetti from "js-confetti";

const PostPropertyBottomBar = () => {
  const jsConfetti = new JSConfetti();
  const { formStep, setFormStep, user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const propertyForm = useSelector((state) => state.propertyForm);

  const nextStep = () => {
    if (!user) {
      alert("No user");
      return;
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
    // to be converted to a helperFunction later
    const res = await axios.post(
      "http://localhost:8080/api/v1/properties/create",
      {
        ownerId: user._id,
        listedBy: propertyForm.listedBy,
        firstName: propertyForm.firstName,
        lastName: propertyForm.lastName,
        phoneNumber: propertyForm.phoneNumber,
        email: propertyForm.email,
        propertyType: propertyForm.propertyType,
        firmName: propertyForm.firmName,
        propertySubType: propertyForm.propertySubType,
        availableFor: propertyForm.availableFor,
        project: propertyForm.project,
        area: propertyForm.area,
        description: propertyForm.description,
        address: {
          houseNumber: propertyForm.address.houseNumber,
          buildingProjectSociety: propertyForm.address.buildingProjectSociety,
          state: propertyForm.address.state
            ? propertyForm.address.state
            : "TEST",
          pincode: propertyForm.address.pincode
            ? propertyForm.address.pincode
            : "TEST",
          city: propertyForm.address.city ? propertyForm.address.city : "TEST",
          locality: propertyForm.address.locality
            ? propertyForm.address.locality
            : "TEST",
        },
        plotSize: {
          plotLength: propertyForm.plotSize.plotLength
            ? propertyForm.plotSize.plotLength
            : 0,
          plotWidth: propertyForm.plotSize.plotWidth
            ? propertyForm.plotSize.plotWidth
            : 0,
          plotArea: propertyForm.plotSize.plotArea
            ? propertyForm.plotSize.plotArea
            : 0,
        },
        furnishType: propertyForm.furnishType,
        flatFurnishings: propertyForm.flatFurnishings,
        societyAmenities: propertyForm.societyAmenities,
        askedPrice: propertyForm.askedPrice,
        propertyStatus: propertyForm.propertyStatus,
        coordinates: {
          latitude: propertyForm.coordinates.latitude,
          longitude: propertyForm.coordinates.latitude,
        },
        images: propertyForm.images,
      }
    );

    if (res.data.success) {
      jsConfetti.addConfetti({
        emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
      });
      setFormStep(4);
      return;
    }

    alert("Failed to save property");
  };

  if (formStep === 4) {
    return null;
  }

  return (
    <div
      className={`bottom-0 px-20 items-center py-4 border-t-2 flex ${
        formStep == 1 ? "justify-end" : "justify-between"
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
  );
};

export default PostPropertyBottomBar;
