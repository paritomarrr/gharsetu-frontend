import { useState } from 'react';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleIsNewUserModalOpen, toggleIsSignInOpen } from '../../store/slices/SignInSlice';
import axios from 'axios';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const   SignInModal = () => {
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [reqID, setReqID] = useState('');
    const [otp, setOtp] = useState('');

    const closeSignInModal = () => {
        dispatch(toggleIsSignInOpen());
    };

    const isSignInModalOpen = useSelector((state) => state.signInModal.isSignInModalOpen);
    const isNewUserModalOpen = useSelector((state) => state.signInModal.isNewUserModalOpen);
    console.log({
        isSignInModalOpen,
        isNewUserModalOpen
    })

    const sendOtp = async () => {
        const res = await axios.post('http://localhost:8080/api/v1/auth/sendOTP', {
            phoneNumber: phoneNumber,
        })
        console.log('res', res)
        if (res.data.success) {
            setReqID(res.data.details.request_id)
            toast.success('OTP sent successfully')
            return;
        }
        console.log('Something went wrong')
    }

    const verifyOTP = async () => {
        // phone number ko replace kra h reqID se
        const res = await axios.post('http://localhost:8080/api/v1/auth/verifyOTP', {
            phoneNumber: phoneNumber, 
            otp: otp,
            reqID: reqID
        })

        if(res.data.success){
            toast.success('OTP verified successfully')
            dispatch(toggleIsSignInOpen())
            dispatch(toggleIsNewUserModalOpen())

            window.localStorage.setItem('token', res.data.token)
            return;
        }
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-[568px]">
                <div className="py-[22px] px-6 border-b-[1px] flex justify-between w-full items-center">
                    <X onClick={closeSignInModal} size={16} className="cursor-pointer" />
                    <div className="text-center flex-1">Sign Up</div>
                </div>

                <div id="recaptcha-container" className="justify-center flex"></div>

                <div className="py-8 px-6 flex flex-col gap-6">
                    <div>Welcome to GharSetu</div>
                    <div className="flex gap-4 flex-col">
                        <div className="flex flex-col gap-2">

                            {
                                reqID ? (
                                    <div className="flex flex-col gap-2">
                                        <HStack className="flex justify-center">
                                            <PinInput otp onChange={(value) => setOtp(value)} autoFocus>
                                                <PinInputField />
                                                <PinInputField />
                                                <PinInputField />
                                                <PinInputField />
                                            </PinInput>
                                        </HStack>
                                    </div>
                                ) : (
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="India (+91)"
                                            value="India (+91)"
                                            disabled
                                            className="w-full border-[1px] rounded-t-lg py-[10px] px-[12px]"
                                        />
                                        <input
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            value={phoneNumber}
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="w-full border-[1px] rounded-b-lg py-[10px] px-[12px]"
                                        />
                                    </div>
                                )
                            }

                            <div className="text-xs text-[#717171]">
                                We’ll call or text you to confirm your number. Standard message and data rates apply.{' '}
                                <span className="font-semibold underline text-[#222]">Privacy Policy</span>
                            </div>
                        </div>

                        <button onClick={reqID ? verifyOTP : sendOtp} className="bg-primary text-white rounded-lg w-full py-[14px] px-6">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInModal;


