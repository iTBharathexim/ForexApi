# Python3 program to convert image to pdf
# using img2pdf library

# importing necessary libraries
import img2pdf
from PIL import Image
import sys;
pdfurl=sys.argv[1]

# storing image path
img_path =pdfurl

# storing pdf path
pdf_path = "./app/tempFolder/Convert_Image_to_Pdf.pdf"

# opening image
image = Image.open(img_path)

# converting into chunks using img2pdf
pdf_bytes = img2pdf.convert(image.filename)

# opening or creating pdf file
file = open(pdf_path, "wb")

# writing pdf files with chunks
file.write(pdf_bytes)

# closing image file
image.close()

# closing pdf file
file.close()

# output
print('Convert_Image_to_Pdf.pdf')
