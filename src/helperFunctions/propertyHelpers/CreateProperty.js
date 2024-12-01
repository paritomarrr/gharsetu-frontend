import axios from "axios";
import JSConfetti from "js-confetti";

export const savePropertyHelper = async ({propertyForm, dispatch, user, toggleError}) => {

    const missingFields = [];

    if (!propertyForm.listedBy) missingFields.push('listedBy');
    if (!propertyForm.firstName) missingFields.push('firstName');
    if (!propertyForm.lastName) missingFields.push('lastName');
    if (!propertyForm.phoneNumber) missingFields.push('phoneNumber');
    if (!propertyForm.email) missingFields.push('email');
    if (!propertyForm.propertyType) missingFields.push('propertyType');
    if (!propertyForm.propertySubType) missingFields.push('propertySubType');
    if (!propertyForm.availableFor) missingFields.push('availableFor');
    if (!propertyForm.area) missingFields.push('area');
    if (!propertyForm.address.houseNumber) missingFields.push('address.houseNumber');
    if (!propertyForm.address.buildingProjectSociety) missingFields.push('address.buildingProjectSociety');
    if (!propertyForm.address.state) missingFields.push('address.state');
    if (!propertyForm.address.pincode) missingFields.push('address.pincode');
    if (!propertyForm.address.city) missingFields.push('address.city');
    if (!propertyForm.address.locality) missingFields.push('address.locality');
    // if (!propertyForm.plotSize.plotLength) missingFields.push('plotSize.plotLength');
    // if (!propertyForm.plotSize.plotWidth) missingFields.push('plotSize.plotWidth');
    // if (!propertyForm.plotSize.plotArea) missingFields.push('plotSize.plotArea');
    if (!propertyForm.furnishType) missingFields.push('furnishType');
    if (!propertyForm.askedPrice) missingFields.push('askedPrice');
    if (!propertyForm.propertyStatus) missingFields.push('propertyStatus');
    if (!propertyForm.coordinates.latitude) missingFields.push('coordinates.latitude');
    if (!propertyForm.coordinates.longitude) missingFields.push('coordinates.longitude');
    if (!propertyForm.images) missingFields.push('images');
    if (!propertyForm.description) missingFields.push('description');

    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      dispatch(toggleError(true));
      alert(`Please fill all the fields: ${missingFields.join(', ')}`);
      return;
    }

    dispatch(toggleError(false));
    const res = await axios.post(
      "https://gharsetu-server-git-main-paritomarrrs-projects.vercel.app/api/v1/properties/create",
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
          longitude: propertyForm.coordinates.longitude,
        },
        images: propertyForm.images,
      }
    );

    return res;
  };