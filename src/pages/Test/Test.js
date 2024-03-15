import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import React, { useState ,Component ,} from 'react';

import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

 

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

const CustomImageComponent = ({ src }) => (
  <TransformWrapper>
    <TransformComponent>
      <img src={src} alt="test" />
    </TransformComponent>
  </TransformWrapper>
);

const CustomImageGallery = ({ items }) => {
  return (
    <ImageGallery
      items={items}
      renderItem={(item) => (
        <div className="image-gallery-image">
          <CustomImageComponent src={item.original} />
          <div className="image-gallery-description">{item.description}</div>
        </div>
      )}
    />
  );
}

const Test = () => {
  return (
    <CustomImageGallery items={images} />
  );
}

export default Test;





// const Test = () => {
//   return (
//     <TransformWrapper
//       initialScale={1}
//       initialPositionX={200}
//       initialPositionY={100}
//     >
//       {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
//         <React.Fragment>
//           <div className="tools">
//             {/* <button onClick={() => zoomIn()}>+</button>
//             <button onClick={() => zoomOut()}>-</button>
//             <button onClick={() => resetTransform()}>x</button> */}
//           </div>
//           <TransformComponent>
//             <img src="https://picsum.photos/id/1019/1000/600/" alt="test" />
//             <div>Example text</div>
//           </TransformComponent>
//         </React.Fragment>
//       )}
//     </TransformWrapper>
//   );
// };



// const Test  = () => {
  
//   return (
//   <ImageGallery items={images} />
//   );
// }

// export default Test;


// import React, { useState } from 'react';
// import { Upload } from 'antd';
// import ImgCrop from 'antd-img-crop';
// const Test = () => {
//   const [fileList, setFileList] = useState([
//     {
//       uid: '-1',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//   ]);
//   const onChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };
//   const onPreview = async (file) => {
//     let src = file.url;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj);
//         reader.onload = () => resolve(reader.result);
//       });
//     }
//     const image = new Image();
//     image.src = src;
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(image.outerHTML);
//   };
//   return (
//     <ImgCrop rotationSlider zoom={15}>
//       <Upload
//         action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
//         listType="picture-card"
//         fileList={fileList}
//         onChange={onChange}
//         onPreview={onPreview}
//       >
//         {fileList.length < 5 && '+ Upload'}
//       </Upload>
//     </ImgCrop>
//   );
// };
// export default Test;
