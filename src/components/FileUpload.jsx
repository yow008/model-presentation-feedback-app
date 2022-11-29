import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '../styling/FileUpload.scss'
import axios from 'axios'

//Clarification: main.py on west server already limits file size, checks file type, and changes file name
const FileUpload = ({ files, setFiles, removeFile, setNonstandard_res, setId,setIsResActive,setIsSiteActive }) => {

    const uploadHandler = (event) => {
        //console.log("********",event.target.value );
        
        const file = event.target.files[0];
        if(!file) {
            return;
        }
        if(file.name.slice(-4) != '.pdb'){
            alert('Invalid file type!');
            return;
        }
        //console.log("hahaha",file);
        file.isUploading = true;
        setFiles([file]);
        // setFiles([...files, file]) // I guess this is more like appending file to the end of files.

        // upload file
        const formData = new FormData();
        formData.append(
            "file",
            file,
            file.name
        )
        const url = "";

        axios.post(url, formData, {
            headers: {
                "Content-type": file.type,
                "mode": 'no-cors',
            }, 
        })
            .then((responseObject) => {
                // console.log("upload_from_file");
                // console.log(responseObject);
                file.isUploading = false;
                setIsResActive(true);
                setIsSiteActive(false)
                setNonstandard_res(responseObject.data.nonstandard_res);
                setId(responseObject.data.target_id);
                // console.log(event.target.files);
                // console.log(responseObject.data.nonstandard_res);
                // console.log("success");
                
            })
            .catch((err) => {
                alert(err);
                removeFile()

            });
        
        //reset the target value, so that when reomve the current file, and upload the same file, the icon still appears
        event.target.value = '';

    }

    return (

        <div className="file-card">

            <div className="file-inputs">
                <input type="file" onInput={uploadHandler} accept=".pdb"/>
                <button>
                    <i>
                        <FontAwesomeIcon icon={faPlus} />
                    </i>
                    Upload a file (disabled)
                </button>
            </div>

            <p className="main">Supported file type</p>
            <p className="info">PDB</p>

        </div>

    )
}

export default FileUpload