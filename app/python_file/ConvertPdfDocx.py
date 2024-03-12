####
import sys;
from pdf2docx import parse

pdfurl=sys.argv[1]
word_file = "app/tempFolder/convertImage/ConvertPdfDocx.docx"
parse(pdfurl, word_file, start=0, end=None)