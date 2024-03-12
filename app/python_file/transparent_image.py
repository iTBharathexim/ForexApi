from PIL import Image  
import sys;

imagePath=sys.argv[1]
img = Image.open(imagePath) 
rgba = img.convert("RGBA") 
datas = rgba.getdata()
newData = [] 

for item in datas: 
	if item[0] == 0 and item[1] == 0 and item[2] == 0:
		newData.append((255, 255, 255, 0)) 
	else: 
		newData.append(item)

rgba.putdata(newData) 
rgba.save("transparent_image.png", "PNG") 
