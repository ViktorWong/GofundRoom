import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    StatusBar,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import COLORS from '../Constants/Colors'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather'

const { width, height } = Dimensions.get('screen')

const categorie = ["Overview", "Reviews & Ratings",]

export default class HotelDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSection: 0
        };
    }

    render() {

        console.log(this.props.route.params.hotel)

        const hotel = this.props.route.params.hotel

        return (
            <View style={styles.container}>

                <StatusBar barStyle='dark-content' translucent backgroundColor="rgba(0,0,0,0.04)" />

                <View style={styles.headerImage}>

                    <View style={styles.backButton}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Feather name="arrow-left" color={COLORS.light} size={22} />
                        </TouchableOpacity>
                    </View>


                    <Image source={hotel.image} resizeMethod="resize" resizeMode="cover" style={styles.imageStyle} />

                    <LinearGradient
                        colors={['transparent', 'black']}
                        style={styles.infoContainer}>
                        <View style={styles.hotelNameContainer}>
                            <Text numberOfLines={2} style={styles.hotelName}>{hotel.name}</Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <View style={styles.starRate}>
                                <FontAwesome name="star" color={COLORS.orange} size={16} />
                                <Text style={styles.star}>{hotel.star}</Text>
                            </View>
                            <Text style={styles.review}>{hotel.review} reviews</Text>
                        </View>
                    </LinearGradient>

                </View>

                <View style={styles.descriptionContainer}>

                    <View style={styles.addFavorites}>
                        <TouchableOpacity>
                            <Feather name="bookmark" size={25} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{ ...styles.catContainer }}>
                        {categorie.map((item, index) => (
                            <TouchableOpacity
                                key={index.toString()}
                                activeOpacity={0.7}
                                onPress={() => this.setState({ selectedSection: index })}
                            >
                                <View style={{ position: "relative" }}>
                                    <Text
                                        style={{
                                            ...styles.catText,
                                            color: this.state.selectedSection == index ? COLORS.primary : COLORS.grey,
                                        }}
                                    >
                                        {item}
                                    </Text>
                                    {
                                        this.state.selectedSection == index && <View style={{
                                            height: 3,
                                            width: 30,
                                            backgroundColor: COLORS.primary,
                                            borderRadius: 2
                                        }} />
                                    }
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.locationContainer}>
                        <View style={styles.locaRow}>
                            <Octicons name="location" color={COLORS.green} size={27} />
                            <View style={styles.billText}>
                                <Text style={styles.locationTitle}>Location</Text>
                                <Text style={styles.locationAdress}>{hotel.location}</Text>
                            </View>
                        </View>
                        <View style={styles.locaRow}>
                            <FontAwesome name="dollar" color={COLORS.green} size={30} />
                            <View style={styles.billText}>
                                <Text style={styles.locationTitle}>Price</Text>
                                <Text style={styles.locationAdress}>{hotel.price} $/per night</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.overviewContainer}>
                        <Text style={styles.overview}>
                            {hotel.description}
                            {hotel.description}
                        </Text>
                    </View>
                    
                    <TouchableOpacity>
                        <View style={styles.reservation}>
                            <Text style={styles.reservationText}>Book This Hotel</Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerImage: {
        borderWidth: 1,
        position: 'relative'
    },
    backButton: {
        position: "absolute",
        top: 45,
        zIndex: 4,
        left: 20,
    },
    infoContainer: {
        position: "absolute",
        zIndex: 5,
        flexDirection: 'row',
        bottom: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        paddingHorizontal: 20,
        //paddingBottom: 10,
        height: 220,
        alignItems: 'center',
    },
    hotelNameContainer: {
        width: "40%"
    },
    hotelName: {
        fontSize: 24,
        color: COLORS.light,
        flexWrap: 'wrap'
    },
    imageStyle: {
        height: height * 0.46,
        width: width,
    },
    ratingContainer: {
        width: "40%",
        alignItems: 'flex-end'
    },
    starRate: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: COLORS.light,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    star: {
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 5,
        color: COLORS.green
    },
    review: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: 10,
        color: COLORS.light
    },
    descriptionContainer: {
        top: -30,
        height: '100%',
        backgroundColor: COLORS.light,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        position: 'relative'
    },
    addFavorites: {
        position: 'absolute',
        top: -30,
        right: 25,
        zIndex: 100,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.light,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    catContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        width: "65%",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    catText: {
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 0.5
    },
    overviewContainer: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    overview: {
        textAlign: 'left',
        letterSpacing: 0.8,
        fontSize: 15,
        fontWeight: "600",
        //lineHeight: 18,
        color: COLORS.dark
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20
    },
    locaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "40%"
    },
    billText: {
        marginLeft: 10
    },
    locationTitle: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '700',
    },
    locationAdress: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
        color: COLORS.dark
    },
    reservation: {
        marginHorizontal: 20,
        marginTop: 20,
        padding: 12,
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 12
    },
    reservationText: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.light,
        letterSpacing: 0.5,
    }
})

