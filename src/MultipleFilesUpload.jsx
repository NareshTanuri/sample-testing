// import React, { useState } from 'react';

// const Types = [
//     { type: "audio", extension: ["mp3", "flac", "wav", "ogg", "m3u", "acc", "wma", "midi", "aif", "m4a", "mpa", "pls", "aiff", "mid", "midi", "au", "snd", "mpga", "mp2", "bwf", "aax", "aa", "aac", "caf", "m4r", "ac3", "eac3", "ec3", "mpeg"] },
//     { type: "video", extension: ["mp4", "mkv", "m4v", "mov", "mpg", "avi", "vfw", "mpg4", "mpe", "m75", "m15", "dif", "ts", "qt", "wmv"] },
//     { type: "image", extension: ["jpg", "jpeg", "apng", "avif", "gif", "jfif", "pjpeg", "pjp", "png", "svg", "webp", "bmp", "ico", "cur", "tif", "tiff", "psd"] },
//     { type: "document", extension: ["pdf", "doc", "docx", "xls", "html", "htm", "txt", "rtf", "msg", "zip", "xlsx", "xlsm", "java", "c", "class", "cpp", "py", "php", "cs", "css", "pp", "csv", "rar", "jsx"] }
// ];

// function UploadMultipleImage() {
//     const [arrayOfObjects, setArrayOfObjects] = useState([]);
    

//     const onFileChange = async (event) => {
//         event.preventDefault();
//         const files = Array.from(event.target.files);
//         try {
//             const filesData = await Promise.all(files.map(file => new Promise((resolve, reject) => {
//                 const reader = new FileReader();
//                 reader.onload = () => resolve({ base64Data: reader.result, file });
//                 reader.onerror = reject;
//                 reader.readAsDataURL(file);
//             })));
//             setArrayOfObjects(filesData);
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };

//     const imageStyles = {
//         width: '50px',
//         height: '50px',
//         objectFit: 'cover',
//         marginRight: '10px'
//     };

//     return (
//         <>
//             <input type="file" multiple onChange={onFileChange} />
//             <div>
//                 {arrayOfObjects.map((item, index) => {
//                     const base64Data = item.base64Data;
//                     const file = item.file;
//                     const fileExtension = file.name.split('.').pop().toLowerCase();
//                     const fileType = Types.find(type => type.extension.includes(fileExtension));

//                     return (
//                         <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
//                             {fileType ? (
//                                 fileType.type === "image" ? (
//                                     <img
//                                         src={base64Data}
//                                         alt="Preview"
//                                         style={imageStyles}
//                                     />
//                                 ) : fileType.type === "video" ? (
//                                     <video
//                                         src={base64Data}
//                                         controls
//                                         alt="Preview"
//                                         style={imageStyles}
//                                     />
//                                 ) : fileType.type === "audio" ? (
//                                     <audio
//                                         src={base64Data}
//                                         controls
//                                         alt="Preview"
//                                         style={imageStyles}
//                                     />
//                                 ) : fileType.type === "document" ? (
//                                     <div>
//                                         <img
//                                             src={"document_placeholder.png"} // Replace with your document placeholder image URL
//                                             alt="Preview"
//                                             style={imageStyles}
//                                         />
//                                     </div>
//                                 ) : null
//                             ) : (
//                                 <div className="text-success">Unsupported file type</div>
//                             )}
//                             <span>{file.name}</span>
//                         </div>
//                     );
//                 })} 
//             </div>
//         </>
//     );
// }

// export default UploadMultipleImage;




import React, { useState } from 'react';
import axios from 'axios';

const Types = [
    { type: "audio", extension: ["mp3", "flac", "wav", "ogg", "m3u", "acc", "wma", "midi", "aif", "m4a", "mpa", "pls", "aiff", "mid", "midi", "au", "snd", "mpga", "mp2", "bwf", "aax", "aa", "aac", "caf", "m4r", "ac3", "eac3", "ec3", "mpeg"] },
    { type: "video", extension: ["mp4", "mkv", "m4v", "mov", "mpg", "avi", "vfw", "mpg4", "mpe", "m75", "m15", "dif", "ts", "qt", "wmv"] },
    { type: "image", extension: ["jpg", "jpeg", "apng", "avif", "gif", "jfif", "pjpeg", "pjp", "png", "svg", "webp", "bmp", "ico", "cur", "tif", "tiff", "psd"] },
    { type: "document", extension: ["pdf", "doc", "docx", "xls", "html", "htm", "txt", "rtf", "msg", "zip", "xlsx", "xlsm", "java", "c", "class", "cpp", "py", "php", "cs", "css", "pp", "csv", "rar", "jsx"] }
];

function UploadMultipleImage() {
    const [arrayOfObjects, setArrayOfObjects] = useState([]);
    console.log("arrayOfObjects", arrayOfObjects);

    const onFileChange = async (event) => {
        event.preventDefault();
        const files = Array.from(event.target.files);
        try {
            const filesData = await Promise.all(files.map(file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve({ base64Data: reader.result, file });
                reader.onerror = reject;
                reader.readAsDataURL(file);
            })));
            const base64Strings = filesData.map(data => data.base64Data);
            const response = await axios.post("https://fapi.rizee.in/file_upload", {
                "file": base64Strings
            });
            console.log("response", response.data?.files);
            const fileURLs = response.data.files;  // Adjust based on actual response structure
            const updatedFilesData = filesData.map((fileData, index) => ({
                ...fileData,
                url: fileURLs[index]
            }));
            setArrayOfObjects(updatedFilesData);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const imageStyles = {
        width: '50px',
        height: '50px',
        objectFit: 'cover',
        marginRight: '10px'
    };

    return (
        <>
            <input type="file" multiple onChange={onFileChange} />
            <div>
                {arrayOfObjects.map((item, index) => {
                    const { base64Data, file, url } = item;
                    const fileExtension = file.name.split('.').pop().toLowerCase();
                    const fileType = Types.find(type => type.extension.includes(fileExtension));

                    return (
                        <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                            {fileType ? (
                                fileType.type === "image" ? (
                                    <img
                                        src={url || base64Data}
                                        alt="Preview"
                                        style={imageStyles}
                                    />
                                ) : fileType.type === "video" ? (
                                    <video
                                        src={url || base64Data}
                                        controls
                                        alt="Preview"
                                        style={imageStyles}
                                    ></video>
                                ) : fileType.type === "audio" ? (
                                    <audio
                                        src={url || base64Data}
                                        controls
                                        alt="Preview"
                                        style={imageStyles}
                                    />
                                ) : fileType.type === "document" ? (
                                    <div>
                                        <p>{file.name}</p>
                                    </div>
                                ) : null
                            ) : (
                                <div className="text-success">Unsupported file type</div>
                            )}
                            <span>{file.name}</span>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default UploadMultipleImage;
