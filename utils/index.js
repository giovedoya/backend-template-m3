const validateDress = (body) =>{
    const { neckline, court, long, color, size, designer, name, description, price, location, image, sold, type} =
    body;
    if (!neckline || !court || !long || !color || !size || !designer || !name || !description || !price || !location || !image || !sold || !type){
        return false;
    }
    const allowedProps = ["neckline", "court", "long", "color", "size", "designer", "seller", "name", "description", "price", "location", "image", "sold", "type"];
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
if (![32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62].includes(size)) {
  
  return false;
}
  return true;
  }

  module.exports = validateDress;