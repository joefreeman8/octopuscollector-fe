import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams, Link } from "react-router-dom"
import AddPhoto from "./AddPhoto"
import AddSighting from "./AddSighting"
import Loading from "../common/Loading"


export default function OctopusDetail() {

  const [data, setData] = useState(null)
  const [photoAdded, setPhotoAdded] = useState(false)
  const [sightingAdded, setSightingAdded] = useState(false)
  const { id } = useParams()

  const isLoading = !data


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/octopus/${id}`)
        setData(response.data)
        setPhotoAdded(false)
        setSightingAdded(false)
      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
  }, [id, photoAdded, sightingAdded])



  return (
    <div>
      {isLoading && <Loading />}
      {data && (
        <>
          <div className="mb-5">
            <Link className="mt-5 ml-5 mr-2 btn btn-accent btn-target:shadow-lg" to={'/octopus'}>Go Back</Link>
            <button className="btn btn-warning mr-2">Edit</button>
            <button className="btn btn-error">Delete</button>
          </div>
          <div className="flex justify-center items-center">
            <div className="text-center flex flex-col md:flex-row gap-4 justify-center md:items-start">
              <div className="card p-4 md:w-1/2">
                <div className="card-body flex items-center">
                  <h1 className="text-white card-title text-center">
                    {data.name} <span className="text-sm">({data.scientific_name})</span>
                  </h1>
                  <p><strong className="text-white">Bio:</strong> {data.description}</p>
                  <p><strong className="text-white">Maximum life span:</strong> {data.life_span} years.</p>
                </div>
                <hr />
                <AddPhoto octopusData={data} setPhotoAdded={setPhotoAdded} />
              </div>
              <div className="card p-4 md:w-1/2">
                <AddSighting octopusData={data} setSightingAdded={setSightingAdded} />
              </div>
              <div className="card-footer card-actions justify-end">
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
