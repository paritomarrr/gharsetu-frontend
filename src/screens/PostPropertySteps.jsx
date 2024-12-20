import PersonalInfo from '../components/postProperty/PersonalInfo'
import BasicInfo from '../components/postProperty/BasicInfo'
import SpecificInfo from '../components/postProperty/SpecificInfo'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import PropertyPostSuccess from '../components/postProperty/PropertyPostSuccess'
import { useSelector } from 'react-redux'


const PostPropertySteps = () => {
    const { formStep, user } = useContext(UserContext);
    const propertyForm = useSelector((state) => state.propertyForm);
    const showError = propertyForm.showError;

    if (!user) {
        return null
    }

    return (
        <div>
            {formStep === 1 && <PersonalInfo/>}
            {formStep === 2 && <BasicInfo />}
            {formStep === 3 && <SpecificInfo />}
            {formStep === 4 && <PropertyPostSuccess />}
        </div>
    )
}

export default PostPropertySteps