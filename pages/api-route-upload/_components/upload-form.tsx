import { useState, ChangeEvent, FormEvent } from 'react';

// This example uses an API route to upload assets to Cloudinary
export default function UploadForm() {
  const [image, setImage] = useState<File | null>(null);
  const [uploadButtonEnabled, setUploadButtonEnabled] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleFile = () => {
    setUploadButtonEnabled(true); // Enable upload button once file is loaded
  };

  const handleChangeFile = (file: File) => {
    const fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsDataURL(file); // Use `readAsDataURL` for image preview
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      handleChangeFile(file); // Trigger file reading and preview setup
    }
  };

  // function to call on form submission
  async function uploadToServer(event: FormEvent) {
    event.preventDefault();
    if (!image) return;

    setIsImageLoading(true);

    try {
      // Read the file data as an array buffer
      const arrayBuffer = await image.arrayBuffer();

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': image.type, // Set the file's MIME type as the content type
        },
        body: arrayBuffer, // Send the file's binary data directly
      });

      await response.json();
      setIsImageLoading(false);
    } catch (error) {
      console.error(error);
      setIsImageLoading(false);
    }
  }

  return (
    <>
      <form
        method="post"
        onSubmit={uploadToServer}
        className="flex flex-col bg-white rounded-lg shadow p-6 mb-6"
      >
        <label className="form-control w-full max-w-xs" htmlFor="image">
          <div className="label">
            <span className="label-text">Pick a file</span>
          </div>
          <input
            id="image"
            className="file-input file-input-bordered w-full max-w-xs"
            type="file"
            name="file"
            onChange={handleFileChange}
            required
          />
        </label>

        <button
          className="btn btn-neutral mt-4 w-full max-w-xs"
          disabled={!uploadButtonEnabled || isImageLoading}
        >
          {isImageLoading ? 'Uploading...' : 'Upload File'}
        </button>
      </form>
    </>
  );
}
