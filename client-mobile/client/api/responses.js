import client from "./client";

const endpoint = "/response"
const send = (response, form) =>
  client.post(endpoint, {
    ...response,
    form,
  });

const getFormResponses = (id) => client.get(endpoint + "/form/" + id)

const getMyResponses = () => {
  return client.get(endpoint + "/me")
}


export default {
  send,
  getFormResponses,
  getMyResponses,
};
