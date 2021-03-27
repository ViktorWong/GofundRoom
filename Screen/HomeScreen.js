import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    Platform,
    TextInput,
    ScrollView,
    FlatList,
    LogBox,
    Dimensions,
    Animated
}
    from 'react-native'
import COLORS from '../Constants/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import hotels from '../Constants/Hotels'
import Card from '../Components/Card'
import CardCategories from '../Components/CardCategories'

LogBox.ignoreAllLogs()

const categorie = ["All", "Popular", "Luxury", "Featured", "Top Hotels"]

const { width } = Dimensions.get("screen")
const cardWith = width / 1.6

const scrollY = new Animated.Value(0)
const scrollX = new Animated.Value(0)

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCategories: 0
        }
    }

    getHotelDetail(hotel) {
        this.props.navigation.navigate('Detail', {
            hotel: hotel
        })
    }

    render() {

        const elevation = scrollY.interpolate({
            inputRange: [0, 25],
            outputRange: [0, 5],
            extrapolate: 'clamp'
        })

        return (
            <View style={styles.container}>

                <StatusBar barStyle='dark-content' translucent backgroundColor="rgba(0,0,0,0.04)" />

                <Animated.View style={{
                    elevation,
                    backgroundColor: COLORS.light,
                    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 35,
                    zIndex: 500
                }} >
                    <View style={styles.headerContainer}>
                        <TouchableOpacity>
                            <View style={{ height: 20, justifyContent: 'space-between' }}>
                                <View style={styles.burgerOne}></View>
                                <View style={styles.burgerThree}></View>
                                <View style={styles.burgerTwo}></View>  
                            </View>
                        </TouchableOpacity>
                        <Image source={require('../Image/profil.jpg')} style={styles.image} />
                    </View>
                </Animated.View>


                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                >

                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Find your Hotel</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.titleText}>in</Text>
                            <Text style={[styles.titleText, { color: COLORS.primary, marginLeft: 10 }]}>Comoros</Text>
                        </View>
                    </View>

                    <View style={styles.textInputContainer}>
                        <AntDesign name='search1' color={COLORS.grey} size={24} />
                        <TextInput
                            placeholder="Search a hotel in Comoros"
                            style={{
                                fontSize: 17,
                                fontWeight: '600',
                                letterSpacing: 1.2,
                                width: '100%',
                                paddingHorizontal: 10
                            }}
                        />
                    </View>

                    <View style={{ paddingVertical: 8, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "bold",
                            letterSpacing: 1,
                            color: COLORS.primary
                        }}>Top Rated</Text>
                        <TouchableOpacity>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: "bold",
                                letterSpacing: 1,
                                color: COLORS.grey
                            }}>Show All</Text>
                        </TouchableOpacity>
                    </View>
                    <Animated.FlatList
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )}
                        horizontal
                        contentContainerStyle={{
                            paddingVertical: 15,
                            paddingLeft: 20,
                            //paddingRight: cardWith/2-50
                        }}
                        data={hotels}
                        scrollEventThrottle={16}
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={cardWith}
                        decelerationRate={0}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => <Card onPress={() => this.getHotelDetail(item)} hotel={item} index={index} scrollX={scrollX} />}
                    />

                    {/** Categories Selectionnéé */}

                    <View
                        style={{ ...styles.catContainer }}>
                        {categorie.map((item, index) => (
                            <TouchableOpacity
                                key={index.toString()}
                                activeOpacity={0.7}
                                onPress={() => this.setState({ selectedCategories: index })}
                            >
                                <View style={{ position: "relative" }}>
                                    <Text
                                        style={{
                                            ...styles.catText,
                                            color: this.state.selectedCategories == index ? COLORS.primary : COLORS.grey,
                                        }}
                                    >
                                        {item}
                                    </Text>
                                    {
                                        this.state.selectedCategories == index && <View style={{
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

                    <Animated.FlatList
                        contentContainerStyle={{
                            paddingVertical: 15,
                            paddingHorizontal: 20
                        }}
                        data={hotels}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => <CardCategories hotel={item} index={index} />}
                    />

                </Animated.ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    burgerOne: {
        height: 3,
        width: 28,
        backgroundColor: COLORS.grey,
        borderRadius: 2
    },
    burgerTwo: {
        height: 3,
        width: 22,
        backgroundColor: COLORS.grey,
        borderRadius: 2,
    },
    burgerThree: {
        height: 3,
        width: 15,
        backgroundColor: COLORS.grey,
        borderRadius: 2,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 29,
        borderWidth: 3,
        borderColor: COLORS.grey
    },
    titleContainer: {
        paddingHorizontal: 15,
        marginTop: 12
        //marginVertical: 8,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.black,
        letterSpacing: 1
    },
    textInputContainer: {
        marginTop: 18,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        height: 45,
        paddingHorizontal: 15,
        backgroundColor: COLORS.secondary,
        borderRadius: 25,
        elevation: 2,
        marginBottom: 15
    },
    catContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 15
    },
    catText: {
        fontSize: 15,
        fontWeight: "bold",
        letterSpacing: 0.5
    }
})

export default HomeScreen;