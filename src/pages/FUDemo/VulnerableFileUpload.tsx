import React, { useState, useEffect } from 'react';
import '../../css/FUDemo.css';

interface UploadedFile {
  filename: string;
  filepath: string;
  upload_date: string;
}

const VulnerableFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState('');

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch('http://147.182.176.235:7000/api/file-demo/files', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUploadedFiles(data);
      }
    } catch (err) {
      console.error('Failed to fetch files:', err);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://147.182.176.235:7000/api/file-demo/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (response.ok) {
        setFile(null);
        setUploadStatus('File uploaded successfully!');
        fetchUploadedFiles();
        // Reset the file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to upload file');
      }
    } catch (err) {
      setError('An error occurred during upload');
      console.error('Upload error:', err);
    }
  };

  return (
    <div className="upload-container">
      <h2>File Upload</h2>
      <form onSubmit={handleUpload}>
        <div className="form-group">
          <label htmlFor="file">Select File:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
          />
        </div>
        {error && <div className="error">{error}</div>}
        {uploadStatus && <div className="success">{uploadStatus}</div>}
        <button type="submit">Upload File</button>
      </form>

      <div className="files-section">
        <h3>Uploaded Files:</h3>
        {uploadedFiles.map((file, index) => (
          <div key={index} className="file-card">
            <div className="file-name">{file.filename}</div>
            <div className="file-meta">
              Uploaded: {new Date(file.upload_date).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VulnerableFileUpload;
