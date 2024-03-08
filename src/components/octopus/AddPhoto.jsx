import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useParams } from "react-router-dom";

const AddPhoto = () => {
  const [imageTitle, setImageTitle] = useState('')
  const [image, setImage] = useState(null)
  const { id } = useParams()

  const handleChange = (e) => {
    setImageTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    const myFile = e.target.files[0]
    const blob = myFile.slice(0, myFile.size);
    const fileExt = myFile.name.split('.').pop();
    const newFile = new File([blob], `${uuidv4()}.${fileExt}`, { type: `${myFile.type}` });
    setImage(newFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(image)
    const body = {
      title: imageTitle,
      document: image,
      octopus: id
    }

    console.log('HELLO', body)
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/octopus/${id}/photo/`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="card card-body md:w-1/2 space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-xs">
        <input
          type="text"
          placeholder="Image Title"
          id="title"
          value={imageTitle}
          onChange={handleChange}
          required
          className="py-2"
        />
        <input
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          required
          className="w-full file:ml-6 file:mr-8 file:py-2 file:rounded-full file:border-solid file:px-5 file:font-semibold file:bg-orange-200 file:text-black hover:file:bg-orange-300"
        />
        <button type="submit" className="btn btn-secondary">Add Photo</button>
      </form>
    </div>
  );
};

export default AddPhoto