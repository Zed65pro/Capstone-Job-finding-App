import client from "./client";

const endpoint = "/users"
const feedbacks = "/feedback"


const register = (userInfo) => client.post(endpoint, userInfo);

const signOutAll = () => client.post(endpoint + "/logoutAll")



const getUser = (userId) => client.get(endpoint + "/" + userId)

const getFeedbacks = (userId) => client.get(feedbacks + "/" + userId)

const searchUser = (extention) => client.get(endpoint + extention)

export const editUser = (user, updatedUser, onUploadProgress) => {

    var updates = {}

    Object.keys(updatedUser).forEach((val) => {
        if (user[val] !== updatedUser[val])
            updates[val] = updatedUser[val]
    })

    return client.patch(endpoint + "/me", updates, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });


}

export const changePassword = (passwords, onUploadProgress) => {

    return client.patch(endpoint + "/me/password", passwords, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });

}

export const updateData = (updates, onUploadProgress) => {

    return client.patch(endpoint + "/me", updates, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });

}

export const uplodeImage = (image, onUploadProgress) => {
    const data = new FormData();
    data.append("avatar", {
        name: "image" + image,
        type: "image/png",
        uri: image,
    })

    return client.post(endpoint + "/me/avatar", data, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });


}

export default { register, getUser, editUser, changePassword, signOutAll, updateData, getFeedbacks, uplodeImage, searchUser };
