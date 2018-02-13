const csv = require('csvtojson');
const alasql = require('alasql');
const fileReaderStream = require('filereader-stream')

document.getElementById('uploader').addEventListener('change', readFile, false);

function readFile (evt) {
    var files = evt.target.files;
    var file = files[0];           
    var readStream = fileReaderStream(file);
    alasql("CREATE TABLE example1 (a FLOAT)");

      csv()
      .fromStream(readStream)
      .on('json',(jsonObj)=>{
        var units = jsonObj['Units Sold'];
        alasql(`INSERT INTO example1 VALUES (${units})`);
      })
      .on('done',(error)=>{
        if (error) console.log(error)
      	console.log('end')
        var res = alasql("SELECT SUM(a) from example1");
        console.dir(res)
      })

}
