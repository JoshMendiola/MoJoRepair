import React, { useState, useEffect } from 'react';
import '../../css/FUDemo.css';

interface UploadedFile {
  filename: string;
  upload_date: string;
}

const VulnerableFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState('');
  const [fileOutput, setFileOutput] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/gif'];

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch('http://147.182.176.235/api/file-demo/files', {
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
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
        setError('Invalid file type. Only PNG, JPEG, and GIF files are allowed.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 650);
        setFile(null);
        event.target.value = ''; // Reset file input
        return;
      }
      setError(''); // Clear any previous errors
      setFile(selectedFile);
      setUploadStatus(''); // Clear any previous upload status
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 650);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://147.182.176.235/api/file-demo/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (response.status === 403) {
        setError('Request Blocked by Snoopy');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 650);
        return;
      }

      if (response.ok) {
        setFile(null);
        setError('');
        setUploadStatus('File uploaded successfully!');
        fetchUploadedFiles();
        // Reset the file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to upload file');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 650);
      }
    } catch (err) {
      setError('An error occurred');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 650);
      console.error('Upload error:', err);
    }
  };

  const handleViewFile = async (filename: string) => {
    try {
      const response = await fetch(`http://147.182.176.235/api/file-demo/view/${filename}`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setFileOutput(data.output || data.content || 'No output');

        // Immediately remove the file from the displayed list
        setUploadedFiles(prev => prev.filter(file => file.filename !== filename));

        // Refresh the file list from the server
        await fetchUploadedFiles();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to view file');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 650);
      }
    } catch (err) {
      setError('An error occurred while viewing the file');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 650);
      console.error('View error:', err);
    }
  };

  return (
    <div className={`upload-container ${isShaking ? 'shake' : ''}`}>
      <h2>File Upload</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="file">Select File:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/gif"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Accepted file types: PNG, JPEG, GIF
          </p>
        </div>
        {error && <div className="error">{error}</div>}
        {uploadStatus && <div className="success">{uploadStatus}</div>}
        <button type="submit">Upload File</button>
      </form>

      <div className="files-section">
        <h3>Uploaded Files:</h3>
        {uploadedFiles.map((file, index) => (
          <div key={index} className="file-card">
            <div className="file-info">
              <span>{file.filename}</span>
              <button
                onClick={() => handleViewFile(file.filename)}
                className="view-button"
              >
                View/Execute
              </button>
            </div>
            <div className="file-meta">
              Uploaded: {new Date(file.upload_date).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {fileOutput && (
        <div className="output-section">
          <h3>File Output:</h3>
          <pre className="output-content">
            {fileOutput}
          </pre>
        </div>
      )}
    </div>
  );
};

export default VulnerableFileUpload;
