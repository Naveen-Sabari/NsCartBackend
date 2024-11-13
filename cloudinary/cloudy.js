const cloudinary = require('cloudinary').v2;
const path = require('path'); 
const fs = require('fs'); 

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

  const uploadsFolder = path.resolve(__dirname, '../f'); 

  fs.readdir(uploadsFolder, (err, files) => {
    if (err) {
      console.error('Error reading uploads folder:', err);
      return;
    }
  

    const imageFiles = files.filter(file => {
      return file.match(/\.(jpg|jpeg|png|gif|webp|avif)$/i);  
    });
  
   
    imageFiles.forEach(file => {
      const filePath = path.join(uploadsFolder, file); 
  
      cloudinary.uploader.upload(filePath, {
        folder: 'my_folder/NS',
        tags: 'Ns',             
      })
      .then(result => {
        console.log('Uploaded image:', result.secure_url);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
    });
  });