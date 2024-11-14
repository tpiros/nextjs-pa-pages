export default function Home() {
  return (
    <>
      <h1 className="text-5xl font-bold m-2">Welcome</h1>
      <p className="m-2">
        This sample project shows how to use the{' '}
        <a
          className="underline text-blue-500 hover:bg-blue-200 rounded-full transition duration-300"
          href="https://next.cloudinary.dev"
        >
          Cloudinary Next.js SDK
        </a>
        via the{' '}
        <code className="bg-gray-700 text-sm rounded text-white p-1">
          pages
        </code>{' '}
        router.
      </p>
      <div className="p-2">
        The following pieces of functionality are exposed in this app:
        <ul className="list-disc list-inside">
          <li>
            <a
              className="underline text-blue-500 hover:bg-blue-200 rounded-full transition duration-300"
              href="/upload"
            >
              Upload (Upload Widget)
            </a>
            : shows an example implementation of the{' '}
            <a
              className="underline text-blue-500 hover:bg-blue-200 rounded-full transition duration-300"
              href="https://cloudinary.com/documentation/upload_widget"
            >
              Upload Widget
            </a>
            .
          </li>
          <li>
            <a
              className="underline text-blue-500 hover:bg-blue-200 rounded-full transition duration-300"
              href="/server-action-upload"
            >
              Server Action Upload
            </a>
            : shows an example of how to use the{' '}
            <a
              className="underline text-blue-500 hover:bg-blue-200 rounded-full transition duration-300"
              href="https://cloudinary.com/documentation/image_upload_api_reference"
            >
              Upload API
            </a>{' '}
            via server actions in Next.js.
          </li>
          <li>
            <a
              className="underline text-blue-500 hover:bg-blue-200 rounded-full transition duration-300"
              href="./album"
            >
              Photo Album
            </a>
            : shows how to display images from a Cloudinary product environment.
          </li>
        </ul>
      </div>
    </>
  );
}
