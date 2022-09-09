import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666',
    justifyContent: 'center',
  },
  map: {
    height: "60%",
    backgroundColor: "#000"
  },
  search: {
    height: "40%",
  },
  distance: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  distanceText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  price: {
    backgroundColor: "#000",
    padding: 7,
    borderRadius: 7,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  priceText: {
    color: "#FFF",
    fontSize: 20
  }
});
