import CldImage from '@/components/cld-image';

const AlbumItem = ({
  src,
  placeholder,
}: {
  src: string;
  placeholder: string;
}) => {
  return (
    <CldImage
      className="rounded"
      src={src}
      width="300"
      height="300"
      crop={{
        type: 'auto',
        source: true,
      }}
      alt="Photo Album Item"
      placeholder="blur"
      blurDataURL={placeholder}
    />
  );
};

export default AlbumItem;
