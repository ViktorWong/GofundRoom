import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity,
    TouchableHighlight
}
    from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import COLORS from '../Constants/Colors'

const { width } = Dimensions.get("screen")
const cardWith = width / 1.6

const Card = (props) => {

    const opacity = props.scrollX.interpolate({
        inputRange: [(props.index - 1) * cardWith, props.index * cardWith, (props.index + 1) * cardWith],
        outputRange: [0.7, 0, 0.7],
        extrapolate: 'clamp'
    })

    const scale = props.scrollX.interpolate({
        inputRange: [(props.index - 1) * cardWith, props.index * cardWith, (props.index + 1) * cardWith],
        outputRange: [0.85, 1, 0.85],
        extrapolate: 'clamp'
    })

    return (
        <TouchableHighlight style={{marginRight: 15, borderRadius: 13 }} underlayColor={COLORS.light} activeOpacity={0.8} onPress={props.onPress}>
            <Animated.View style={{ ...styles.card, transform: [{ scale }] }}>
                <Animated.View style={{ ...styles.cardOverlay, opacity }} />
                <Image
                    source={props.hotel.image}
                    style={{
                        width: cardWith,
                        borderTopLeftRadius: 13,
                        borderTopRightRadius: 13,
                        height: 200
                    }}
                />
                <View style={styles.hotelDetail}>
                    <View>
                        <Text numberOfLines={1} style={styles.hotelName}>{props.hotel.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                            <Octicons name="location" color={COLORS.green} size={14} />
                            <Text numberOfLines={1} style={styles.locationHotel}>{props.hotel.location}</Text>
                        </View>
                    </View>
                    <View style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between'
                    }}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: 100, justifyContent: 'space-between' }}>
                                <FontAwesome name="star" color={COLORS.orange} size={18} />
                                <FontAwesome name="star" color={COLORS.orange} size={18} />
                                <FontAwesome name="star" color={COLORS.orange} size={18} />
                                <FontAwesome name="star" color={COLORS.orange} size={18} />
                                <FontAwesome name="star" color={COLORS.secondary} size={18} />
                            </View>
                            <Text style={styles.reviews}>({props.hotel.review} reviews)</Text>
                        </View>
                        <View>
                            <Text style={styles.price}>{props.hotel.price} $</Text>
                        </View>
                    </View>
                </View>
                <View style={{ position: "absolute", top: 15, right: 15 }}>
                    <Feather name="bookmark" size={25} color={COLORS.white} />
                </View>
            </Animated.View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 290,
        width: cardWith,
        elevation: 8,
        borderRadius: 13,
        backgroundColor: '#fff',
        position: 'relative'
    },
    hotelDetail: {
        backgroundColor: COLORS.white,
        height: 120,
        position: "absolute",
        zIndex: 1,
        bottom: 0,
        width: cardWith,
        borderRadius: 13,
        paddingHorizontal: 12,
        justifyContent: 'center'
    },
    hotelName: {
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: 1.2,
        color: COLORS.black
    },
    locationHotel: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 8,
        color: COLORS.grey,
        letterSpacing: 1.2
    },
    reviews: {
        fontSize: 12,
        color: COLORS.grey,
        fontWeight: '500',
        letterSpacing: 1.2
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 1,
        color: COLORS.primary,
    },
    cardOverlay: {
        height: 280,
        width: cardWith,
        backgroundColor: COLORS.white,
        position: "absolute",
        top: 0,
        left: 0,
        borderRadius: 13,
        zIndex: 100
    }
})

export default Card