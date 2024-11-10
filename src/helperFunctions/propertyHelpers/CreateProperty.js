export const CreateProperty = async ({propertyForm}) => {
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

    return res;
}