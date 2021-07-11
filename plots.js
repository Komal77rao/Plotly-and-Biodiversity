function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

  
function optionChanged(newSample) {
    console.log(newSample);
  }

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      Object.entries(result).forEach(([key,value]) => {
        PANEL.append("h6").text(`${key}: ${value}`);
      })
        

    });
}


function buildCharts(sample){
  d3.json("samples.json").then((data) => {
    var sampleValues = data.samples;
    var sampleArray = sampleValues.filter(sampleData => sampleData.id == sample);
    var sampleObj = sampleArray[0];
    var yvalues = Object.values(sampleObj.otu_ids)
    var xvalues = Object.values(sampleObj.otu_labels);
    var zvalues = Object.values(sampleObj.sample_values)

    var ticks = yvalues.slice(0,10).reverse();
    console.log(ticks)

    var trace ={
      x:zvalues,
      y:ticks,
     type:"bar",
     orientation:'h'
      
     }

     var trace2 = {
       x:yvalues,
       y:xvalues,
       type:"bar",
       orientation:'h'
     }

    Plotly.newPlot("bar",[trace]);

  })



}