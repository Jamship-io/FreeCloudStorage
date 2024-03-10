"use client"

import DownlaodButton from "../download/DownloadButton";

export default async function ViewFile({ file }: {
    file: {
        id: string;
        file_name: string;
        file_size: number;
        file_type: string;
        date: Date | null;
        // userId: string | null;
    }
}) {
    const size = ((file?.file_size) / (1024 * 1024)).toFixed(3)
    console.log("get single file - ", file)
    return (
        <div>
            <h1>ViewFile</h1>
            <h1>Viewing File - {file?.file_name}</h1>
            <h1 className="truncate">File Size - {size}MB</h1>
            <h1>File type - {file?.file_type}</h1>
            <DownlaodButton></DownlaodButton>
        </div>

    )
}