import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useParams } from "react-router-dom";

const AddPhoto = ({ octopusData, setIsComplete }) => {
  const [imageTitle, setImageTitle] = useState('')
  const [image, setImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
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

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/octopus/${id}/photo/`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        }
      })
      setImageTitle('')
      setIsComplete(true)
    } catch (err) {
      console.log(err)
    }
  }

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : octopusData.photos.length - 1))
  }

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % octopusData.photos.length)
  }

  return (
    <>
      <div className="mt-5 sm:grid sm:grid-cols-2 sm:gap-3">
        {/* Carousel for small screens */}
        <div className="flex sm:hidden ">
          {octopusData.photos && octopusData.photos.length > 0 && (
            <div className="carousel-item relative w-full card card-compact bg-base-300 shadow-xl text-center">
              <figure>
                <img src={octopusData.photos[currentImageIndex].document} alt={octopusData.photos[currentImageIndex].title} />
              </figure>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={goToPreviousImage} className="btn btn-circle btn-xs">❮</button>
                <button onClick={goToNextImage} className="btn btn-circle btn-xs">❯</button>
              </div>
              <div className="card-body flex justify-center items-center">
                <p className="card-title">{octopusData.photos[currentImageIndex].title}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* GRID FOR LARGER SCREEN */}
      <div className="hidden sm:grid">
        {octopusData.photos && (
          <div className="mt-5 sm:grid sm:grid-cols-2 sm:gap-3">
            {octopusData.photos.map((photo, idx) => (
              <div key={idx} className="card card-compact bg-base-300 shadow-xl w-full">
                <figure className=""><img src={photo.document} alt={photo.title} /></figure>
                <div className="card-body text-center flex items-center">
                  <p className="card-title justify-center text-sm">{photo.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="card card-body space-y-4">
        <h2 className="md:mt-4 text-white text-lg font-bold">Add Photo</h2>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center space-y-4 w-full mt-5">
          <label className="input input-bordered flex items-center gap-2 w-5/6 text-sm" htmlFor="scientific_name">
            <span className="font-bold">Image Title:</span>
            <input
              type="text"
              id="title"
              value={imageTitle}
              onChange={handleChange}
              required
              className="p-2"
            />
          </label>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            required
            className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
          />
          <button type="submit" className="btn btn-secondary w-5/6">Add Photo</button>
        </form>
      </div>
    </>
  )
}

export default AddPhoto