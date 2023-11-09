// FileDropzone.jsx
import React, { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const FileDropzone = ({ onDrop }) => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const onDropAccepted = (acceptedFiles) => {
        // Llamamos a la función onDrop proporcionada por el padre para manejar el archivo
        onDrop(acceptedFiles);
        // Guardamos el primer archivo aceptado en el estado para mostrarlo
        setUploadedFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDropAccepted,
        accept: 'application/pdf',
        maxSize: 5 * 1024 * 1024, // 5 MB en bytes
    });

    const activeStyle = {
        borderColor: '#2196f3'
    };

    const defaultStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: '2px',
        borderRadius: '2px',
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out',
    };

    // Aplicamos estilo diferente cuando hay un archivo encima de la zona
    const style = useMemo(() => ({
        ...defaultStyle,
        ...(isDragActive ? activeStyle : {}),
    }), [isDragActive]);

    return (
        <div {...getRootProps()} style={style}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Arrastra y suelta tu archivo aquí, o haz clic para seleccionar un archivo (solo PDF).</p> :
                    <p>{uploadedFile ? `File: ${uploadedFile.name}` : 'Arrastra y suelta tu archivo aquí, o haz clic para seleccionar un archivo (solo PDF).'}</p>
            }
        </div>
    );
};

export default FileDropzone;
