export const updateObject = (oldObject, updatedValues,updatedTotalPrice) => {
    return {
        ...oldObject,
        ...updatedValues , 
        ...updatedTotalPrice
    }
};