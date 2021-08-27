import React, { Component } from "react"; 
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"; 
import { Header, AirbnbRating, Icon } from "react-native-elements"; 
import { RFValue } from "react-native-responsive-fontsize"; 
import axios from "axios";

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            movieDetails:{}
        }
    }

    timeConvert(num) { 
        var hours = Math.floor(num / 60); 
        var minutes = num % 60; 
        return `${hours} hrs ${minutes} mins`; 
    }

    getMovie=()=>{
        const URL="http://localhost:5000/get-movie"
        axios.get(URL).then((response)=>{
            let details = response.data.data
            details["duration"]=this.timeconvert(details.duration)
            this.setState({movieDetails:details})
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    likedMovie=()=>{
        const URL="http://localhost:5000/liked-movie"
        axios.post(URL).then((response)=>{
            this.getMovie()
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    unlikedMovie=()=>{
        const URL="http://localhost:5000/unliked-movie"
        axios.post(URL).then((response)=>{
            this.getMovie()
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    notwatchedMovie=()=>{
        const URL="http://localhost:5000/not-watched-liked-movie"
        axios.post(URL).then((response)=>{
            this.getMovie()
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    render(){
        const movieDetails=this.state
        if(movieDetails.poster_link){
            const {poster_link,title,release_date,duration,overview,rating}=movieDetails
        }else{
            const poster_link="none"
        }
        return(
            <View style={style.container}>
                <View style={style.headerContainer}>
                    <Header centerComponent={{text:"Movie Recommended",style:style.headerTitle}} rightComponent={{icon:"search",color:"white"}} backgroundColor={"d500f9"} containerStyle={{flex:1}}/>
                </View>
                <View style={style.subContainer}>
                    <View stytle={style.subTopContainer}>
                        <Image style={style.posterImage} source={{uri:poster_link}}/>
                    </View>
                    <View style={style.subBottomContainer}>
                        <View style={style.upperBottomContainer}> 
                            <Text style={style.title}>{title}</Text>
                            <Text style={style.subtitle}>{`${ release_date.split("-")[0] } | ${duration}`}</Text> 
                        </View>
                        <View style={style.middleBottomContainer}> 
                            <View style={{ flex: 0.3 }}> 
                                <AirbnbRating 
                                    count={10} 
                                    reviews={["", "", "", "", ""]} 
                                    defaultRating={rating} 
                                    isDisabled={true} 
                                    size={RFValue(25)} 
                                    starContainerStyle={{ marginTop: -30 }} 
                                /> 
                            </View>
                            <View style={{ flex: 0.7, padding: 15 }}> 
                                <Text style={style.overview}>{overview}</Text> 
                            </View>
                        </View>
                        <View style={style.lowerBottomContainer}> 
                            <View style={style.iconButtonContainer}> 
                                <TouchableOpacity onPress={this.likedMovie}> 
                                    <Icon reverse name={"check"} type={"entypo"} size={RFValue(30)} color={"#76ff03"} /> 
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.unlikedMovie}> 
                                    <Icon reverse name={"cross"} type={"entypo"} size={RFValue(30)} color={"#ff1744"} /> 
                                </TouchableOpacity>
                            </View> 
                            <View style={style.buttonCotainer}> 
                                <TouchableOpacity style={style.button} onPress={this.notWatched} > 
                                    <Text style={style.buttonText}>Did not watch</Text> 
                                </TouchableOpacity> 
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({ 
    container: { flex: 1 }, 
    headerContainer: { flex: 0.1 }, 
    headerTitle: { color: "#fff", fontWeight: "bold", fontSize: RFValue(18) }, 
    subContainer: { flex: 0.9 }, 
    subTopContainer: { flex: 0.4, justifyContent: "center", alignItems: "center" }, 
    posterImage: { width: "60%", height: "90%", resizeMode: "stretch", borderRadius: RFValue(30), marginHorizontal: RFValue(10)}, 
    subBottomContainer: { flex: 0.6 },
    upperBottomContainer: { flex: 0.2, alignItems: "center" }, 
    title: { fontSize: RFValue(20), fontWeight: "bold", textAlign: "center" }, 
    subtitle: { fontSize: RFValue(14), fontWeight: "300" }, 
    middleBottomContainer: { flex: 0.35 }, 
    overview: { fontSize: RFValue(13), textAlign: "center", fontWeight: "300", color: "gray" }, 
    lowerBottomContainer: { flex: 0.45 }, 
    iconButtonContainer: { flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }, 
    buttonCotainer: { justifyContent: "center", alignItems: "center" },
    button: { width: RFValue(160), height: RFValue(50), borderRadius: RFValue(20), justifyContent: "center", alignItems: "center", borderWidth: 1, marginTop: RFValue(15) }, 
    buttonText: { fontSize: RFValue(15), fontWeight: "bold" } 
});