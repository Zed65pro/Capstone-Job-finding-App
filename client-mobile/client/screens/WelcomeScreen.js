import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import AppText from "../components/Text";

import Button from "../components/Button";
import colors from "../config/colors";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

function WelcomeScreen({ navigation }) {
  var auth = useAuth();

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo-job.png")} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <Button
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 120,
    height: 175,
  },
  logoContainer: {
    position: "absolute",
    top: 100,
    alignItems: "center",
  },
});

export default WelcomeScreen;
