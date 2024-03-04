// const express = require('express');
// const fileUpload = require('express-fileupload');
// const app = express();
// const cors = require("cors");
// const fs = require("fs");

// app.use(cors())

// // THE INBUILT NEXTJS ROUTER DOENST SEEM TO BE WORKING WITH FILE CHUNK SO I SET THIS UP 

// app.use(fileUpload());

// app.post('/upload', async (req, res) => {
//   const split = require('./segmentation/split/splitter');
//   try {
//     const { file } = req.files;
//     const response = await split(file)
//     res.send(response)
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.post('/download', async (req, res) => {
//   fs.readdir('./records', async (err, files) => {
//     if (err) {
//       res.status(500).send({ error: 'Failed to read directory.' });
//       return;
//     }

//     const filePromises = files.map((file) => {
//       return new Promise((resolve, reject) => {
//         fs.readFile(`./records/${file}`, 'utf-8', (err, data) => {
//           if (err) {
//             reject(err);
//             return;
//           }
//           const parsed = JSON.parse(data);
//           fs.stat("./records/" + file, (err, data) => {
//             resolve({ name: file, file_data: parsed, stats: data });
//           });
//         });
//       });
//     });

//     try {
//       const fileContents = await Promise.all(filePromises);
//       res.send(fileContents);
//     } catch (error) {
//       res.status(500).send({ error: 'Failed to read files.' });
//     }
//   });
// });


// app.get('/download/:filename', async (req, res) => {
//   console.log("Download Request")
//   const downloadFile = require('./data_transfer/fileDownload');
//   const file = await downloadFile("./records/" + req.params.filename)
//   res.set({
//     'Content-Type': 'application/octet-stream',
//     'Content-Disposition': `attachment; filename="${file.name}"`,
//         'Content-Length':  file.chunks.length,
//   });

//   res.send(file);
// });

// app.get("/", (req, res)=>{
//     res.json("hello worl")
// })

// app.listen(3001, () => {
//   console.log(`Server is running on http://localhost:${3000}`);
// });
