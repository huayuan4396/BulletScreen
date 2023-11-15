import React from "react";
import { BulletWordCloud } from "./bullet_word_cloud";
import { SwitchButton } from "./switch_button";

export class Root extends React.Component {
    state = {buttonState: "bullet_screen"};

    onButtonStateChange = (state) => {
        this.setState({buttonState: state.cur_value});
    }

    render = () => {
        if (this.state.buttonState === "bullet_screen") {
            return (
                <div>
                    <SwitchButton onStateChange={this.onButtonStateChange}/>
                    <BulletWordCloud id="bullet_word_cloud"/>
                </div>
            );
        }

        else{
            return (
                <div>
                    <SwitchButton onStateChange={this.onButtonStateChange}/>
                </div>
            );
        }
    }
}