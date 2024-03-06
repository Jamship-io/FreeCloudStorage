
import UploadComponent from "~/app/_components/upload/Upload";
import { api } from "~/trpc/server";

const Main = async () => {
  const files = await api.file.getAllFiles.query()
  return(
    <UploadComponent></UploadComponent>
  )
};

export default Main;