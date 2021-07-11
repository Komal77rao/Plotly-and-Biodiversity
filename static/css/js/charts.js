function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    console.log(firstSample)
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sampleValues = data.samples;


    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = sampleValues.filter(sampleData => sampleData.id == sample);


    //  5. Create a variable that holds the first sample in the array.
    var sampleObj = sampleArray[0]; 

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var yvalues = sampleObj.otu_ids
    var xvalues = sampleObj.otu_labels
    var zvalues = sampleObj.sample_values



    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var ticks = yvalues.slice(0,10).map(value => 'OTU '+value).reverse();
    console.log(ticks)
    
    // 8. Create the trace for the bar chart. 
    var barData = [{
      type : "bar",
      x: zvalues.slice(0,10).reverse(),
      y: ticks,
      text : xvalues,
      orientation : 'h'

    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      yaxis: {
        tickmode: "auto", 
        tick0: 0,
        ntick: 10,
        tickvals: ticks

      },
      title: "Top 10 Bacteria cultures Found"
     
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar",barData, barLayout);

  });
}

// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

    var sampleValues = data.samples;
// 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = sampleValues.filter(sampleData => sampleData.id == sample);


    //  5. Create a variable that holds the first sample in the array.
    var sampleObj = sampleArray[0]; 

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var yvalues = sampleObj.otu_ids
    var xvalues = sampleObj.otu_labels
    var zvalues = sampleObj.sample_values

    var ticks = yvalues.slice(0,10).map(value => 'OTU '+value).reverse();
    console.log(ticks)
    
    // 8. Create the trace for the bar chart. 
    var barData = [{
      type : "bar",
      x: zvalues.slice(0,10).reverse(),
      y: ticks,
      text : xvalues,
      orientation : 'h',
      marker:{
        color:"rgba(50,171,96,0.6)"
      }

    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      yaxis: {
        tickmode: "auto", 
        tick0: 0,
        ntick: 10,
        tickvals: ticks

      },
      title: "Top 10 Bacteria cultures Found",
      paper_bgcolor: "lavender"

     
    };
    

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar",barData, barLayout);

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: yvalues,
      y: zvalues.map(value => value),
      text: xvalues,
      mode: 'markers',
       marker: {
         color: yvalues,
         size: zvalues
      }
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures per Samples",
      xaxis:{
        title: "OTU ID"
      },
      hovermode:  'closest',
      paper_bgcolor: "lavender"

      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

    d3.json("samples.json").then((data) => {

      var sampleValues = data.metadata;
  // 4. Create a variable that filters the samples for the object with the desired sample number.
      var sampleArray = sampleValues.filter(sampleData => sampleData.id == sample);
  
  
      //  5. Create a variable that holds the first sample in the array.
      var sampleObj = sampleArray[0]; 

      // Create a variable that holds the washing frequency.

      var wfrequency = sampleObj.wfreq;



      var gaugeData = [{
        value: wfrequency,
        title: { text: "Belly Button Washing Frequency<br>Scrubs per week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: {range : [0, 10]},
          bar: { color: "black"},
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6,8], color: "green"},
            { range: [8,10], color: "darkgreen"}]
          }
        }];
      
      // 5. Create the layout for the gauge chart.
      var gaugeLayout = { 
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "lavender",
        font: { color: "black", family: "Arial" }
       
      };
  
      // 6. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot('gauge', gaugeData, gaugeLayout);
    
  
    
    });











  });
}



