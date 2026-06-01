import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function OutfitDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Sarah 👋</Text>
            <Text style={styles.subText}>Let's create your perfect outfit</Text>
          </View>

          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>S</Text>
          </View>
        </View>

        {/* Recommendation Banner */}
        <View style={styles.recommendationCard}>
          <Text style={styles.bannerTag}>AI Recommendation</Text>

          <Text style={styles.bannerTitle}>Casual Summer Outfit</Text>

          <Text style={styles.bannerDescription}>
            White oversized shirt + blue jeans + white sneakers.
          </Text>

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>View Outfit</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Outfit */}
        <Text style={styles.sectionTitle}>Today's Outfit</Text>

        <View style={styles.outfitCard}>
          <Text style={styles.outfitEmoji}>👕</Text>

          <View style={{ flex: 1 }}>
            <Text style={styles.outfitTitle}>Smart Casual</Text>

            <Text style={styles.outfitDesc}>
              Beige chinos, navy shirt and white sneakers.
            </Text>
          </View>
        </View>

        {/* Weather Card */}
        <Text style={styles.sectionTitle}>Weather Styling</Text>

        <View style={styles.weatherCard}>
          <Text style={styles.weatherTemp}>26°C ☀️</Text>

          <Text style={styles.weatherAdvice}>
            Light fabrics recommended today.
          </Text>
        </View>

        {/* Stats */}
        <Text style={styles.sectionTitle}>Your Style Insights</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>92%</Text>
            <Text style={styles.statLabel}>Style Score</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Saved Looks</Text>
          </View>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Browse Categories</Text>

        <View style={styles.categoryGrid}>
          {[
            "👔 Formal",
            "👕 Casual",
            "🏋️ Sport",
            "🌴 Summer",
            "🧥 Winter",
            "✨ Party",
          ].map((item) => (
            <TouchableOpacity key={item} style={styles.categoryCard}>
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Recommendations */}
        <Text style={styles.sectionTitle}>Recent Recommendations</Text>

        {[
          "Black T-Shirt + Denim Jeans",
          "Oversized Hoodie + Cargo Pants",
          "White Shirt + Khaki Trousers",
        ].map((item, index) => (
          <View key={index} style={styles.recentCard}>
            <Text style={styles.recentText}>{item}</Text>
          </View>
        ))}

        {/* Bottom Button */}
        <TouchableOpacity style={styles.scanButton}>
          <Text style={styles.scanButtonText}>Upload Outfit Photo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },

  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  subText: {
    color: "#6B7280",
    marginTop: 4,
  },

  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
  },

  profileText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  recommendationCard: {
    backgroundColor: "#4F46E5",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 25,
  },

  bannerTag: {
    color: "#C7D2FE",
    marginBottom: 8,
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  bannerDescription: {
    color: "#E5E7EB",
    marginTop: 10,
    lineHeight: 22,
    marginBottom: 20,
  },

  primaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#4F46E5",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 20,
    marginBottom: 12,
    color: "#111827",
  },

  outfitCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  outfitEmoji: {
    fontSize: 32,
    marginRight: 16,
  },

  outfitTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  outfitDesc: {
    color: "#6B7280",
    marginTop: 4,
  },

  weatherCard: {
    backgroundColor: "#FEF3C7",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  weatherTemp: {
    fontSize: 24,
    fontWeight: "700",
  },

  weatherAdvice: {
    marginTop: 8,
    color: "#92400E",
  },

  statsRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "700",
  },

  statLabel: {
    color: "#6B7280",
    marginTop: 6,
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },

  categoryCard: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
  },

  categoryText: {
    fontWeight: "500",
  },

  recentCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },

  recentText: {
    color: "#374151",
  },

  scanButton: {
    backgroundColor: "#111827",
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  scanButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
