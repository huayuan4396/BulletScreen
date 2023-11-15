import React from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
var d3 = require("d3");


export class ViewCountChart extends React.Component {
    state = {data: null, loading: true, attr_idx: 0}

    attr_name_list = ["play", "bullet", "coin", "like", "share", "favourite"]
    color_list = ["#8fa8c4", "#f6b57d", "#ea9495", "#a6cfcb", "#f3da8c", "#d0cac7"]

    componentDidMount() {
        fetch(process.env.PUBLIC_URL + '/data/view_counts/data.json')
            .then((response) => response.json())
            .then((data) => {
                data = data.data;
                this.setState({ data: data, loading: false }, () => {this.drawChart(this.attr_name_list[this.state.attr_idx], this.color_list[this.state.attr_idx])});
            });
    }

    drawChart = (attr_name, color) => {
        const height = 500;
        const width = 1000;
        const margin = {top: 20, right: 20, bottom: 50, left: 120};
    
        let svg = d3.select("#" + this.props.id)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        let x = d3.scaleBand().range([0, width]).padding(0.1);
        let y = d3.scaleLinear().range([height, 0]);
    
        x.domain(this.state.data.map(function(d) { return d.name; }));
        y.domain([0, d3.max(this.state.data, function(d) { return d[attr_name]; })]);
    
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("font-size", "15px")
            .style("font-family", "Helvetica");

            svg.append("g")
            .attr("transform", "translate(0," + 0 + ")")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .style("font-size", "15px")
            .style("font-family", "Helvetica");

        var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);   
    
        svg.append("g")
            .attr("fill", color)
            .selectAll("rect")
            .data(this.state.data)
            .join("rect")
            .attr("x", function(d) { return x(d.name); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d[attr_name]); })
            .attr("height", function(d) { return height - y(d[attr_name]); })
            .on("mouseover", (event, d) => {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(d[attr_name])
                    .style("left", (event.pageX + 1) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", (event, d) => {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });         
    }

    changeAttr = (event) => {
        this.setState({attr_idx: event.target.value}, () => {
            d3.select("#" + this.props.id).select("svg").remove();
            this.drawChart(this.attr_name_list[this.state.attr_idx], this.color_list[this.state.attr_idx])
        });
    }
    

    render = () => {
        if (this.state.loading) {
            return <div>loading</div>
        }
        else {
            return (
                <div>
                    <Box style={{marginLeft: "1rem", marginBottom: "1rem", width: "150px"}}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Attribute</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={this.state.attr_idx} label="attr_idx" onChange={this.changeAttr}>
                                <MenuItem value={0}>播放量</MenuItem>
                                <MenuItem value={1}>弹幕数</MenuItem>
                                <MenuItem value={2}>投币数</MenuItem>
                                <MenuItem value={3}>点赞数</MenuItem>
                                <MenuItem value={4}>转发量</MenuItem>
                                <MenuItem value={5}>收藏数</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <div id={this.props.id}></div> 
                </div>
                
            )
        }
    }
}