import { useState } from "react"
import axios from 'axios'

export default function OctopusEdit({ name, scientific_name, description, life_span, setIsEditMode, setIsComplete, id }) {

  const [formData, setFormData] = useState({
    name: name,
    scientific_name: scientific_name,
    description: description,
    life_span: parseInt(life_span)
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/octopus/${id}/`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setIsComplete(true)
      setIsEditMode(false)
    } catch (err) {
      console.log(err)
    }
  }

  function handleCancelClick(e) {
    e.preventDefault()
    setIsModalOpen(true)
  }

  function confirmCancel() {
    setIsEditMode(false)
    setIsModalOpen(false)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <div className="bordered">
      <h1 className="text-white text-lg font-bold">Edit Octopus Details</h1>
      <form className="form-control mt-5" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <label className="input input-bordered flex items-center gap-2 text-sm text-base-content" htmlFor="name">
            <span className="font-bold">Name:</span>
            <input type="text" id="name" className="grow" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label className="input input-bordered flex items-center gap-2 text-sm" htmlFor="scientific_name">
            <span className="font-bold">Scientific Name:</span>
            <input type="text" id="scientific_name" className="grow" name="scientific_name" value={formData.scientific_name} onChange={handleChange} />
          </label>
        </div>
        <textarea className="mt-2 textarea textarea-info placeholder-base-content" placeholder="Bio" name="description" value={formData.description} onChange={handleChange}></textarea>
        <select className="mt-2 select select-bordered w-full" name="life_span" value={formData.life_span} onChange={handleChange}>
          <option disabled className="font-bold">Maximum Lifespan</option>
          <option value="1">One Year</option>
          <option value="2">Two Years</option>
          <option value="3">Three Years</option>
          <option value="4">Four Years</option>
          <option value="5">Five Years</option>
        </select>
        <div>
          <button type="submit" className="m-2 btn btn-secondary">Save Changes</button>
          <button onClick={handleCancelClick} className="m-2 btn btn-accent">Cancel Changes</button>
        </div>
      </form>
      {isModalOpen && (
        <div className="modal modal-open modal-bottom sm:modal-middle">
          <div className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
            <h3 className="font-bold text-lg">Are you sure you want to Cancel your changes?</h3>
            <div className="modal-action">
              <button className="btn btn-accent" onClick={confirmCancel}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
