import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://192.168.100.12:2000",
  },
  staging: {
    apiUrl: "http://172.19.201.243:2000",
  },
  prod: {
    apiUrl: "http://172.19.201.243:2000",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
