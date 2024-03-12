var htmlPdfChrome = require("html-pdf-chrome");

function generatePDF(html, options, format, outputFile) {
    
    var options = {
        port: 9222,
        printOptions: {
            printBackground: true,
            marginTop: 0.4,
            marginBottom: 0.5,
            marginLeft: 0.05,
            marginRight: 0.05,
            paperWidth: 8,
            paperHeight: 14,
            ...options,
        },
    };
    
    return htmlPdfChrome.create(html, options).then(function(pdf) {
        
        if (format && format.file && format.filePath) {
            pdf.toFile(format.filePath).then(() => {
                outputFile(format);
                
                return true;
            });
        } else {
            const buffer = pdf.toBase64();
            outputFile(buffer);
            return true;
        }
    });
}

module.exports = generatePDF;