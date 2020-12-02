const MOVIE_SALES =
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

const VIDEO_GAME_DATA =
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

// set the dimensions and margins of the graph
var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
    .select("#root")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var color = d3.scaleOrdinal(d3.schemeCategory10);

d3.json(VIDEO_GAME_DATA).then((data) => {
    // Give the data to this cluster layout:
    var root = d3.hierarchy(data).sum(function (d) {
        return d.value; // Here the size of each leave is given in the 'value' field in input data
    });

    // Then d3.treemap computes the position of each element of the hierarchy
    d3.treemap().size([width, height]).padding(2)(root);

    // use the above information to add rectangles:
    let tile = svg
        .selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr("class", "tile")
        .attr("x", function (d, i) {
            if (i == 1) console.log(d.data);
            return d.x0;
        })
        .attr("y", function (d) {
            return d.y0;
        })
        .attr("width", function (d) {
            return d.x1 - d.x0;
        })
        .attr("height", function (d) {
            return d.y1 - d.y0;
        })
        .attr("data-name", (d) => d.data.name)
        .attr("data-category", (d) => d.data.category)
        .attr("data-value", (d) => d.data.value)
        .style("fill", (d) => {
            while (d.depth > 1) d = d.parent;
            return color(d.data.name);
        })
        .attr("fill-opacity", 0.6);
});
