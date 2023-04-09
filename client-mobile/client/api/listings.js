import client from "./client";

const endpoint = "/forms";

const getListings = () => client.get(endpoint);

const getMyForms = (id) => client.get(endpoint + "?owner=" + id)

const deleteMyForm = (id) => client.delete(endpoint + "/" + id)

const getForm = (id) => client.get(endpoint + "/" + id)

const searchForms = (extension) => client.get(endpoint + "?" + extension)

export const addForm = (listing, onUploadProgress) => {
  // const data = new FormData();
  // data.append("title", listing.title);
  // data.append("description", listing.description);
  // data.append("jobType", listing.jobType);

  // data.append("price", listing.price);
  // data.append("categoryId", listing.category.value);

  // listing.images.forEach((image, index) =>
  //   data.append("images", {
  //     name: "image" + index,
  //     type: "image/jpeg",
  //     uri: image,
  //   })
  // );
  listing.location = {country: listing.country , city: listing.city}
  console.log(listing.location);
  
  delete listing.country
  delete listing.city

  return client.post(endpoint, listing, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const editForm = (form, updatedForm, onUploadProgress) => {

  var updates = {}

  Object.keys(updatedForm).forEach((val) => {
    if (form[val] !== updatedForm[val])
      updates[val] = updatedForm[val]
  })

  return client.patch(endpoint + "/" + form._id, updates, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });


}
export default {
  addForm,
  deleteMyForm,
  getForm,
  getListings,
  getMyForms,
  editForm,
  searchForms
};
