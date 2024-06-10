import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Colors from "@/constants/Colors";
import destinationCategories from "@/data/categories";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  onCategoryChanged: (category: string) => void;
};

const CategoryButtons = ({ onCategoryChanged }: Props) => {
  const ScrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleSelectCategory = (index: number) => {
    const selected = itemRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      ScrollRef.current?.scrollTo({ x: x, y: 0, animated: true });
    });

    onCategoryChanged(destinationCategories[index].title)
  };
  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        ref={ScrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 10,
          marginBottom: 10,
        }}
      >
        {destinationCategories.map((item, index) => (
          <TouchableOpacity
            onPress={() => handleSelectCategory(index)}
            style={
              activeIndex == index
                ? styles.categoryBtnActive
                : styles.categoryBtn
            }
            key={index}
            ref={(el) => {
              itemRef.current[index] = el;
            }}
          >
            <MaterialCommunityIcons
              name={item.iconName as any}
              size={20}
              color={activeIndex == index ? Colors.white : Colors.black}
            />
            <Text
              style={
                activeIndex == index
                  ? styles.categoryBtnTextActive
                  : styles.categoryBtnText
              }
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryButtons;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.black,
  },
  categoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: { height: 4, width: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryBtnText: {
    marginLeft: 5,
    color: Colors.black,
  },
  categoryBtnTextActive: {
    marginLeft: 5,
    color: Colors.white,
  },
  categoryBtnActive: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: { height: 4, width: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    backgroundColor: Colors.primaryColor,
  },
});
