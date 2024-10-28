import PersonalInfo from '../components/postProperty/PersonalInfo'
import BasicInfo from '../components/postProperty/BasicInfo'
import SpecificInfo from '../components/postProperty/SpecificInfo'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import PropertyPostSuccess from '../components/postProperty/PropertyPostSuccess'

const PostPropertySteps = () => {
    const {formStep, setFormStep, user} = useContext(UserContext);

    if(!user){
        return null
    }

    return (
        <div>
            {formStep === 1 && <PersonalInfo/>}
            {formStep === 2 && <BasicInfo />}
            {formStep === 3 && <SpecificInfo/>}
            {formStep === 4 && <PropertyPostSuccess/>}
        </div>
    )
}

export default PostPropertySteps