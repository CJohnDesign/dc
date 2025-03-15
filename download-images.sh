#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p public

# Download the images
curl -o public/scaling-with-loans-home-11-1024x683-1.jpg https://www.delivercapital.com/wp-content/uploads/2023/07/scaling-with-loans-home-11-1024x683-1.jpg
curl -o public/scaling-with-loans-home-16-1024x683-1.jpg https://www.delivercapital.com/wp-content/uploads/2023/07/scaling-with-loans-home-16-1024x683-1.jpg
curl -o public/confrence.png https://www.delivercapital.com/wp-content/uploads/2023/08/confrence.png

echo "Images downloaded successfully!" 