import sys;
import PyPDF2;

pdfurl=sys.argv[1]
reader = PyPDF2.PdfReader(pdfurl)
# print the number of pages in pdf file
print(len(reader.pages))
# print the text of the first page
print(reader.pages[0].extract_text())
