import React, { useState } from "react"
import AddPhoto from "./AddPhoto"

const DisplayPhoto = ({ octopusData, setIsComplete }) => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
      <AddPhoto setIsComplete={setIsComplete} />

    </>
  )
}

export default DisplayPhoto