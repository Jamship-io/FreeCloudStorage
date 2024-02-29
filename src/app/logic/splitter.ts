export async function split(file) {
    const chunks = new Map();
  
    const chunkSize = 1024 * 1024 * 1;
    const nChunks = Math.ceil(file.data.length / chunkSize)
  
    console.log("Splitting file - " + file.name)
    console.log("Number of chunks - " + nChunks)
  
    for (let i = 0; i < nChunks; i++) {
      const start = i * chunkSize;
      const end = (i + 1) * chunkSize;
  
      const buffer = file.data.slice(start, end);
      const newName = i + "_" + file.name;
  
      chunks.set(newName, buffer)
    }
    return chunks;
  };
  