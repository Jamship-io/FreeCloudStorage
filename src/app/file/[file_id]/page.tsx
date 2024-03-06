import Downlaod from "~/app/download/page";
import { api } from "~/trpc/server";
import ViewFile from "~/app/_components/home/ViewFile";

export default async function ViewFileComponent(params: {
    params: {
        file_id: string;
    }
}

) {
    const file_id = params.params.file_id;
    const file = await api.file.getFileById.query(file_id)
    return (

        <div>
            <ViewFile file={file}></ViewFile>
        </div>
    )
};
