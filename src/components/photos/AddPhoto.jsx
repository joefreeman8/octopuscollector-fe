import { useState } from 'react'
import axios from "axios"
import { v4 as uuidv4 } from 'uuid'
import { useParams } from "react-router-dom"


export default function AddPhoto({ setIsComplete, user }) {
  const [imageTitle, setImageTitle] = useState('')
  const [image, setImage] = useState(null)
  const { id } = useParams()

  const handleChange = (e) => {
    setImageTitle(e.target.value)
  }

  const handleImageChange = (e) => {
    const myFile = e.target.files[0]
    const blob = myFile.slice(0, myFile.size)
    const fileExt = myFile.name.split('.').pop()
    const newFile = new File([blob], `${uuidv4()}.${fileExt}`, { type: `${myFile.type}` })
    setImage(newFile)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      title: imageTitle,
      document: image,
      octopus: id,
      owner: user.user_id
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


  return (
    <div className="card bg-base-100 card-body mt-5 shadow-lg">
      <h2 className="md:mt-4 text-white text-lg font-bold">Add Photo</h2>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center space-y-4 w-full mt-5">
        <label className="input input-bordered flex items-center w-5/6 text-sm bg-base-100" htmlFor="title">
          <span className="font-bold">Image Title:</span>
          <input
            type="text"
            id="title"
            value={imageTitle}
            onChange={handleChange}
            required
            className="p-2 bg-base-100 "
          />
        </label>
        <input
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          required
          className="file-input file-input-bordered w-5/6"
        />
        <button type="submit" className="btn btn-secondary w-5/6">Add Photo</button>
      </form>
    </div>
  )
}
