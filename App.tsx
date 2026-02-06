// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  Dimensions,
} from "react-native";
import FeedCard from "./src/components/feedCard";
import { fetchFeed } from "./src/api/picsum";
import { FeedItem } from "./src/types/feed";

const LIMIT = 20;

export default function App() {
  const [data, setData] = useState<FeedItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFeed = async (pageNumber: number, append = false) => {
    try {
      setError(null);
      const result = await fetchFeed(pageNumber, LIMIT);

      setData((prev) => (append ? [...prev, ...result] : result));
      setPage(pageNumber);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadFeed(1);
  }, []);

  const loadMore = () => {
    if (loadingMore || loading || error) return;
    setLoadingMore(true);
    loadFeed(page + 1, true);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadFeed(1);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>{error}</Text>
        <Text onPress={() => loadFeed(1)} style={styles.retry}>
          Retry
        </Text>
      </SafeAreaView>
    );
  }

  if (!data.length) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>No items found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Feed</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeedCard item={item} />}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator style={{ marginVertical: 16 }} />
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 16,
  },
  list: {
    paddingHorizontal: width > 600 ? 40 : 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  retry: {
    marginTop: 12,
    color: "blue",
  },
});
