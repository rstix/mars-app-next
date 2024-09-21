import Link from 'next/link';

const InfoBox = ({
  heading,
  bgColor = 'bg-gray-100',
  textColor = 'text-gray-800',
  btnInfo,
  children,
}) => {
  return (
    <div className={`${bgColor} bg-gray-100 p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className="mt-2 mb-4">{children}</p>
      <Link
        href={btnInfo.link}
        className={`${btnInfo.bgColor} inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {btnInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
