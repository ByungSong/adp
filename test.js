// Install request library
const request = require('request');

// Set counter
let count = 0;

// Set how many times you want to iterate
let numOfTest = 5

let intervalID = setInterval(function () {

   // Stops testing 
   if (++count === numOfTest) {
       clearInterval(intervalID);
   }

    // GET request
    request('https://interview.adpeai.com/api/v1/get-task', { json: true }, (error, res, body) => {

        // Display any error messages
        if (error) { 
            return console.log(error); 
        }

        // Perform calculations
        switch (body.operation) {
            case 'subtraction':
                result = body.left - body.right
                break;
            case 'addition':
                result = body.left + body.right
                break;
            case 'multiplication':
                result = body.left * body.right
                break;
            case 'remainder':
                result = body.left % body.right
                break;
            case 'division':
                result = body.left / body.right
                break;
            case 'substraction':
                result = body.left - body.right
                break;
        }

        // JSON format
        var data = `{ "id" : "${body.id}", "result": ${result} }`;

        //console.log(data)
        // Convert to javajcript obj
        var json_obj = JSON.parse(data);
        //console.log(json_obj)

        // POST request
        request.post('https://interview.adpeai.com/api/v1/submit-task', { json: json_obj }, (error, res, body) => {

            if (error) {
                console.log(error)
                return console.log(error); 
            } 

            // Display results
            console.log(`statusCode: ${res.statusCode}`)
            console.log(body)
            
        })
    });

}, 500);

