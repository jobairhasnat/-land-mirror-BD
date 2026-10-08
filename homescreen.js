import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }) {
    return ( <
        View style = { styles.container } >
        <
        Text style = { styles.title } > 🏞️Land Mirror < /Text> <
        Text style = { styles.subtitle } > বাংলাদেশের জন্ য ডিজিটাল জমির রেজিস্ ট্ রি < /Text>

        <
        TouchableOpacity style = { styles.button }
        onPress = {
            () => navigation.navigate('Map') } >
        <
        Icon name = "map"
        size = { 30 }
        color = "#6d4aff" / >
        <
        Text style = { styles.buttonText } > ম্ যাপে জমি দেখুন < /Text> <
        /TouchableOpacity>

        <
        TouchableOpacity style = { styles.button }
        onPress = {
            () => navigation.navigate('QRScan') } >
        <
        Icon name = "qr-code-scanner"
        size = { 30 }
        color = "#6d4aff" / >
        <
        Text style = { styles.buttonText } > QR স্ ক্ যান করুন < /Text> <
        /TouchableOpacity>

        <
        TouchableOpacity style = { styles.button }
        onPress = {
            () => Alert.alert("Coming Soon", "সার্ভিস ট্র্যাকিং শীঘ্রই আসছে") } >
        <
        Icon name = "history"
        size = { 30 }
        color = "#6d4aff" / >
        <
        Text style = { styles.buttonText } > আবেদন স্ ট্ যাটাস < /Text> <
        /TouchableOpacity> <
        /View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', marginTop: 50, color: '#6d4aff' },
    subtitle: { fontSize: 16, marginBottom: 50, color: '#666' },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 15,
        width: '90%',
        marginVertical: 10
    },
    buttonText: { fontSize: 18, marginLeft: 15, color: '#333', flex: 1 }
});