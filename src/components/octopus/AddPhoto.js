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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image);
    const body = {
      title: imageTitle,
      document: image,
      octopus_id: id
    }

    console.log('HELLO', body)

    axios.post(`http://127.0.0.1:8000/photo/`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        // "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
    )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            placeholder="Title"
            id="title"
            value={imageTitle}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            required
          />
        </p>
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddPhoto