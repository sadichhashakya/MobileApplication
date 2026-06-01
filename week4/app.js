import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function App() {
  const [cardColor, setCardColor] = useState("lightblue");

  const changeColor = () => {
    const randomColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);

    setCardColor(randomColor);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={styles.title}>My Card</Text>
        <Text>Click button to change color</Text>

        <TouchableOpacity style={styles.button} onPress={changeColor}>
          <Text style={styles.buttonText}>Change Color</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },

  card: {
    width: 300,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
  },

  title: {
    fontSize: 22,
    marginBottom: 10,
  },

  button: {
    marginTop: 15,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
  },
});