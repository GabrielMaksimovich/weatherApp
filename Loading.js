import { StyleSheet, Text, View } from 'react-native';

export default function Loading() {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading weather...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
        paddingVertical: 100,
        backgroundColor: 'fdf6aa',
    },
    text: {
        color: '#2c2c2c',
        fontSize: 30,
    },
    paragraph: {
        color: 'black',
        fontSize: 30,
    }
})
