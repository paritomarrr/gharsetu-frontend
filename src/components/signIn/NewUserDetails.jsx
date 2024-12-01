import { X } from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";

const NewUserDetails = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [birthDate, setBirthDate] = useState(user?.birthDate || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    // Check required fields
    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!birthDate) newErrors.birthDate = "Birth date is required.";
    if (age < 18 || (age === 18 && monthDiff < 0)) newErrors.birthDate = "You must be at least 18 years old.";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleUserSubmit = async () => {
    if (!validate()) return; // Prevent submission if validation fails

    try {
      const newUser = await axios.post('https://gharsetu-server-kmvglorji-paritomarrrs-projects.vercel.app/api/v1/users/saveUserDetails', {
        id: user._id,
        firstName,
        lastName,
        dob: birthDate,
        phoneNumber,
        email,
        password,
      });

      if (newUser.data.success) {
        toast.success('User Details Saved Successfully');
        window.location.reload();
      }
    } catch (error) {
      toast.error('Error saving user details');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[568px] max-h-[90vh] overflow-y-auto">
        <div className="py-[22px] px-6 border-b-[1px] flex justify-between w-full items-center">
          <div className="text-center flex-1">Finish Setting Up</div>
        </div>
        <div className="flex p-6 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="w-full border-[1px] rounded-t-lg py-[10px] px-[12px]" />
              {errors.firstName && <div className="text-red-500 text-xs">{errors.firstName}</div>}
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="w-full border-[1px] rounded-b-lg py-[10px] px-[12px]" />
              {errors.lastName && <div className="text-red-500 text-xs">{errors.lastName}</div>}
            </div>
            <div className="text-[#717171] text-xs">Make sure it matches the name on your government ID.</div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full border-[1px] rounded-t-lg py-[10px] px-[12px]" />
              {errors.birthDate && <div className="text-red-500 text-xs">{errors.birthDate}</div>}
            </div>
            <div className="text-[#717171] text-xs">To sign up, you need to be at least 18. Your birthdate will not be visible to other users of Gharsetu.</div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <input type="text" disabled value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" className="w-full border-[1px] rounded-t-lg py-[10px] px-[12px]" />
              {errors.phoneNumber && <div className="text-red-500 text-xs">{errors.phoneNumber}</div>}
            </div>
            <div className="text-[#717171] text-xs">We’ll send you important updates and notifications.</div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border-[1px] rounded-t-lg py-[10px] px-[12px]" />
              {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
            </div>
            <div className="text-[#717171] text-xs">We’ll send you important updates and notifications.</div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border-[1px] rounded-t-lg py-[10px] px-[12px]" />
              {errors.password && <div className="text-red-500 text-xs">{errors.password}</div>}
            </div>
            <div className="text-[#717171] text-xs">We’ll send you important updates and notifications.</div>
          </div>

          <div className="text-xs">By selecting Agree and continue, I agree to Gharsetu's Terms of Service, Payments Terms of Service and Nondiscrimination Policy and acknowledge the Privacy Policy. confirm that I am 18 or older.</div>
          <button onClick={handleUserSubmit} className="bg-primary text-white rounded-lg w-full py-[14px] px-6">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewUserDetails;
