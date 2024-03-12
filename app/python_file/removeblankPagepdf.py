#Creating new file which do not conatin any empty pages

import PyPDF2
import sys;
import copy, sys
from pypdf import PdfFileWriter, PdfFileReader
pdfurl1=sys.argv[1]
pdfurl2=sys.argv[2]

input = PdfFileReader(pdfurl1)
output = PdfFileWriter()
for i in range(0,input.getNumPages()):
        p = input.getPage(i)
        text = p.extractText()
        if (len(text) > 10):
            output.addPage(p)
output.write(sys.stdout)
print(sys.argv)