import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
}
    from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather'
import COLORS from '../Constants/Colors'

const { width } = Dimensions.get("screen")
const cardWith = width - 20

const CardCategories = (props) => {

    return (
        <TouchableOpacity activeOpacity={0.7}>
            <View style={{ ...styles.card }}>
                <LinearGradient
                    colors={['rgba(13,8,8,0.2634)', 'rgba(0,0,0,0.0237)', 'rgba(5,6,7,0.422)']}
                    style={styles.cardOverlay}></LinearGradient>
                <Image
                    source={props.hotel.image}
                    style={{
                        width: '100%',
                        borderRadius: 13,
                        height: 220
                    }}
                />
                <View style={styles.hotelDetail}>
                    <View style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flex: 1
                    }}>
                        <View style={{ width: '60%' }}>
                            <Text numberOfLines={2} style={styles.hotelName}>{props.hotel.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                <Octicons name="location" color={COLORS.white} size={14} />
                                <Text numberOfLines={1} style={styles.locationHotel}>{props.hotel.location}</Text>
                            </View>
                        </View>
                        <View >
                            <View>
                                <Text style={styles.price}>{props.hotel.price} KMF</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: 100, justifyContent: 'space-between' }}>
                                <FontAwesome name="star" color={COLORS.orange} size={15} />
                                <FontAwesome name="star" color={COLORS.orange} size={15} />
                                <FontAwesome name="star" color={COLORS.orange} size={15} />
                                <FontAwesome name="star" color={COLORS.orange} size={15} />
                                <FontAwesome name="star" color={COLORS.primary} size={15} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ position: "absolute", zIndex: 111, top: 15, right: 15 }}>
                    <Feather name="bookmark" size={25} color={COLORS.white} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 220,
        // width: cardWith,
        elevation: 8,
        borderRadius: 13,
        backgroundColor: '#fff',
        position: 'relative',
        marginBottom: 20
    },
    hotelDetail: {
        position: "absolute",
        zIndex: 110,
        bottom: 10,
        paddingHorizontal: 12,
        width: '100%',
    },
    hotelName: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1.2,
        color: COLORS.white
    },
    locationHotel: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 8,
        color: COLORS.white,
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
        color: COLORS.white,
    },
    cardOverlay: {
        height: 220,
        width: '100%',
        backgroundColor: "rgba(0,0,0,0.02)",
        position: "absolute",
        top: 0,
        left: 0,
        borderRadius: 13,
        zIndex: 1
    }
})

export default CardCategories