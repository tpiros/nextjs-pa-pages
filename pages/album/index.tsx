import cloudinary from '@/utils/cloudinary';
import AlbumItem from './_components/album-item';
import { getCldImageUrl } from 'next-cloudinary';

type Photo = {
  public_id: string;
  placeholder: string;
};

export const getServerSideProps = async () => {
  const tag = process.env.CLOUDINARY_TAG;
  if (!tag) {
    throw new Error('Please add CLOUDINARY_TAG as an environment variable.');
  }

  const response = await cloudinary.api.resources_by_tag(tag);

  // Generate photos array with base64 placeholders
  const photos: Photo[] = await Promise.all(
    response.resources.map(async (resource) => {
      const imageUrl = getCldImageUrl({
        src: resource.public_id,
        width: 100,
      });
      const imgResponse = await fetch(imageUrl);
      const arrayBuffer = await imgResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      const placeholder = `data:${imgResponse.headers.get(
        'content-type'
      )};base64,${base64}`;

      return {
        public_id: resource.public_id,
        placeholder,
      };
    })
  );

  return { props: { photos } };
};

const Album = ({ photos }: { photos: Photo[] }) => {
  return (
    <div className="m-2 space-y-4">
      <h1 className="text-5xl font-bold">Photo Album</h1>
      <p className="m-2">
        This page shows how to display images uploaded to your Cloudinary
        account.
      </p>
      <div className="m-2">
        Please note that the following defaults are being used:
        <ul className="list-disc list-inside">
          <li>
            Images are using the{' '}
            <code className="bg-black text-gray-100 px-2 py-1 rounded-md text-sm">
              placeholder=&quot;blur&quot;
            </code>{' '}
            options from{' '}
            <a href="https://next.cloudinary.dev/guides/placeholders">
              Next Cloudinary
            </a>
            .
          </li>
          <li>
            Images tagged as{' '}
            <code className="bg-black text-gray-100 px-2 py-1 rounded-md text-sm">
              myphotoalbum-nextjs
            </code>{' '}
            are displayed.
          </li>
          <li>
            Images are transformed using the following transformations:{' '}
            <code className="bg-black text-gray-100 px-2 py-1 rounded-md text-sm whitespace-normal overflow-auto break-words">
              width={400}
            </code>
            ,{' '}
            <code className="bg-black text-gray-100 px-2 py-1 rounded-md text-sm whitespace-normal overflow-auto break-words">
              height={400}
            </code>{' '}
            and{' '}
            <code className="bg-black text-gray-100 px-2 py-1 rounded-md text-sm whitespace-normal overflow-auto break-words">
              {`crop={{
                type: 'auto',
                source: true
              }}`}
            </code>
            .
          </li>
          <li>
            Please note that Next Cloudinary automatically applies both{' '}
            <code className="bg-black text-gray-100 px-2 py-1 rounded-md text-sm">
              f_auto
            </code>{' '}
            and{' '}
            <code className="bg-black text-gray-100 px-2 py-1 rounded-md text-sm">
              q_auto
            </code>{' '}
            to the images.
          </li>
        </ul>
      </div>
      {photos ? (
        <div className="flex flex-wrap -mx-4">
          {photos.map((photo, idx) => (
            <div className="lg:w-1/3 md:w-1/2 w-full p-4" key={idx}>
              <AlbumItem
                src={photo.public_id}
                placeholder={photo.placeholder}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl p-4">
          No photos to list. Please make sure that you have uploaded some images
          using this app.
        </p>
      )}
    </div>
  );
};

export default Album;
