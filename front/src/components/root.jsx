import React from "react";
import { WordCloud } from "./word_cloud";
import { SwitchButton } from "./switch_button";
import { ViewCountChart } from "./view_count_chart";


export class Root extends React.Component {
    state = {buttonState: "sec_info"};

    onButtonStateChange = (state) => {
        if (state.cur_value === null) {
            return;
        }
        this.setState({buttonState: state.cur_value});
    }

    render = () => {
        if (this.state.buttonState === "bullet_screen") {
            return (
                <div>
                    <SwitchButton onStateChange={this.onButtonStateChange}/>
                    <WordCloud id="bullet_word_cloud" data_dir="/data/bullets/BV1yu4y1r7mL_word.json" color_list={["#c71931", "#abc548", "#e66474", "#decc74", "#444444"]}/>
                </div>
            );
        }

        else if (this.state.buttonState === "hot_tag"){
            return (
                <div>
                    <SwitchButton onStateChange={this.onButtonStateChange}/>
                    <WordCloud id="hot_tag_word_cloud" data_dir="/data/hot_tag/data.json" color_list={["#3b8291", "#cc1b1b", "#91553b", "#171717"]}/>
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