import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/main/Button";
import {
  AddPhotoIcon,
  CheckOrderStatusIcon,
  RemoveIcon,
} from "../icons/mainIcon";
import { useNavigate } from "react-router-dom";
import useMainStore from "../stores/main-store";
import Footer from "./Footer";
import useModalStore from "../stores/modal-store";
import Input from "../components/main/Input";
import { uploadResult } from "../apis/upload-api";

function UploadPic() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [input, setInput] = useState({
    name: "",
    email: "",
  });
  const setIsLoadingModalOpen = useModalStore(
    (state) => state.setIsLoadingModalOpen
  );
  const setIsErrorModalOpen = useModalStore(
    (state) => state.setIsErrorModalOpen
  );

  const setErrTxt = useModalStore((state) => state.setErrTxt);

  const hdlError = (err) => {
    setErrTxt(err);
    setIsErrorModalOpen(true);
  };

  const hdlChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const hdlRemovePhoto = () => {
    setFiles([]);
  };

  const hdlInputPhoto = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...imageFiles]);
  };

  const hdlClickUpload = async () => {
    setIsLoadingModalOpen(true);
    try {
      const body = new FormData();
      body.append("name", input.name);
      body.append("email", input.email);
      files.forEach((file) => {
        body.append("images", file);
      });
      const res = await uploadResult(body);
      console.log(res);

      navigate("/upload-success");
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      hdlError(t(err?.response?.data?.msg || err.message));
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  useEffect(() => {
    setInput({ name: "", email: "" });
    setFiles([]);
  }, []);

  return (
    <>
      {/* container */}
      <div className="w-full sm:max-w-[700px]  min-h-svh mx-auto bg-m-light flex flex-col items-center py-4 px-4 sm:px-8 gap-2">
        {/* welcome badge */}
        <div className="w-full h-auto bg-m-prim rounded-m flex flex-col animate-fade-in-div p-2">
          <div className="w-full flex items-baseline gap-2">
            <img
              src="/logo-icmm.png"
              alt="logo"
              className="w-[50px] h-[50px]"
            />
            <p className="font-bold text-m-light text-2xl -translate-y-1">
              ICMM Shop
            </p>
          </div>
          <div className="w-full flex justify-center">
            <p className="font-bold text-m-light text-lg">{t("welcomeTxt")}</p>
          </div>
        </div>
        {/* Upload Pic */}
        <p className="font-bold text-lg mt-4 animate-fade-in-div ">
          Upload your running result
        </p>
        <div className="w-flull flex flex-col items-center animate-fade-in-div">
          {files.length > 0 ? (
            <div className="w-full flex flex-col items-center gap-2 animate-fade-in-div">
              {/* list of files */}
              {files.map((el, idx) => (
                <div
                  key={idx}
                  className="w-[300px] h-[300px] 
          animate-fade-in-div "
                >
                  <img
                    src={URL.createObjectURL(el)}
                    alt={`preview-${idx}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}

              <Button
                lbl="Remove Photo"
                Icon={RemoveIcon}
                isAcct={true}
                onClick={hdlRemovePhoto}
              />
            </div>
          ) : (
            <div className="w-[300px] h-[300px] border flex justify-center items-center animate-fade-in-div">
              <div
                className="flex flex-col items-center btn-hover animate-fade-in-div "
                onClick={() => document.getElementById("input-file").click()}
              >
                <AddPhotoIcon className="w-[50px] text-m-dark" />
                <p>Click to upload</p>

                <input
                  type="file"
                  id="input-file"
                  className="hidden"
                  accept="image/*"
                  onChange={hdlInputPhoto}
                />
              </div>
            </div>
          )}
        </div>
        {/* user name */}
        <Input
          type="text"
          size="3"
          placeholder="User name"
          value={input.name}
          name="name"
          onChange={hdlChangeInput}
          className="animate-fade-in-div "
        />
        {/* email */}
        <Input
          type="text"
          size="3"
          placeholder="Email"
          value={input.email}
          name="email"
          onChange={hdlChangeInput}
          className="animate-fade-in-div "
        />
        {/* send pic */}
        <Button
          lbl="Upload"
          size="4"
          onClick={hdlClickUpload}
          className="animate-fade-in-div "
        />
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}

export default UploadPic;
