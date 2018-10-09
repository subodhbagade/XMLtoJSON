// Dependencies
var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var xml2js = require('xml2js');
var upload = multer({dest:'OTFA/'});

// File Upload
router.post('/uploadXML',upload.any(),function(req,res,next) {
	if(req.files) {
		req.files.forEach(function(file) {
			var originalFileName = file.originalname;
			var fileName = originalFileName.slice(0,-4);
			var newFileName = fileName+'.json';
	
			fs.rename(file.path,'OTFA/'+originalFileName,function(err) {
				if(err)throw err;
				console.log("Uploading Success...");
			});

			//XML to JSON
			var parser = new xml2js.Parser();

			fs.readFile("OTFA/"+originalFileName,function(err,data) {
				parser.parseString(data,function(err,result) {
					fs.writeFile("OUTPUT/"+newFileName, JSON.stringify(result), function(err) {
	    				if(err) {
	        				return console.log(err);
	    				}
	    				console.log("Conversion to JSON and Storing Success...");
	    			});
				});
			});

		});
	}
	else {
		res.json({"message":"File missing"});
		console.log("image Missing");
	}
});

// Return router
module.exports = router;
