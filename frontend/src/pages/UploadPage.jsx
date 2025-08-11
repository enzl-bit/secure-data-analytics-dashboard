import React, { useState } from "react";
import DataTable from "../components/DataTable";

export default function UploadPage() {
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("access_token");

      const res = await fetch("http://localhost:8000/api/datasets/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      setPreview(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Upload CSV Dataset</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button
        disabled={loading}
        onClick={handleUpload}
        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {preview && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Preview</h2>
          <p>
            Filename: <strong>{preview.filename}</strong>
          </p>
          <p>
            Rows: <strong>{preview.row_count}</strong>, Columns:{" "}
            <strong>{preview.columns.length}</strong>
          </p>
          <DataTable data={preview.sample} />
        </div>
      )}
    </div>
  );
}
