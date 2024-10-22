import { X } from "lucide-react"
import { useContext } from "react"
import { useState } from "react"
import { UserContext } from "../../context/userContext"
import axios from "axios"
import toast from "react-hot-toast"

const NewUserDetails = ({ user }) => {

  console.log('User', user)

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [birthDate, setBirthDate] = useState(user?.birthDate || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

console.log('jj', user?._id)

  const handleUserSubmit = async () => {
    const newUser = await axios.post('http://localhost:8080/api/v1/users/saveUserDetails', {
      id: user._id,
      firstName,
      lastName,
      dob : birthDate,
      phoneNumber,
      email,
      password,
    })

    console.log('newUser', newUser)

    if(newUser.data.success){
      toast.success('User Details Saved Successfully')
      window.location.reload()
    }
  }



  console.log(user)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[568px]">
        <div className="py-[22px] px-6 border-b-[1px] flex justify-between w-full items-center">
          <X size={16} className="cursor-pointer" />
          <div className="text-center flex-1">Finish Setting Up</div>
        </div>
        <div className="flex p-6 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="w-full border-[1px] rounded-t-lg py-[10px] px-[12px]" />
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="w-full border-[1px] rounded-b-lg py-[10px] px-[12px]" />
            </div>
            <div className="text-[#717171] text-xs">Make sure it matches the name on your government ID.</div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} placeholder="Birth Date" className="w-full border-[1px] rounded-t-lg py-[10px] px-[12px]" />
            </div>
            <div className="text-[#717171] text-xs"> To sign up, you need to be at least 18. Your birthdate will not be visible to other users of Gharsetu. </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" className="w-full border-[1px] rounded-t-lg py-[10px] px-[12px]" />
            </div>
            <div className="text-[#717171] text-xs"> We’ll send you important updates and notifications.  </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border-[1px] rounded-t-lg py-[10px] px-[12px]" />
            </div>
            <div className="text-[#717171] text-xs"> We’ll send you important updates and notifications.  </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border-[1px] rounded-t-lg py-[10px] px-[12px]" />
            </div>
            <div className="text-[#717171] text-xs"> We’ll send you important updates and notifications.  </div>
          </div>

          <div className="text-xs">By selecting Agree and continue, I agree to Gharsetu's Terms of Service, Payments Terms of Service and Nondiscrimination Policy and acknowledge the Privacy Policy. confirm that I am 18 or older.</div>
          <button onClick={handleUserSubmit} className="bg-primary text-white rounded-lg w-full py-[14px] px-6">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewUserDetails