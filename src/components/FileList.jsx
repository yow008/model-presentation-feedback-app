import React from 'react'
import FileItem from './FileItem'

const FileList = ({ files, removeFile, setIsResActive, setIsSiteActive, setNonstandard_res, setId }) => {

    return (
        <ul className="file-list" style={{width:'380px',margin:'auto',textAlign:'center'}}>
            {
                files &&
                files.map(f => (<FileItem
                    key={f.name}
                    file={f}
                    deleteFile={removeFile} />))
            }
        </ul>
    )
}

export default FileList