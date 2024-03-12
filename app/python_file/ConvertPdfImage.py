# import fitz
# import sys;
# from pdf2image import convert_from_path
# pdfurl=sys.argv[1]

# # doc = fitz.open(pdfurl)
# # page = doc.load_page(0)
# # pixmap = page.get_pixmap(dpi=300)
# output = "app/tempFolder/LetterHead/output.png"
# # pixmap.save(output)
# images = convert_from_path(pdfurl,300)
# imageStore=[]
# try:
# 	for i in range(len(images)):
# 		images[0].save(output, 'PNG')
# 		imageStore.append(output)
# 	print(imageStore[0])
# except NameError:
#  print(NameError)
import sys;
from spire.pdf.common import *
from spire.pdf import *
pdfurl=sys.argv[1]

# Create a PdfDocument object
doc = PdfDocument()
# Load a PDF document
doc.LoadFromFile(pdfurl)

# Set the background transparent value (0 - 255) of the converted images
doc.ConvertOptions.SetPdfToImageOptions(0)

# Loop through the pages in the document
for i in range(doc.Pages.Count):
    # Save each page as a PNG image
    fileName = "img-{0:d}.png".format(i)
    with doc.SaveAsImage(i) as imageS:
        imageS.Save(fileName)

# Close the PdfDocument object
doc.Close()