<template>
  <v-card>
    <v-card-title class="justify-center">
      {{ name }}
    </v-card-title>
    <v-card-text ref="chart" />
  </v-card>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "Benchmark",
  props: {
    data: {
      required: true,
      type: Array
    },
    name: {
      required: true,
      type: String
    }
  },
  data: () => ({
    svgWidth: 960,
    svgHeight: 500,
    margin: { top: 20, right: 20, bottom: 40, left: 40 },
    scaling: 1000
  }),
  computed: {
    rescaledData() {
      let array = [];
      this.data.forEach((element, index) =>
        array.push({
          index,
          mean: element.mean / this.scaling,
          up: element.up / this.scaling,
          down: element.down / this.scaling
        })
      )
      return array;
    },
    maxDataUp() {
      let array = [];
      this.rescaledData.forEach(element =>
        array.push(element.up)
      )
      return Math.max(...array);
    },
    minDataDown() {
      let array = [];
      this.rescaledData.forEach(element =>
        array.push(element.down)
      )
      return Math.min(...array);
    },
    chartWidth() {
      return this.svgWidth - this.margin.left - this.margin.right
    },
    chartHeight() {
      return this.svgHeight - this.margin.top - this.margin.bottom
    }
  },
  mounted() {
    console.log(this.data);
    this.makeChart()
  },
  methods: {
    makeChart() {
      let svg = d3
        .select(this.$refs.chart)
        .append("svg")
        .attr("width", this.svgWidth)
        .attr("height", this.svgHeight)
        .append("g")
        .attr(
          "transform",
          "translate(" + this.margin.left + "," + this.margin.top + ")"
        )
      let x = d3
        .scaleLinear()
        .range([0, this.chartWidth])
        .domain([0, this.data.length - 1])
      let xAxis = d3
        .axisBottom()
        .scale(x)
        .ticks(this.data.length-1);
      let y = d3
        .scaleLinear()
        .range([this.chartHeight, 0])
        .domain([0, this.maxDataUp])
      let yAxis = d3.axisLeft().scale(y);
      this.drawPaths(svg, x, y)
      this.addAxesAndLegend(svg, xAxis, yAxis)
    },
    addAxesAndLegend(svg, xAxis, yAxis) {
      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this.chartHeight + ")")
        .call(xAxis);
      svg
        .append("g")
        .attr("class", "y axis")
        .call(yAxis)
    },
    drawPaths(svg, x, y) {
      var area = d3
        .area()
        .curve(d3.curveBasis)
        .x(function(d) {
          return x(d.index);
        })
        .y0(function(d) {
          return y(d.up)
        })
        .y1(function(d) {
          return y(d.down)
        });

      var medianLine = d3
        .line()
        .curve(d3.curveBasis)
        .x(function(d) {
          return x(d.index);
        })
        .y(function(d) {
          return y(d.mean)
        });

      svg.datum(this.rescaledData);

      svg
        .append("path")
        .attr("class", "area")
        .attr("d", area)
      svg
        .append("path")
        .attr("class", "median-line")
        .attr("d", medianLine)
    }
  }
}
</script>

<style>
.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.axis text {
  fill: #000;
}

.axis .tick line {
  stroke: rgba(0, 0, 0, 0.1);
}

.area {
  fill: var(--v-secondary-base);
}

.median-line {
  fill: none;
  stroke: var(--v-primary-base);
  stroke-width: 3;
}
</style>
