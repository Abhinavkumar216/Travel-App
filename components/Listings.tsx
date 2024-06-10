import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import Colors from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { ListingType } from "@/Types/ListingType";
import { Link } from "expo-router";

type Props = {
  listings: ListingType[];
  category: string;
};
const Listings = ({ listings, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const [Listing, setListing] = useState(listings);

  useEffect(() => {
    setLoading(true);
    if (category !== "All") {
      const newListing = listings.filter((item) => item.category == category);
      setListing(newListing);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [category]);

  const renderItems: ListRenderItem<ListingType> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.bookmarks}>
              <Ionicons name="bookmark" size={20} color={Colors.white} />
            </View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.itemText}
            >
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome
                  name="map-marker"
                  size={18}
                  color={Colors.primaryColor}
                />
                <Text style={styles.itemLocationText}>{item.location}</Text>
              </View>
              <Text style={styles.pricetext}>${item.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.primaryColor} />
      </View>
    );
  }
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={category == "All" ? listings : Listing}
        renderItem={renderItems}
      />
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    width: 220,
  },
  image: { width: 200, height: 200, borderRadius: 10, marginBottom: 30 },
  bookmarks: {
    position: "absolute",
    top: 185,
    right: 30,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
  },
  itemLocationText: {
    fontSize: 12,
    marginLeft: 5,
  },
  pricetext: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primaryColor,
  },
});
