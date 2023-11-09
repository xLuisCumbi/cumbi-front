// FileDropzone.jsx
import React, { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const FileDropzone = ({ onDrop }) => {
    const [uploadedFile, setUploadedFile] = useState(null);

    // Definimos la función que maneja los archivos aceptados
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

    // Estilos base para la zona de dropzone
    const baseStyle = useMemo(() => ({
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
    }), []);

    // Estilos cuando arrastramos archivos sobre la zona
    const activeStyle = {
        borderColor: '#2196f3'
    };

    // Estilos cuando un archivo ha sido cargado
    const acceptedFileStyle = {
        borderColor: '#00e676',
        backgroundColor: '#e8f5e9',
        color: '#2e7d32',
    };

    // Combinamos estilos de manera condicional
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(uploadedFile ? acceptedFileStyle : {})
    }), [isDragActive, uploadedFile, baseStyle]);

    return (
        <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Arrastra y suelta tu archivo aquí, o haz clic para seleccionar un archivo (solo PDF).</p> :
                    <p>{uploadedFile ? `Documento: ${uploadedFile.name}` : 'Arrastra y suelta tu archivo aquí, o haz clic para seleccionar un archivo (solo PDF).'}</p>
            }
        </div>
    );
};

export default FileDropzone;
