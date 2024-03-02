
export async function splitter(file: File, start: Number, end: Number) {

  // const size = file.size;
  // const nChunks = size / (1024 * 1024) //1mb chunks

  // console.log(size)
  // console.log(nChunks)

  const reader = new FileReader();
    reader.readAsArrayBuffer(file)

  // console.log("before reader")
  const bufferPromise: Promise<Buffer | undefined> = new Promise((resolve) => {
    // console.log("inside buffer")
    reader.onload = async function (event) {
      // console.log("read")
      const arrBuffer = event.target?.result;
      const buffer = Buffer.from(arrBuffer as ArrayBuffer, "utf-8")
      // console.log("buffer in split",buffer)
      // const buffer = Buffer.from(arrBuffer)
      const chunk = buffer.slice(start, end)
      resolve(chunk);
    }
  })
  // console.log("after reader")
  const buffer = await bufferPromise;
  // console.log(buffer);
  return buffer;


  // reader.onload = async function (event) {
  //   const fileContent = event.target?.result;
  //   const buffer = await Buffer.from(fileContent)
  //   bufferReturn = buffer

  // fs.writeFileSync("./file.pdf", buffer)





  // for (let i = 0; i < nChunks; i++) {
  //   const chunk = fileContent?.slice(i * nChunks, (i + 1 * nChunks))
  //   console.log(chunk)
  // }

  // Do something with the file content
  // console.log('File Content:', buffer);
};

// Read the file as text (you can use readAsDataURL, readAsArrayBuffer, etc. based on your needs)
// reader.readAsDataURL(file);
// console.log(file)
// const chunks = new Map();

// const chunkSize = 1024 * 1024 * 1;
// const nChunks = Math.ceil(file.data.length / chunkSize)

// console.log("Splitting file - " + file.name)
// console.log("Number of chunks - " + nChunks)

// for (let i = 0; i < nChunks; i++) {
//   const start = i * chunkSize;
//   const end = (i + 1) * chunkSize;

//   const buffer = file.data.slice(start, end);
//   const newName = i + "_" + file.name;

//   chunks.set(newName, buffer)
// }
//   return bufferReturn;
// };
