// Initialize Data
function init() {
    d3.json('./samples.json').then(function(data) {
        let dataIds = [];
        for (let i = 0, max = 10; i < max; i++) {
            dataIds.push(data.samples[i].id);
        };
        // Fill Dropdown Menu
        d3.select('select')
            .selectAll('option')
            .data(dataIds).enter()
            .append('option')
                .text(function (d) { return d; });
        // Demographic Info
        demogInfo(data.metadata[0]);
        // Bar Chart
        barChart(data.samples[0]);
        // Bubble Chart
        bubbleChart(data.samples[0]);
    });
};

function demogInfo(data) {
    let d3Meta = d3.selectAll('#sample-metadata');
        d3Meta.selectAll('tspan').remove()
        d3Meta.append('tspan')
            .html(`id: ${data.id}</br>`);
        d3Meta.append('tspan')
            .html(`ethnicity: ${data.ethnicity}</br>`);
        d3Meta.append('tspan')
            .html(`gender: ${data.gender}</br>`);
        d3Meta.append('tspan')
            .html(`age: ${data.age}</br>`);
        d3Meta.append('tspan')
            .html(`location: ${data.location}</br>`);
        d3Meta.append('tspan')
            .html(`bbtype: ${data.bbtype}</br>`);
        d3Meta.append('tspan')
            .html(`wfreq: ${data.wfreq}</br>`);
}

function barChart(data) {
    let sample_values = [];
    let otu_ids = [];
    let otu_labels = [];
    for (i = 0, max = 10; i < max; i++) {
        sample_values.push(data.sample_values[i]);
        otu_ids.push(`OTU ${data.otu_ids[i]}`);
        otu_labels.push(data.otu_labels[i]);
    };
    barData = [{
        type: 'bar',
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        orientation: 'h',
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending'
        }]
    }];
    Plotly.newPlot('bar', barData);
};

function bubbleChart(data) {
    let sample_values = [];
    let otu_ids = [];
    let otu_labels = [];
    for (i = 0, max = data.otu_ids.length; i < max; i++) {
        sample_values.push(data.sample_values[i]);
        otu_ids.push(data.otu_ids[i]);
        otu_labels.push(data.otu_labels[i]);
    };
    bubbleData = [{
        mode: 'markers',
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        marker: {
            color: otu_ids,
            size: sample_values
        }
        
    }];
    Plotly.newPlot('bubble', bubbleData);
};

function optionChanged(option) {
    d3.json('./samples.json').then(function(data) {
        // Update Metadata
        let newMetaData = data.metadata.filter(function (d) { return d.id == option; });
        demogInfo(newMetaData[0]);
        // Update Bar Chart
        let newChartData = data.samples.filter(function (d) { return d.id == option; });
        barChart(newChartData[0]);
        bubbleChart(newChartData[0]);
    });
};

init();