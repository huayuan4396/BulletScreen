import React from "react";
var d3 = require("d3"), cloud = require("d3-cloud");

export class WordCloud extends React.Component {
    state = {word_list: null, loading: true}
    color_list = this.props.color_list
    rotate_list = [40, -50, 0]

    componentDidMount() {
        fetch(process.env.PUBLIC_URL + this.props.data_dir)
            .then((response) => response.json())
            .then((word_list) => {
                word_list = word_list.word_list;
                console.log(word_list);
                this.setState({ word_list, loading: false }, () => {this.drawCloud();});
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.data_dir !== prevProps.data_dir) {
            fetch(process.env.PUBLIC_URL + this.props.data_dir)
            .then((response) => response.json())
            .then((word_list) => {
                word_list = word_list.word_list;
                this.setState({ word_list, loading: false }, () => {
                    d3.selectAll("svg").remove();
                    this.color_list = this.props.color_list;
                    this.drawCloud();
                });
            });
        }
    }

    drawCloud = () => {
        let layout = cloud()
            .size([800, 600])
            .words(this.state.word_list.map((d) => {return {text: d[0], size: 20 + d[1] / this.props.size_mul};}))
            .padding(1)
            .rotate((d, i) => this.rotate_list[i % this.rotate_list.length])
            .font("Helvetica")
            .fontSize((d) => d.size)
            .on("end", this.draw.bind(this));

        layout.start();
    }

    draw(words) {
        d3.select("#" + this.props.id).append("svg")
            .attr("width", 800)
            .attr("height", 600)
          .append("g")
            .attr("transform", "translate(" + 800 / 2 + "," + 600 / 2 + ")")
          .selectAll("text")
            .data(words)
          .enter().append("text")
            .style("font-size", (d) => d.size + "px")
            .style("font-family", "Impact")
            .style("fill", (d, i) => this.color_list[i % this.color_list.length])
            .attr("text-anchor", "middle")
            .attr("transform", (d) => {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text((d) => d.text);
    }
      

    render = () => {
        if (this.state.loading) {
            return <div>loading</div>
        }
        else {
            return (
                <div id={this.props.id}></div> 
            )
        }
    }
}