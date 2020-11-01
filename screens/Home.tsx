import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { feed as feedAPI, refill as refillAPI } from "../api/api";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMutation } from "react-query";

const colors = {
  raisinBlack: "#2E2532",
  pumpkin: "#FE7F2D",
  white: "#F3F3F3",
  black: "#030303",
};

export default function Home() {
  const [portions, setPortions] = useState(0);
  const [needRefill, setNeedRefill] = useState(false);

  const [feed, { isLoading: isFeeding }] = useMutation(
    async () => {
      const res = await feedAPI();
      return res.data;
    },
    {
      onSuccess: (data) => {
        if (data.status[0].feeder_status === -11) {
          setNeedRefill(true);
        }
        setPortions(data.portions_left);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const [refill] = useMutation(
    async () => {
      const res = await refillAPI();
      return res.data;
    },
    {
      onSuccess: (data) => {
        if (needRefill) {
          setNeedRefill(false);
        }
        setPortions(data.portions_left);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Pet Feeder</Text>
      </View>
      <View>
        <Text style={styles.portionsLeft}>Portions left: {portions}</Text>
      </View>
      <View style={styles.refillButtonContainer}>
        <TouchableOpacity onPress={() => refill()}>
          <FontAwesome name="refresh" size={30} color={colors.pumpkin} />
        </TouchableOpacity>
      </View>
      <View style={styles.feedContainer}>
        <TouchableOpacity
          disabled={needRefill || isFeeding}
          onPress={() => feed()}
          style={styles.feedButton}
        >
          <Text style={styles.feed}>{needRefill ? "Need refill" : "Feed"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.raisinBlack,
  },
  // title-start
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    height: "25%",
  },
  title: {
    fontFamily: "Raleway_400Regular",
    color: colors.white,
    fontSize: 35,
  },
  // title-end
  portionsLeft: {
    fontFamily: "Raleway_400Regular",
    color: colors.white,
    textAlign: "center",
    fontSize: 20,
    margin: 30,
  },
  // refill-start
  refillButtonContainer: {
    alignItems: "center",
  },
  refillText: {
    fontFamily: "Raleway_600SemiBold",
    color: colors.pumpkin,
    fontSize: 24,
  },
  // refill-end
  // feed-start
  feedContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  feedButton: {
    width: 250,
    height: 250,
    backgroundColor: colors.pumpkin,
    borderRadius: 130,
    shadowColor: colors.black,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 90,
    shadowOpacity: 1,
    shadowRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  feed: {
    fontFamily: "Raleway_700Bold",
    color: colors.raisinBlack,
    fontSize: 30,
  },
  // feed-stop
});
