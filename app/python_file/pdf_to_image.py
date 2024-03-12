import sys;
import pytesseract
import cv2;
pdfurl=sys.argv[1]

pytesseract.pytesseract.tesseract_cmd = r"/usr/bin/tesseract"
# config = ('eng --psm 1')
# img = cv2.imread(pdfurl)
# text = pytesseract.image_to_string(img, config=config)
# print(text);

import io
import requests
from PIL import Image

url = pdfurl
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
r = requests.get(url, headers=headers)
img = Image.open(io.BytesIO(r.content))
text = pytesseract.image_to_string(img)
print(text)