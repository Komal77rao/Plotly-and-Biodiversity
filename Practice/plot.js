console.log(cityGrowths);

var sortCity = cityGrowths.sort((a,b)=>a.Increase_from_2016 - blur.Increase_from_2016).reverse();
var highestCity = sortCity.slice(0,6);
var topFiveCityNames = highestCity.map(city => city.City);
var topFiveCityGrowths = highestCity.map(city => parseInt(city.Increase_from_2016));
var trace = {
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
  };
  var data = [trace];
  var layout = {
    title: "Most Rapidly Growing Cities",
    xaxis: { title: "City" },
    yaxis: { title: "Population Growth, 2016-2017"}
  };
  Plotly.newPlot("bar-plot", data, layout);
  


  // ------------------------------------------




  d3.json("samples.json").then(function(data){
    console.log(data);
    });

d3.json("samples.json").then(function(data){
   wref = data.metadata.map(freq => freq.wfreq).sort((a,b) => b-a);
       console.log(wref)
})

d3.json("samples.json").then(function(data){
   wfreq = data.metadata.map(person =>
person.wfreq).sort((a,b) => b - a);
   filteredWfreq = wfreq.filter(element => element !=
null);
   console.log(filteredWfreq);
});

d3.json("samples.json").then(function(data){
   firstPerson = data.metadata[0];
   Object.entries(firstPerson).forEach(([key, value]) =>
     {console.log(key + ': ' + value);});
});