import { View, Text, Image, StyleSheet } from "react-native";
import { FeedItem } from "../types/feed";

export default function FeedCard({ item }: { item: FeedItem }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.download_url }} style={styles.image} />
      <View style={styles.meta}>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.id}>ID: {item.id}</Text>
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
    elevation: 3,
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
    color: "#666",
  },
});
