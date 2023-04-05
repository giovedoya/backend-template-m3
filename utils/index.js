const validateDress = (body) =>{
    const { neckline, court, long, color, size, designer, name, description, price, location, image} =
    body;

    const missingFields = [];
  
    if (!neckline) missingFields.push("neckline");
    if (!court) missingFields.push("court");
    if (!long) missingFields.push("long");
    if (!color) missingFields.push("color");
    if (!size) missingFields.push("size");
    if (!designer) missingFields.push("designer");
    if (!name) missingFields.push("name");
    if (!description) missingFields.push("description");
    if (!price) missingFields.push("price");
    if (!location) missingFields.push("location");
    if (!image) missingFields.push("image");
    
    if (missingFields.length > 0) {
      return { isValid: false, missingFields };
    }

    const allowedProps = ["neckline", "court", "long", "color", "size", "designer", "name", "description", "price", "location", "image"];
    for (let prop in body) {
      if (!allowedProps.includes(prop)) {
        return false;
      }
    }
    if (!["ship", "v-shaped", "square", "strapless", "halter", "round", "heart", "delusion", "fallen shoulders", "queen anne", "asymmetric", "others"].includes(neckline)) {
      return false;
  }
    if (!["princess", "straight", "evaded", "in A", "siren", "empire", "others"].includes(court)) {
      return false;
  }
    if (!["long", "half", "short",].includes(long)) {
      return false;
  }
  if (!["black", "light blue", "brown", "golden", "grey", "green", "ivory", "multicolored", "pink", "red", "silver", "white", "dark blue", "others"].includes(color)) {
    return false;
}
if (![32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62].includes(Number(size))) {
  return false;
}
return { isValid: true };
  }

  module.exports = validateDress;