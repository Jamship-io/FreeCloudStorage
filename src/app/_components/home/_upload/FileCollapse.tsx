type FileCollapse = {
  filename: string,
  size: number,
  key: number,
  date: string
}



export function FileCollapse({ filename, size, date }: FileCollapse) {
  return (
    <div className='flex items-center justify-center w-full overflow-x-hidden p-0 m-0'>
      <div tabIndex={1} className="collapse p-0 rounded-none border border-[#1E1E1E] m-0 bg-[#2C2A3C]">
        <div className="collapse-title text-md p-0 rounded-none m-0 flex items-center justify-between">

          <div className="w-72">
            <h1 className='mx-2 truncate '>{filename}</h1>
          </div>

          <div className="w-36 flex items-center justify-center">
            <h1 className="mx-2">{date}</h1>

          </div>

          <div className="w-36 flex items-center justify-center">
            <h1 className="mx-2">{(size / (1024 * 1024)).toFixed(2)} MB</h1>

          </div>

        </div>
        <div className="collapse-content overflow-x-hidden">
          {/* <p>tabIndex={0} attribute is necessary to make the div focusable</p> */}
          <button className="btn btn-primary">Download</button>
          <div className="modal-box bg-[#2C2A3C] max-w-4xl rounded-sm flex flex-col h-[50%] m-0 p-0">

            <div className="modal-action m-1 self-start">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}



{/* <div>
<button
  className="btn"
  onClick={() => {
    const modal = document.getElementById('my_modal_4') as HTMLDialogElement | null;

    // if (modal && modal.showModal) {
    //   modal.showModal();
    // }
    modal?.showModal()
  }}
>
  Upload
</button>
<dialog id="my_modal_4" className="modal">
  <div className="modal-box bg-[#2C2A3C] max-w-4xl rounded-sm flex flex-col h-[50%] m-0 p-0">

    <div className="modal-action m-1 self-start">
      <form method="dialog">
        <button className="btn" onClick={() => { handleCloseModal }}>Close</button>
      </form>
    </div>

    <div className="flex w-full h-full justify-center items-center">

      {!clicked || !file ? (
        <div className="w-full flex flex-col items-center mx-2">
          <h3 className="font-bold center">Upload files for free :D</h3>
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
</div> */}