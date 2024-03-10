import { api } from "~/trpc/server"

async function Download() {

  const fileChunks = await api.file.getFileById.query("")

  return (

    <div>Download</div>
  // const uploaded = await uploader(blob, metaData as File)
  // console.log("upload response", uploaded)
  // saveAs(blob, filesArray[0]?.name);
  // const returnVal = await axios.post("/api/upload", splitted, { responseType: "arraybuffer" });
  )
}

export default Download