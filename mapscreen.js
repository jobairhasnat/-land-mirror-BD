import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_REGION = { latitude: 23.8103, longitude: 90.4125, latitudeDelta: 0.0922, longitudeDelta: 0.0421 };

export default function MapScreen({ navigation }) {
  const [selectedLand, setSelectedLand] = useState(null);

  // Sample land plots (replace with real API data)
  const landPlots = [
    { id: '1', lat: 23.8103, lng: 90.4125, owner: 'মুহাম্মদ রহিম', area: '৫০ শতাঙ্ক' },
    { id: '2', lat: 23.8150, lng: 90.4200, owner: 'আয়েশা বেগম', area: '৩০ শতাঙ্ক' },
    { id: '3', lat: 23.8200, lng: 90.4050, owner: 'করিম উদ্দিন', area: '৭৫ শতাঙ্ক' }
  ];

  const handleMarkerPress = async (land) => {
    setSelectedLand(land);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={INITIAL_REGION}>
        {landPlots.map((land) => (
          <Marker 
            key={land.id} 
            coordinate={{ latitude: land.lat, longitude: land.lng }}
            onPress={() => handleMarkerPress(land)}
          >
            <View style={styles.marker}>
              <Text>🏠</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Details Popup */}
      {selectedLand && (
        <Modal visible={true} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.ownerName}>{selectedLand.owner}</Text>
              <Text>আয়তন: {selectedLand.area}</Text>
              <Text>DAG No: ১২৩৪৫</Text>
              <TouchableOpacity 
                style={styles.detailButton}
                onPress={() => {
                  setSelectedLand(null);
                  navigation.navigate('QRScan');
                }}
              >
                <Text style={styles.buttonText}>QR স্ক্যান করুন</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedLand(null)}>
                <Text style={styles.buttonText}>বন্ধ করুন</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  marker: { padding: 5, backgroundColor: '#fff', borderRadius: 10, borderWidth: 2, borderColor: '#6d4aff' },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  ownerName: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  detailButton: { backgroundColor: '#6d4aff', padding: 15, borderRadius: 8, marginTop: 10 },
  closeButton: { backgroundColor: '#ccc', padding: 15, borderRadius: 8, marginTop: 10 },
  buttonText: { textAlign: 'center', color: '#fff', fontWeight: 'bold' }
});