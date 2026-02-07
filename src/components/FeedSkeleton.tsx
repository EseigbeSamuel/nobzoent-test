import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useTheme } from "../themes/useTheme";

export default function FeedSkeleton() {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Animated.View
        style={[styles.image, { backgroundColor: colors.skeleton, opacity }]}
      />
      <View style={styles.meta}>
        <Animated.View
          style={[
            styles.lineLarge,
            { backgroundColor: colors.skeleton, opacity },
          ]}
        />
        <Animated.View
          style={[
            styles.lineSmall,
            { backgroundColor: colors.skeleton, opacity },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  image: {
    height: 200,
    backgroundColor: "#e0e0e0",
  },
  meta: {
    padding: 12,
  },
  lineLarge: {
    height: 16,
    width: "60%",
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    marginBottom: 8,
  },
  lineSmall: {
    height: 14,
    width: "40%",
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
});
