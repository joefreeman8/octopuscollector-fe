import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams, Link } from "react-router-dom"
import AddPhoto from "./AddPhoto"
import AddSighting from "./AddSighting"


export default function OctopusDetail() {

  const [data, setData] = useState({})
  const { id } = useParams()


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/octopus/${id}`)
        console.log(response.data)
        setData(response.data)
      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
  }, [id])



  return (
    <div className="h-dvh">
      <Link className="mt-5 ml-5 btn btn-accent btn-target:shadow-lg" to={'/octopus'}>Go Back</Link>
      <button className="btn btn-warning">Edit</button>
      <button className="btn btn-error">Delete</button>
      <div className="flex justify-center items-center h-4/6 ">
        {data &&
          <div className="bg-neutral flex flex-col md:flex-row gap-4 justify-center items-start">
            <div className="card p-4 md:w-1/2">
              <div className="card-body">
                <h2 className="card-title">
                  {data.name} <span className="text-sm">({data.scientific_name})</span>
                </h2>
                <p>{data.description}</p>
                <p>Maximum life span: {data.life_span} years.</p>
              </div>
              <AddPhoto />
            </div>
            <AddSighting />
            <div className="card-footer card-actions justify-end">
            </div>
          </div>
        }
      </div>
    </div>
  )
}
