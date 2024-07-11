// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

function Journal() {
    const [entries, setEntries] = useState([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
  
    const fetchMotd = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://apihub.p.appply.xyz:3300/motd');
            setEntries([...entries, { id: Date.now().toString(), text: response.data.message }]);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const addEntry = async () => {
        setEntries([...entries, { id: Date.now().toString(), text }]);
        setText('');

        if (text.toLowerCase().includes('motd')) {
            await fetchMotd();
        }
    };

    return (
        <SafeAreaView style={styles.innerContainer}>
            <ScrollView>
                <View>
                    {entries.map((entry) => (
                        <View key={entry.id} style={styles.entryBox}>
                            <Text style={styles.entryText}>{entry.text}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Write your journal entry..."
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity style={styles.button} onPress={addEntry}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>My Journal</Text>
            <Journal />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    innerContainer: {
        flex: 1,
    },
    entryBox: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 10,
    },
    entryText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        padding: 15,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});