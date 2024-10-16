import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleIsOpen } from '../../store/slices/SignInSlice';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { auth } from '../../utils/firebaseConfig'; // Assuming firebaseConfig exports a valid Firebase app instance

const SignInModal = () => {
    const dispatch = useDispatch();
    const closeSignInModal = () => {
        dispatch(toggleIsOpen());
    };

    useEffect(() => {
        const authInstance = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier(auth,'sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved
                console.log('recaptcha resolved', response);
            }
        }, authInstance);

        // Clean up on unmount
        return () => {
            window.recaptchaVerifier.clear();
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-[568px]">
                <div className='py-[22px] px-6 border-b-[1px] flex justify-between w-full items-center'>
                    <X onClick={closeSignInModal} size={16} className='cursor-pointer' />
                    <div className='text-center flex-1'>Sign Up</div>
                </div>

                <div className='py-8 px-6 flex flex-col gap-6'>
                    <div>Welcome to GharSetu</div>
                    <div className='flex gap-4 flex-col'>
                        <div className='flex flex-col gap-2'>
                            <div>
                                <input
                                    type="text"
                                    placeholder="India (+91)"
                                    value="India (+91)"
                                    disabled
                                    className='w-full border-[1px] rounded-t-lg py-[10px] px-[12px]'
                                />
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    className='w-full border-[1px] rounded-b-lg py-[10px] px-[12px]'
                                />
                            </div>
                            <div className='text-xs text-[#717171]'>
                                We’ll call or text you to confirm your number. Standard message and data rates apply. <span className='font-semibold underline text-[#222]'>Privacy Policy</span>
                            </div>
                        </div>
                        <button id="sign-in-button" className='bg-primary text-white rounded-lg w-full py-[14px] px-6'>
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInModal;
