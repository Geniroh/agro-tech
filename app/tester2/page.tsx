// "use client";
// import React, { useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { Image, Upload } from "antd";
// import type { GetProp, UploadFile, UploadProps } from "antd";

// type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

// const App: React.FC = () => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [fileList, setFileList] = useState<UploadFile[]>([
//     {
//       uid: "-1",
//       name: "image.png",
//       status: "done",
//       url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//     },
//     {
//       uid: "-xxx",
//       percent: 50,
//       name: "image.png",
//       status: "uploading",
//       url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//     },
//     {
//       uid: "-5",
//       name: "image.png",
//       status: "error",
//     },
//   ]);

//   const handlePreview = async (file: UploadFile) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj as FileType);
//     }

//     setPreviewImage(file.url || (file.preview as string));
//     setPreviewOpen(true);
//   };

//   const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
//     setFileList(newFileList);

//   const uploadButton = (
//     <button style={{ border: 0, background: "none" }} type="button">
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </button>
//   );
//   return (
//     <>
//       <div className="text-4xl">Hello world</div>
//       <Upload
//         action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//         listType="picture-circle"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//       >
//         {fileList.length >= 8 ? null : uploadButton}
//       </Upload>
//       {previewImage && (
//         <Image
//           wrapperStyle={{ display: "none" }}
//           alt=""
//           preview={{
//             visible: previewOpen,
//             onVisibleChange: (visible) => setPreviewOpen(visible),
//             afterOpenChange: (visible) => !visible && setPreviewImage(""),
//           }}
//           src={previewImage}
//         />
//       )}
//     </>
//   );
// };

// export default App;

"use client";
import React, { useState } from "react";
import { TreeSelect } from "antd";
import type { TreeSelectProps } from "antd";

const treeData = [
  {
    value: "parent 1",
    title: "parent 1",
    children: [
      {
        value: "parent 1-0",
        title: "parent 1-0",
        children: [
          {
            value: "leaf1",
            title: "leaf1",
          },
          {
            value: "leaf2",
            title: "leaf2",
          },
          {
            value: "leaf3",
            title: "leaf3",
          },
          {
            value: "leaf4",
            title: "leaf4",
          },
          {
            value: "leaf5",
            title: "leaf5",
          },
          {
            value: "leaf6",
            title: "leaf6",
          },
        ],
      },
      {
        value: "parent 1-1",
        title: "parent 1-1",
        children: [
          {
            value: "leaf11",
            title: <b style={{ color: "#08c" }}>leaf11</b>,
          },
        ],
      },
    ],
  },
];
const App: React.FC = () => {
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const onPopupScroll: TreeSelectProps["onPopupScroll"] = (e) => {
    console.log("onPopupScroll", e);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: "100%" }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder="2 replies"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
      treeData={treeData}
      onPopupScroll={onPopupScroll}
    />
  );
};

export default App;

// "use client";
// import React, { useState } from "react";
// import { UploadOutlined } from "@ant-design/icons";
// import type { UploadProps } from "antd";
// import { Button, message, Upload } from "antd";
// import ImgCrop from "antd-img-crop";
// import axios from "axios";

// const App: React.FC = () => {
//   const updateProfilePic = async (url: string) => {
//     try {
//       const { data } = await axios.put("/api/v1/user/pic", { url });
//       message.success("Profile updated successfully");
//     } catch (error) {
//       message.error("Profile update failed");
//     }
//   };

//   const props: UploadProps = {
//     name: "file",
//     action: "/api/v1/upload",
//     showUploadList: { showRemoveIcon: false },
//     onChange(info) {
//       if (info.file.status === "uploading") {
//         console.log("Uploading...");
//       }
//       if (info.file.status === "done") {
//         console.log(info.file.response.files[0].url);
//         if (info.file.response && info.file.response) {
//           const imageUrl = info.file.response.files[0].url;
//           updateProfilePic(imageUrl);
//         } else {
//           message.error("Failed to upload file");
//         }
//       } else if (info.file.status === "error") {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//   };

//   return (
//     <ImgCrop rotationSlider>
//       <Upload {...props} maxCount={1}>
//         <Button icon={<UploadOutlined />}>Click to Upload</Button>
//       </Upload>
//     </ImgCrop>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import { Upload } from "antd";
// import type { GetProp, UploadFile, UploadProps } from "antd";
// import ImgCrop from "antd-img-crop";

// type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// const App: React.FC = () => {
//   const [fileList, setFileList] = useState<UploadFile[]>([
//     {
//       uid: "-1",
//       name: "image.png",
//       status: "done",
//       url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//     },
//   ]);

//   const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

//   const onPreview = async (file: UploadFile) => {
//     let src = file.url as string;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj as FileType);
//         reader.onload = () => resolve(reader.result as string);
//       });
//     }
//     const image = new Image();
//     image.src = src;
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(image.outerHTML);
//   };

//   return (
//     <ImgCrop rotationSlider>
//       <Upload
//         action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//         listType="picture-card"
//         fileList={fileList}
//         onChange={onChange}
//         onPreview={onPreview}
//       >
//         {fileList.length < 5 && "+ Upload"}
//       </Upload>
//     </ImgCrop>
//   );
// };

// export default App;
