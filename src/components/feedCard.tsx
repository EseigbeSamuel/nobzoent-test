import { View, Text, Image, StyleSheet } from "react-native";
import { FeedItem } from "../types/feed";
import { useTheme } from "../themes/useTheme";
import { memo } from "react";

type Props = {
  item: FeedItem;
};

function FeedCard({ item }: Props) {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.shadowWrapper,
        {
          shadowOpacity: isDark ? 0.35 : 0.2,
          elevation: isDark ? 4 : 6,
        },
      ]}
    >
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Image
          source={{ uri: item.download_url }}
          style={styles.image}
          resizeMode="cover"
          fadeDuration={150}
        />

        <View style={styles.meta}>
          <Text style={[styles.author, { color: colors.textPrimary }]}>
            {item.author}
          </Text>
          <Text style={[styles.id, { color: colors.textSecondary }]}>
            ID: {item.id}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default memo(FeedCard);

const styles = StyleSheet.create({
  shadowWrapper: {
    marginBottom: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    shadowColor: "#000",
    elevation: 6,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  meta: {
    padding: 12,
  },
  author: {
    fontSize: 16,
    fontWeight: "600",
  },
  id: {
    marginTop: 4,
  },
});
