import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "circular-black-italic": require("../assets/fonts/CircularStd-Black-Italic.otf"),
          "circular-black": require("../assets/fonts/CircularStd-Black.otf"),
          "circular-bold-italic": require("../assets/fonts/CircularStd-Bold-Italic.otf"),
          "circular-bold": require("../assets/fonts/CircularStd-Bold.otf"),
          "circular-book-italic": require("../assets/fonts/CircularStd-Book-Italic.otf"),
          "circular-book": require("../assets/fonts/CircularStd-Book.otf"),
          "circular-light-italic": require("../assets/fonts/CircularStd-Light-Italic.otf"),
          "circular-light": require("../assets/fonts/CircularStd-Light.otf"),
          "circular-medium-italic": require("../assets/fonts/CircularStd-Medium-Italic.otf"),
          "circular-medium": require("../assets/fonts/CircularStd-Medium.otf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
