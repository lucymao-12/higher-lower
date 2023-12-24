import React from "react";
import "bootstrap/dist/css/bootstrap.css";


function Buttons(){
    const onPress = () => {
        console.log("Button pressed");

        
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <button type="button" className="btn btn-primary">Primary</button>
                </div>
                <div className="col-md-6">
                    <button type="button" className="btn btn-secondary">Secondary</button>
                </div>
            </div>
        </div>
    )
}