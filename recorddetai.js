import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://YOUR_SERVER_IP:3000/api'; // Replace with actual server IP

export default function RecordDetailScreen({ route, navigation }) {
    const { landId } = route.params || {};
    const [loading, setLoading] = useState(false);
    const [landData, setLandData] = useState(null);
    const [showDisputeForm, setShowDisputeForm] = useState(false);
    const [formData, setFormData] = useState({
        reporterName: '',
        description: '',
        contact: ''
    });

    useEffect(() => {
        if (landId) fetchLandDetails();
    }, [landId]);

    const fetchLandDetails = async() => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/land/${landId}`);
            const data = await response.json();
            setLandData(data);
        } catch (error) {
            Alert.alert("Error", "জমির তথ্য লোড করা যায়নি");
        } finally {
            setLoading(false);
        }
    };

    const submitDispute = async() => {
        if (!formData.reporterName || !formData.description || !formData.contact) {
            Alert.alert("Validation Error", "অনুগ্রহ করে সব ফিল্ড পূরণ করুন");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/dispute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    qrId: landId,
                    ...formData
                })
            });
            const result = await response.json();
            if (result.success) {
                Alert.alert("Success", "বিতর্ক সফলভাবে নিবন্ধন করা হয়েছে");
                setShowDisputeForm(false);
                setFormData({ reporterName: '', description: '', contact: '' });
            }
        } catch (error) {
            Alert.alert("Error", "বিতর্ক নিবন্ধনে ব্যর্থ");
        } finally {
            setLoading(false);
        }
    };

    if (loading && !landData) {
        return ( <
            View style = { styles.centerContainer } >
            <
            ActivityIndicator size = "large"
            color = "#6d4aff" / >
            <
            /View>
        );
    }

    if (!landData) {
        return ( <
            View style = { styles.centerContainer } >
            <
            Text > জমির তথ্ য পাওয়া যায়নি < /Text> <
            TouchableOpacity onPress = {
                () => navigation.goBack() }
            style = { styles.backButton } >
            <
            Text style = { styles.buttonText } > ফিরে যান < /Text> <
            /TouchableOpacity> <
            /View>
        );
    }

    return ( <
        ScrollView style = { styles.container } >
        <
        View style = { styles.card } >
        <
        Text style = { styles.sectionTitle } > 📋জমির বিবরণ < /Text>

        <
        View style = { styles.infoRow } >
        <
        Text style = { styles.label } > মালিক: < /Text> <
        Text style = { styles.value } > { landData.owner_name } < /Text> <
        /View> <
        View style = { styles.infoRow } >
        <
        Text style = { styles.label } > যো গাযো গ: < /Text> <
        Text style = { styles.value } > { landData.owner_phone || 'না' } < /Text> <
        /View> <
        View style = { styles.infoRow } >
        <
        Text style = { styles.label } > DAG নম্ বর: < /Text> <
        Text style = { styles.value } > { landData.dag_number } < /Text> <
        /View> <
        View style = { styles.infoRow } >
        <
        Text style = { styles.label } > মৌ জা: < /Text> <
        Text style = { styles.value } > { landData.mouza_name } < /Text> <
        /View> <
        View style = { styles.infoRow } >
        <
        Text style = { styles.label } > ক্ ষেত্ রফল: < /Text> <
        Text style = { styles.value } > { landData.area_decimal }
        শতাঙ্ ক < /Text> <
        /View> <
        View style = { styles.infoRow } >
        <
        Text style = { styles.label } > GPS স্ থানাঙ্ ক: < /Text> <
        Text style = { styles.value } > { landData.gps_latitude }, { landData.gps_longitude } < /Text> <
        /View> <
        View style = { styles.infoRow } >
        <
        Text style = { styles.label } > রেজিস্ ট্ রি তারিখ: < /Text> <
        Text style = { styles.value } > { new Date(landData.registration_date).toLocaleDateString('bn-BD') } < /Text> <
        /View> <
        View style = { styles.infoRow } >
        <
        Text style = { styles.label } > স্ থিতি: < /Text> <
        Text style = {
            [styles.value, { color: landData.status === 'active' ? 'green' : 'orange' }] } > { landData.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়' } <
        /Text> <
        /View> <
        /View>

        {
            !showDisputeForm && ( <
                TouchableOpacity style = { styles.disputeButton }
                onPress = {
                    () => setShowDisputeForm(true) } >
                <
                Text style = { styles.buttonText } > ⚠️এই জমির উপর বিতর্ ক রিপো র্ ট করুন < /Text> <
                /TouchableOpacity>
            )
        }

        {
            showDisputeForm && ( <
                View style = { styles.formCard } >
                <
                Text style = { styles.sectionTitle } > বিতর্ ক ফর্ ম < /Text>

                <
                TextInput style = { styles.input }
                placeholder = "আপনার নাম"
                placeholderTextColor = "#999"
                value = { formData.reporterName }
                onChangeText = {
                    (text) => setFormData({...formData, reporterName: text }) }
                />

                <
                TextInput style = {
                    [styles.input, styles.textArea] }
                placeholder = "বর্ণনা"
                placeholderTextColor = "#999"
                multiline numberOfLines = { 4 }
                value = { formData.description }
                onChangeText = {
                    (text) => setFormData({...formData, description: text }) }
                />

                <
                TextInput style = { styles.input }
                placeholder = "যোগাযোগ নম্বর"
                placeholderTextColor = "#999"
                keyboardType = "phone-pad"
                value = { formData.contact }
                onChangeText = {
                    (text) => setFormData({...formData, contact: text }) }
                />

                <
                TouchableOpacity style = { styles.submitButton }
                onPress = { submitDispute } >
                <
                Text style = { styles.buttonText } > জমা দিন < /Text> <
                /TouchableOpacity>

                <
                TouchableOpacity style = { styles.cancelButton }
                onPress = {
                    () => setShowDisputeForm(false) } >
                <
                Text style = { styles.buttonText } > বাতিল করুন < /Text> <
                /TouchableOpacity> <
                /View>
            )
        }

        <
        TouchableOpacity style = { styles.backButton }
        onPress = {
            () => navigation.navigate('Home') } >
        <
        Text style = { styles.buttonText } > হো মে ফিরুন < /Text> <
        /TouchableOpacity> <
        /ScrollView>
    );
}

// Need to import TextInput
import { TextInput } from 'react-native';

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    card: { backgroundColor: '#f9f9f9', margin: 15, padding: 20, borderRadius: 15 },
    formCard: { backgroundColor: '#ffebee', margin: 15, padding: 20, borderRadius: 15 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#6d4aff' },
    infoRow: { flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 8 },
    label: { flex: 1, fontSize: 14, color: '#666' },
    value: { flex: 2, fontSize: 14, fontWeight: '500', color: '#333' },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12, fontSize: 16 },
    textArea: { height: 100, textAlignVertical: 'top' },
    disputeButton: { backgroundColor: '#ff6b6b', padding: 15, borderRadius: 8, margin: 15 },
    submitButton: { backgroundColor: '#6d4aff', padding: 15, borderRadius: 8, marginTop: 10 },
    cancelButton: { backgroundColor: '#ccc', padding: 15, borderRadius: 8, marginTop: 10 },
    backButton: { backgroundColor: '#999', padding: 15, borderRadius: 8, margin: 15, marginTop: 10 },
    buttonText: { textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 16 }
});