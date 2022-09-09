import React, { useEffect, useState } from 'react';
import config from "../../api";
import {
    View,
    Text
} from 'react-native';
import { WebView } from 'react-native-webview';

import { styles } from './styles';

export function Checkout(props) {
    const [url, setUrl] = useState();
    const { price, adress } = props.route.params;
    useEffect(() => {
        async function sendServer() {
            let response = await fetch(config.urlRoot, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    price: price,
                    addres: adress
                })
            });
            let json = await response.json();
            setUrl(json);
        }
        sendServer();
    }, [])
    async function stateChange(state) {
        console.log(state);
        let url = state.url;
        if (state.canGoBack == true && !url.includes('mercadopago')) {
            if (url.includes("approved")) {
                props.navigation.navigate('Tracking');
            } else {
                props.navigation.navigate('Home');
            }
        }
    }
    return (
        <View style={styles.container}>
            {url &&
                <WebView
                    style={styles.checkoutmp}
                    originWhitelist={['*']}
                    source={{ uri: url }}
                    startInLoadingState={true}
                    onNavigationStateChange={state => stateChange(state)}
                />
            }
        </View>
    );
}