import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export class SwitchButton extends React.Component {
    state = {cur_value: "sec_info"};

    onChange = (event, value) => {
        this.setState({cur_value: value}, () => {
            this.props.onStateChange(this.state);
        })
    }

    render = () => {
        return (
            <div style={{marginBottom: "2rem"}}>
                <ToggleButtonGroup
                    color="primary"
                    value={this.state.cur_value}
                    exclusive
                    onChange={this.onChange}
                >
    
                    <ToggleButton style={{outline: 'none'}} value="sec_info">section info</ToggleButton>
                    <ToggleButton style={{outline: 'none'}} value="hot_tag">hot tag</ToggleButton>
                    <ToggleButton style={{outline: 'none'}} value="bullet_screen">bullet screen</ToggleButton>
                    
                </ToggleButtonGroup>
            </div>
        );
    }
}