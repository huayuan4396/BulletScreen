import React from "react";
var d3 = require("d3"), cloud = require("d3-cloud");

export class BulletWordCloud extends React.Component {
    state = {word_list: null, loading: true}

    componentDidMount() {
        fetch(process.env.PUBLIC_URL + '/bullets/BV1yu4y1r7mL_word.json')
            .then((response) => response.json())
            .then((word_list) => {
                word_list = word_list.word_list;
                this.setState({ word_list, loading: false }, this.drawBarChart);
            });
      }

    drawBarChart = () => {
        let layout = cloud()
            .size([500, 500])
            .words(this.state.word_list.map((d) => {return {text: d[0], size: 10 + d[1] * 0.6};}))
            .padding(1)
            .rotate(() => (Math.random() - 0.5) * 90)
            .font("Impact")
            .fontSize((d) => d.size)
            .on("end", this.draw.bind(this));

        layout.start();
    }

    draw(words) {
        d3.select("#bullet_word_cloud").append("svg")
            .attr("width", 500)
            .attr("height", 500)
          .append("g")
            .attr("transform", "translate(" + 500 / 2 + "," + 500 / 2 + ")")
          .selectAll("text")
            .data(words)
          .enter().append("text")
            .style("font-size", (d) => d.size + "px")
            .style("font-family", "Impact")
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