import client from "./client";

const endpoint = "/feedback"

const postFeedback = (feedback) => client.post(endpoint,feedback)

export default {
    postFeedback,
};
