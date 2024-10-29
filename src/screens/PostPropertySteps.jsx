import PersonalInfo from '../components/postProperty/PersonalInfo'
import BasicInfo from '../components/postProperty/BasicInfo'
import SpecificInfo from '../components/postProperty/SpecificInfo'
import { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'
import PropertyPostSuccess from '../components/postProperty/PropertyPostSuccess'

const PostPropertySteps = () => {
    const { formStep, user } = useContext(UserContext);
    const [propertyForm, setPropertyForm] = useState({
        listedBy: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        propertyType: '',
        firmName: '',
        propertySubType: '',
        availableFor: '',
        project: '',
        area: '',
        address: {
            houseNumber: '',
            street: '',
            state: '',
            pincode: '',
            city: '',
            locality: '',
        },
        plotSize: {
            plotLength: '',
            plotWidth: ''
        },
        furnishType: '',
        flatFurnishings: [],
        societyAmenities: [],
        askedPrice: '',
        propertyStatus: '',
        coordinates: {
            latitude: '',
            longitude: ''
        }
    })

    if (!user) {
        return null
    }

    console.log("Property Form : ", propertyForm)

    return (
        <div>
            {formStep === 1 && <PersonalInfo propertyForm={propertyForm} setPropertyForm={setPropertyForm}/>}
            {formStep === 2 && <BasicInfo  propertyForm={propertyForm} setPropertyForm={setPropertyForm}/>}
            {formStep === 3 && <SpecificInfo  propertyForm={propertyForm} setPropertyForm={setPropertyForm}/>}
            {formStep === 4 && <PropertyPostSuccess />}
        </div>
    )
}

export default PostPropertySteps