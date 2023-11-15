import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export class SwitchButton extends React.Component {
    state = {cur_value: "bullet_screen"};

    onChange = (event, value) => {
        this.setState({cur_value: value}, () => {
            this.props.onStateChange(this.state);
        })
    }

    render = () => {
        return (
            <div>
                <ToggleButtonGroup
                    color="primary"
                    value={this.state.cur_value}
                    exclusive
                    onChange={this.onChange}
                >
                    <ToggleButton style={{outline: 'none'}} value="bullet_screen">bullet screen</ToggleButton>
                    <ToggleButton style={{outline: 'none'}} value="view_counts">view counts</ToggleButton>
                </ToggleButtonGroup>
            </div>
        );
    }
}