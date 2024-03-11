import THELOOP from "actions/THELOOP";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaFile } from "react-icons/fa";

export default function UploadModal({ setIsUploadClicked }: { setIsUploadClicked: Dispatch<SetStateAction<boolean>> }) {
  const [userId, setUserId] = useState<string | undefined>("")
  const session = useSession()
  // const userId = session.data?.user.id

  useEffect(()=>{
    if(session){
      setUserId(session.data?.user.id)
      console.log(session.data?.user.id)
    }
    else{
      console.log("session undefined")
    }
  }, [session])

  console.log("user id is ", userId)

  const [file, setFile] = useState<File | undefined>();
  const [percentage, setPercentage] = useState(0);
  const [clicked, setClicked] = useState(false);

  async function handleUpload() {
    if (file && userId) {
      setIsUploadClicked(prevstate => !prevstate);
      setClicked(true);
      console.log("UPLOAD MARDIS");
      await THELOOP(file, setPercentage, userId)
      // await THELOOP(file, setPercentage);
    }
  }

  function handleCloseModal() {
    window.location.reload()
    const modal = document.getElementById('my_modal_4') as HTMLDialogElement | null;

    modal?.close()
    
    // setFile(undefined)
    // setPercentage(0)
    // setClicked(false)
  }

  return (
    <div>
      <button
        className="btn bg-[#B5ADFF] rounded-md text-[#2C2A3C] hover:text-white hover:bg-[#1D1C26]"
        onClick={() => {
          const modal = document.getElementById('my_modal_4') as HTMLDialogElement | null;

          // if (modal && modal.showModal) {
          //   modal.showModal();
          // }
          modal?.showModal()
        }}
      >
        <h1 className="text-2xl">UPLOAD</h1>
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box bg-[#2C2A3C] max-w-4xl rounded-sm flex flex-col h-[50%] m-0 p-0">

          <div className="modal-action m-1 self-start">
            <form method="dialog" className="p-5">
              <button className="btn rounded-md" onClick={() => { handleCloseModal }}>
                <h1 className="text-2xl">
                CLOSE
                </h1>
                </button>
            </form>
          </div>

          <div className="flex w-full h-full justify-center items-center">

            {!clicked || !file ? (
              <div className="w-full h-full flex flex-col items-center mx-2">
                {/* <h3 className="font-bold center">Upload files for free :D</h3> */}
                <FileInput setFile={setFile}></FileInput>
                <button className="btn btn-primary rounded-sm w-full" onClick={handleUpload}>
                  UPLOAD
                </button>
              </div>
            ) : (
              <div className="text-black font-black flex flex-col items-center justify-center min-w-[60%]">

                {file && clicked ? (
                  <>
                    {percentage !== 100 ? (
                      <>
                        <div className="flex">
                          <FaFile width={18} height={18} className="w-40 h-40"></FaFile>
                        </div>
                        <div className="">
                          <div className="mx-2 flex ">
                            <progress className="progress progress-info w- m-2" value={percentage} max="100"></progress>
                            <h1>{percentage}%</h1>
                          </div>
                          <h1>{file?.name}</h1>
                          <h1>{file?.size}</h1>
                          <h1>{file?.type}</h1>
                        </div>
                      </>
                    ) : (
                      <h1 className="text-white :)">Upload Complete</h1>
                    )}
                  </>
                ) : null}

              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}

type FileInputProps = {
  setFile: Dispatch<SetStateAction<File | undefined>>;
};

function FileInput({ setFile }: FileInputProps) {
  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFile(e.target?.files?.[0]);
    console.log(e.target?.files?.[0]);
  }

  return (
    <label className="form-control w-[60%] min-h-full bg-white">
      <div className="label">
        {/* <span className="label-text">Pick a file</span> */}
      </div>
      <input
        type="file"
        onChange={async(e) => {
          await handleChange(e);
        }}
        className="hidden rounded-sm file-input file-input-bordered w-full bg-[#1D1C26] my-1 h-full"
        
      />
    </label>
  );
}


function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }
}
