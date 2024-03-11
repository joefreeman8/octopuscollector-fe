import { useState } from "react"
import { useParams } from 'react-router-dom'
import axios from "axios"

export default function AddSighting({ octopusData, setSightingAdded }) {

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
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/octopus/${id}/sightings/`, formData)
      setSightingAdded(true)
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="card card-body space-y-4" >
      <h1 className="text-lg font-bold">Recent Sightings</h1>
      <div>
        {octopusData.sightings_this_week ? (
          <div className="card card-normal bg-primary-content p-4">The {octopusData.name} has been spotted this week!</div>
        ) : octopusData.sightings_this_month ? (
          <div className="card card-normal bg-warning text-black p-4">The {octopusData.name} has been sighted within the last 28 days!</div>
        ) : (
          <div className="card card-normal bg-red-600 p-4">The {octopusData.name} has not been spotted for a while!</div>
        )
        }
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="text-sm">
            <tr>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {octopusData.sightings.map((sighting, idx) => (
              <tr key={idx}>
                <td>{sighting.date}</td>
                <td>{sighting.location_display}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="text-lg font-bold">Add Sighting</h2>
      <form onSubmit={handleSubmit} className="flex items-center content-center w-full form-control space-y-4">
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <select
          name="location"
          id="location"
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value=""></option>
          {SEAS_OPTIONS.map(sea => (
            <option key={sea.value} value={sea.value}>
              {sea.label}
            </option>
          ))}
        </select>
        <button
          className="btn btn-secondary w-full"
          type="submit"
        >
          Add Sighting
        </button>
      </form>
    </div>
  )
}
