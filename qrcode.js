import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as FileSystem from 'expo-file-system';

export default function QRScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [landData, setLandData] = useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    
    try {
      // Mock API call (replace with real backend URL)
      const response = await fetch(`https://your-backend-api.com/land/${data}`);
      const landInfo = await response.json();
      setLandData(landInfo);
    } catch (error) {
      console.error(error);
      setLandData({ error: 'ডাটাবেস থেকে ডাটা পাওয়া যায়নি' });
    }
  };

  if (hasPermission === null) return <View style={styles.container}><Text>Camera permission requesting...</Text></View>;
  if (hasPermission === false) return <View style={styles.container}><Text>No camera access</Text></View>;

  return (
    <View style={styles.container}>
      {!scanned && !landData ? (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <View style={styles.resultContainer}>
          {landData?.error ? (
            <Text style={styles.error}>{landData.error}</Text>
          ) : (
            <>
              <Text style={styles.resultTitle}>📍 জমির তথ্য</Text>
              <Text>মালিক: {landData?.owner || 'Unknown'}</Text>
              <Text>ফাঁকা: {landData?.area || 'N/A'}</Text>
              <Text>DAG #: {landData?.dagNumber || 'N/A'}</Text>
              <Text>স্ট্যাটাস: {landData?.status || 'Active'}</Text>
            </>
          )}
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => { setScanned(false); setLandData(null); }}
          >
            <Text style={styles.buttonText}>আবার স্ক্যান করুন</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>হোমে ফিরুন</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  resultContainer: { padding: 20, backgroundColor: '#fff', borderRadius: 10, elevation: 5 },
  resultTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#6d4aff' },
  error: { color: 'red', fontSize: 16, marginBottom: 10 },
  resetButton: { backgroundColor: '#6d4aff', padding: 15, borderRadius: 8, marginTop: 15, width: 200 },
  backButton: { backgroundColor: '#ccc', padding: 15, borderRadius: 8, marginTop: 10, width: 200 },
  buttonText: { textAlign: 'center', color: '#fff', fontWeight: 'bold' }
});