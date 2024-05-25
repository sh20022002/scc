const https = require('https');
const fs = require('fs');

const url = 'https://d3c33hcgiwev3.cloudfront.net/_410e934e6553ac56409b2cb7096a44aa_SCC.txt?Expires=1716681600&Signature=OZ0q07Yn3Bk4zt-9KTrkF4OIy3m1GjBy-cTSnapZ6ZS0uUlb9wPYv8CziG4ySIMgfL0Puri8CfBBZWfGN1pK1j9DUAn0DMckrfog4Iffr70p5AYP0fLcJd4gMzcXhYfnjgTxbiwYXluoZBaqopV8wxDKFyYznn8k70ditopXKiY_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A';

https.get(url, (res) => {
    let data = '';

    // A chunk of data has been received.
    res.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received.
    res.on('end', () => {
        console.log(data);

        // Optionally, save the data to a file
        fs.writeFile('edge.txt', data, (err) => {
            if (err) throw err;
            console.log('File has been saved!');
        });
    });

}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
