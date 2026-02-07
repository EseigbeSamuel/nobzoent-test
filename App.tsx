import { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Dimensions,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FeedCard from "./src/components/FeedCard";
import FeedSkeleton from "./src/components/FeedSkeleton";
import { fetchFeed } from "./src/api/picsum";
import { FeedItem } from "./src/types/feed";
import { ThemeProvider, useTheme } from "./src/themes/useTheme";
import { Moon, Sun } from "lucide-react-native";

const LIMIT = 20;

export default function App() {
  const { colors, isDark, toggleTheme } = useTheme();

  const [data, setData] = useState<FeedItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const skeletonData = useMemo(() => Array.from({ length: 6 }), []);

  const SkeletonItem = useCallback(() => <FeedSkeleton />, []);

  const renderItem = useCallback(
    ({ item }: { item: FeedItem }) => <FeedCard item={item} />,
    [],
  );

  const loadFeed = useCallback(async (pageNumber: number, append = false) => {
    try {
      setError(null);
      const result = await fetchFeed(pageNumber, LIMIT);

      setData((prev) => (append ? [...prev, ...result] : result));
      setPage(pageNumber);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore || loading || error) return;
    setLoadingMore(true);
    loadFeed(page + 1, true);
  }, [loadingMore, loading, error, page, loadFeed]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadFeed(1);
  }, [loadFeed]);

  useEffect(() => {
    loadFeed(1);
  }, [loadFeed]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Feed</Text>
        <FlatList
          data={skeletonData}
          keyExtractor={(_, i) => i.toString()}
          renderItem={SkeletonItem}
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: colors.textPrimary }}>{error}</Text>
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.header, { color: colors.textPrimary }]}>Feed</Text>

        <Pressable
          onPress={toggleTheme}
          style={[styles.themeToggle, { backgroundColor: colors.card }]}
        >
          {isDark ? (
            <Moon size={20} color={colors.textPrimary} />
          ) : (
            <Sun size={20} color={colors.textPrimary} />
          )}
        </Pressable>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator style={{ marginVertical: 16 }} />
          ) : null
        }
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={7}
        removeClippedSubviews
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },

  themeToggle: {
    position: "absolute",
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: "#000",
    elevation: 4,
  },
});
