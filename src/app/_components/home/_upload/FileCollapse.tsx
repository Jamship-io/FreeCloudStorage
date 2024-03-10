type FileCollapse = {
    filename: string,
    size: number,
    key: number
}


export function FileCollapse({ filename, size}: FileCollapse) {
    return (
      <div className='flex items-center justify-center w-full overflow-x-hidden p-0 m-0 bg-white'>
        <div tabIndex={1} className="collapse bg-base-200 p-0 rounded-none border border-purple-500 m-0">
          <div className="collapse-title text-md  p-0 rounded-none m-0 flex items-center justify-between">
            <h1 className='mx-2 truncate'>{filename}</h1>
            <span className="mx-2 text-gray-500">{(size/(1024*1024)).toFixed(2)} MB</span>
          </div>
          <div className="collapse-content overflow-x-hidden">
            <p>tabIndex={0} attribute is necessary to make the div focusable</p>
          </div>
        </div>
      </div>
    );
  }