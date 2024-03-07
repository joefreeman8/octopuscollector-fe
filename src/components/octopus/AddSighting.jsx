import { useState } from "react"
import { useParams } from 'react-router-dom'
import axios from "axios"

export default function AddSighting() {

  const { id } = useParams()

  const initialState = {
    date: '',
    location: '',
    octopus: id
  }
  const [formData, setFormData] = useState(initialState)

  const SEAS_OPTIONS = [
    { value: 'ATL', label: 'Atlantic Ocean' },
    { value: 'PAC', label: 'Pacific Ocean' },
    { value: 'IND', label: 'Indian Ocean' },
    { value: 'ARC', label: 'Arctic Ocean' },
    { value: 'SOU', label: 'Southern Ocean' },
    { value: 'CAR', label: 'Carribean Sea' },
    { value: 'PHI', label: 'Philippine Sea' },
    { value: 'COR', label: 'Coral Sea' },
    { value: 'MED', label: 'Mediterranean Sea' },
    { value: 'MEX', label: 'Gulf of Mexico' },
    { value: 'THA', label: 'Gulf of Thailand' },
    { value: 'BEN', label: 'Bay of Bengal' },
    { value: 'JAV', label: 'Java Sea' },
    { value: 'RED', label: 'Red Sea' },
  ]

  function handleChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/octopus/${id}/sightings/`, formData)
      console.log('successful post -> ', res)
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="card card-body md:w-1/2 space-y-4" >
      <h1 className="text-lg font-bold">Recent Sighting</h1>
      <form onSubmit={handleSubmit} className="form-control space-y-4">
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <select
          name="location"
          id="location"
          onChange={handleChange}
          className="select select-bordered w-full max-w-xs"
        >
          <option value=""></option>
          {SEAS_OPTIONS.map(sea => (
            <option key={sea.value} value={sea.value}>
              {sea.label}
            </option>
          ))}
        </select>
        <button
          className="btn btn-secondary w-full max-w-xs"
          type="submit"
        >
          Add Sighting
        </button>
      </form>
    </div>
  )
}
