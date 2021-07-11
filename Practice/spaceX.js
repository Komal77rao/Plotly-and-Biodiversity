const url = "https://api.spacexdata.com/v2/launchpads";


// access the objects in the array of obects using dot -
d3.json(url).then(receivedData => console.log(receivedData[0]));

// get latitude using map
 d3.json(url).then(receivedData => receivedData.map(lat => lat.location.latitude));
// // get longitude using map 
// d3.json(url).then(receivedData => receivedData.map(lng => console.log(lng.location.longitude)));
