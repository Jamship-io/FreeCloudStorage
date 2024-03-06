
import { getServerSession } from "next-auth";
import UploadComponent from "~/app/_components/upload/Upload";
import { authOptions } from "~/server/auth";
// import { api } from "~/trpc/server";

const Main = async () => {
  const session = await getServerSession(authOptions);
  // const files = await api.file.getAllFiles.query()
  if (!session || !session?.user) {
    return (
        <div>
            <div>Not logged in</div>
        </div>
    );
}
  return(
    <UploadComponent></UploadComponent>
  )
};

export default Main;