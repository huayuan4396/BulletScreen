import React from "react";
import { BulletWordCloud } from "./bullet_word_cloud";
import { SwitchButton } from "./switch_button";
import { ViewCountChart } from "./view_count_chart";


export class Root extends React.Component {
    state = {buttonState: "sec_info"};

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

        else if (this.state.buttonState === "hot_tag"){
            return (
                <div>
                    <SwitchButton onStateChange={this.onButtonStateChange}/>
                </div>
            );
        }

        else if (this.state.buttonState === "sec_info") {
            return (
                <div>
                    <SwitchButton onStateChange={this.onButtonStateChange}/>
                    <ViewCountChart id="view_count_chart"/>
                </div>
            );
        }
    }
}