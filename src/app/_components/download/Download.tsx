// // "use client"
// import { downloader } from "actions/downloader"
// import { saveAs } from "file-saver";
// import { api } from "~/trpc/server"

// async function Download() {

//   // const fileChunks = await api.file.getFileById.query("")
//   const downlaoded = await downloader("BQACAgUAAx0EedvQvwACA3Nl7bIZ_z0S6L76bfFQj-hnNzVvuwACuw4AAmeTaVfJ7FrRlTMfjTQE")
//   const blob = new Blob([downlaoded]);
//   saveAs(blob, "hellow world")
//   console.log("blob", blob)
//   console.log(downlaoded)

//   return (

//     <div>
//       Download
//     </div>

//     // const uploaded = await uploader(blob, metaData as File)
//     // console.log("upload response", uploaded)
//     // saveAs(blob, filesArray[0]?.name);
//     // const returnVal = await axios.post("/api/upload", splitted, { responseType: "arraybuffer" });
//   )
// }

// export default Download