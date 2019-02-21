import React, { Component } from "react";
import logo from "../../assets/logo.svg";
import styles from "../index.css";

export default class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(styles);
    return (
      <div>
        <div
          style={{
            width: "vw",
            background: "#562424",
            height: "100px",
            paddingLeft: "50px",
            paddingRight: "50px"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "min-content 1fr 1fr",
              paddingTop: "20px",
              paddingBottom: "20px"
            }}
          >
            <div style={{ paddingRight: "20px" }}>
              <img src={logo} style={{ height: "60px" }} />
            </div>

            <div align="left" style={{ marginTop: "-5px" }}>
              <h1
                style={{
                  textAlign: "left",
                  fontFamily: "Helvetica",
                  color: "white"
                }}
              >
                TaskTree
              </h1>
            </div>
            <div align="right">
              <button
                style={{
                  height: "60px",
                  background: "rgba(0,0,0,0)",
                  color: "white",
                  borderRadius: "5px",
                  fontSize: "20px",
                  width: "100px"
                }}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            fontFamily: "helvetica"
          }}
        >
          <div
            style={{
              background: "#A94C4C",
              padding: "50px"
            }}
          >
            Column A
          </div>
          <div style={{ padding: "50px" }}>Column B</div>
        </div>
      </div>
    );
  }
}
