import React from 'react';

import {
    View,
    Text,
    Image
} from 'react-native';
import { styles } from './styles';


export function Tracking() {
    return (
        <View style={[styles.container, styles.motorista]}>
            <Image style={styles.motorista_image} source={require("../../../assets/splash.png")}/>
            <Text style={styles.motorista_text}>Seu motorista já está a caminho</Text>
        </View>
    );
}