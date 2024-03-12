import sys;
# import module
from pdf2image import convert_from_path
pdfurl=sys.argv[1]

images = convert_from_path(pdfurl,300)

imageStore=[]
try:
	for i in range(len(images)):
		images[i].save('./app/tempFolder/page'+ str(i) +'.jpg', 'JPEG')
		imageStore.append('./app/tempFolder/page'+ str(i) +'.jpg')
	print(imageStore[0])
except NameError:
 print(NameError)