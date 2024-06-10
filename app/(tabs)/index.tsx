import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import CategoryButtons from "../../components/CategoryButtons";
import Listings from "../../components/Listings";
import ListingData from "../../data/destinations.json";
import GroupListings from "@/components/GroupListings";
import groupData from "../../data/groups.json";
import { StatusBar } from "expo-status-bar";

const index = () => {
  const headerHeight = useHeaderHeight();
  const [category, setCategory] = useState<string>("All");

  const onCatChange = (category: string) => {
    setCategory(category);
    // console.log(category);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft(props) {
            return (
              <TouchableOpacity style={{ marginLeft: 20 }}>
                <Image
                  source={{
                    uri: "https://xsgames.co/randomusers/avatar.php?g=female",
                  }}
                  style={{ width: 40, height: 40, borderRadius: 10 }}
                />
              </TouchableOpacity>
            );
          },
          headerRight(props) {
            return (
              <TouchableOpacity style={styles.notificationWrapper}>
                <Ionicons name="notifications" size={20} color={Colors.black} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <StatusBar animated translucent style="auto"/>
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={styles.headingText}
          >{`Explore The Beautiful \nWorld!`}</Text>
          <View style={styles.searchSectionWrapper}>
            <View style={styles.searchBar}>
              <Ionicons
                name="search"
                size={18}
                color={Colors.black}
                style={{ marginRight: 5 }}
              />
              <TextInput placeholder="Search..." />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options" size={28} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <CategoryButtons onCategoryChanged={onCatChange} />
          <Listings listings={ListingData} category={category} />
          <GroupListings listings={groupData} />
        </ScrollView>
      </View>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'flex-start',
    // alignItems:'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor,
  },
  headingText: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.black,
    marginTop: 10,
  },
  searchSectionWrapper: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
    // borderWidth: 1,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 10,
  },
  filterButton: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    borderRadius: 10,
    marginLeft: 20,
    alignItems: "center",
  },
  notificationWrapper: {
    marginRight: 20,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { height: 4, width: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});
