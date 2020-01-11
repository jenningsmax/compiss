import React, { Component } from "react";
import { Image, View, Text, Dimensions } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import { ScreenOrientation } from "expo";
import { Magnetometer } from "expo-sensors";

import calculateAngle from "../Utils/calculateAngle";
import calculateDegree from "../Utils/calculateDegree";

const { height, width } = Dimensions.get("window");

class Compass extends Component {
  constructor() {
    super();
    this.state = {
      magnetometer: "0"
    };
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  _subscribe = async () => {
    this._subscription = Magnetometer.addListener(data => {
      this.setState({ magnetometer: calculateAngle(data) });
    });
  };

  _direction = degree => {
    if (degree >= 22.5 && degree < 67.5) {
      return "NE";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "E";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "SE";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "S";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "SW";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "W";
    } else if (degree >= 292.5 && degree < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  };

  componentWillMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT_UP);
  }

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return (
      <Grid style={{ backgroundColor: "black" }}>
        <Row style={{ alignItems: "center" }} size={0.9}>
          <Col style={{ alignItems: "center" }}>
            <Text
              style={{
                color: "#fff",
                fontSize: height / 26,
                fontWeight: "bold"
              }}
            >
              {this._direction(calculateDegree(this.state.magnetometer))}
            </Text>
          </Col>
        </Row>

        <Row style={{ alignItems: "center" }} size={0.1}>
          <Col style={{ alignItems: "center" }}>
            <View
              style={{
                position: "absolute",
                width: width,
                alignItems: "center",
                top: 0
              }}
            >
              <Image
                source={require("../assets/compass_pointer.png")}
                style={{
                  height: height / 26,
                  resizeMode: "contain"
                }}
              />
            </View>
          </Col>
        </Row>

        <Row style={{ alignItems: "center" }} size={2}>
          <Text
            style={{
              color: "#fff",
              fontSize: height / 27,
              width: width,
              position: "absolute",
              textAlign: "center"
            }}
          >
            {calculateDegree(this.state.magnetometer)}°
          </Text>

          <Col style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/compass_bg.png")}
              style={{
                height: width - 80,
                justifyContent: "center",
                alignItems: "center",
                resizeMode: "contain",
                transform: [{ rotate: 360 - this.state.magnetometer + "deg" }]
              }}
            />
          </Col>
        </Row>

        <Row style={{ alignItems: "center" }} size={1}>
          <Col style={{ alignItems: "center" }}>
            <Text style={{ color: "#fff" }}>Copyright @RahulHaque</Text>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Compass;
