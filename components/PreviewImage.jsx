import Image from "next/image";
import React from "react";

const PreviewImage = ({ image }) => {
  return (
    <div className='mr-5'>
      <Image
        src={image ? image : '/images/avatar.jpg'}
        alt=''
        width={132}
        height={132}
        className='rounded-full overflow-hidden object-cover'
      />
    </div>
  );
};

export default PreviewImage;
