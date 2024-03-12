FROM node:16

# Set working directory
WORKDIR /usr/appnodejs
RUN apt-get update

# Install tesseract library
RUN apt-get install tesseract-ocr -y

# Download last language package
RUN mkdir -p /usr/appnodejs/tessdata
ADD https://github.com/tesseract-ocr/tessdata/blob/4767ea922bcc460e70b87b1d303ebdfed0897da8/ita.traineddata /usr/share/tessdata/ita.traineddata

# Check the installation status
RUN tesseract --list-langs    
RUN tesseract -v 

COPY ./package*.json ./

# Install dependencies
RUN npm -g install 

RUN apt-get update && apt-get install -y libsm6 libxext6 libxrender-dev python3.5 python3-pip 
RUN pip3 install -U pip && pip install pytesseract Pillow
RUN pip3 install opencv-python
RUN apt update && apt-get install ghostscript -y
RUN apt update && apt-get install poppler-utils -y 
RUN pip3 install aspose-pdf
RUN pip3 install setuptools
RUN pip3 install -U Image pdf2image PyPDF2 pdf2docx
RUN pip3 uninstall fitz
RUN pip3 install --upgrade --force-reinstall pymupdf
RUN apt-get update && apt-get install img2pdf -y
RUN apt-get update && apt-get install libgl1-mesa-glx -y
RUN npm install pdf2pic
RUN npm i -g nodemon

# Install OpenJDK-11
RUN apt-get update && \
    apt-get install -y openjdk-11-jre-headless && \
    apt-get clean;
    
# Fix certificate issues
RUN apt-get update && \
    apt-get install ca-certificates-java && \
    apt-get clean && \
    update-ca-certificates -f;

# Copy all files
COPY . .
COPY /default.conf /etc/nginx/conf.d/

# Expose the listening port
EXPOSE 80

ENV environment default_env_value
# Launch app with PM2
CMD ["sh", "-c", "npm run ${environment}"]