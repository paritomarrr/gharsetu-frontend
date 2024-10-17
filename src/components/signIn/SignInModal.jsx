import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleIsOpen } from '../../store/slices/SignInSlice';
import { auth } from '../../utils/firebaseConfig';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { PinInput, PinInputField, HStack } from '@chakra-ui/react';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';


const SignInModal = () => {
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [otp, setOtp] = useState('');

    const closeSignInModal = () => {
        dispatch(toggleIsOpen());
    };

    // useEffect(() => {
    //     const initializeRecaptcha = async () => {
    //         if (!window.recaptchaVerifier) {
    //             try {
    //                 window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    //                     size: 'normal',
    //                     callback: (response) => {
    //                         setRecaptchaToken(response);
    //                         console.log('reCAPTCHA solved:', response);
    //                     },
    //                     'expired-callback': () => {
    //                         console.log('reCAPTCHA expired');
    //                     },
    //                 });
    //                 await window.recaptchaVerifier.render();
    //                 console.log('reCAPTCHA initialized');
    //             } catch (error) {
    //                 console.error('Error initializing reCAPTCHA', error);
    //             }
    //         }
    //     };
    //     initializeRecaptcha();

    //     return () => {
    //         if (window.recaptchaVerifier) {
    //             window.recaptchaVerifier.clear();
    //         }
    //     };
    // }, []);
    const sendOTP = async () => {
        const phoneNumberWithCode = `+91${phoneNumber}`;
    
        if (!phoneNumber) {
            alert('Please enter a phone number');
            return;
        }
    
        if (!window.recaptchaVerifier) {
            try {
                window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                    size: 'normal',
                    callback: (response) => {
                        setRecaptchaToken(response);
                    },
                    'expired-callback': () => {
                        console.log('reCAPTCHA expired');
                    }
                }, auth);
                await window.recaptchaVerifier.render();
            } catch (error) {
                console.error('Error initializing reCAPTCHA', error);
                return;
            }
        }
    
        const appVerifier = window.recaptchaVerifier;
    
        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumberWithCode, appVerifier);
            setVerificationId(confirmationResult.verificationId);
            console.log('SMS sent. Verification ID:', confirmationResult.verificationId);
        } catch (error) {
            console.error('Error during phone number verification', error);
        }
    };
    

    const verifyOTP = async () => {
        if (!verificationId || !otp) {
            alert('Please enter the OTP');
            return;
        }

        const credential = PhoneAuthProvider.credential(verificationId, otp);
        signInWithCredential(auth, credential)
            .then((user) => console.log('User signed in:', user))
            .catch((error) => console.error('Error during OTP verification:', error));
    };

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
                    {verificationId ? (
                        <div className="flex gap-4 flex-col">
                            <div className="flex flex-col gap-2">
                                <HStack className="flex justify-center">
                                    <PinInput otp onChange={(value) => setOtp(value)}>
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                    </PinInput>
                                </HStack>
                                <div className="text-xs text-[#717171]">
                                    We’ll call or text you to confirm your number. Standard message and data rates apply.{' '}
                                    <span className="font-semibold underline text-[#222]">Privacy Policy</span>
                                </div>
                            </div>

                            <button onClick={verifyOTP} className="bg-primary text-white rounded-lg w-full py-[14px] px-6">
                                Continue
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-4 flex-col">
                            <div className="flex flex-col gap-2">
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
                                <div className="text-xs text-[#717171]">
                                    We’ll call or text you to confirm your number. Standard message and data rates apply.{' '}
                                    <span className="font-semibold underline text-[#222]">Privacy Policy</span>
                                </div>
                            </div>

                            <button onClick={sendOTP} className="bg-primary text-white rounded-lg w-full py-[14px] px-6">
                                Continue
                            </button>
                        </div>
                    )}
                    <div id="recaptcha-container"></div>
                </div>
            </div>
        </div>
    );
};

export default SignInModal;
