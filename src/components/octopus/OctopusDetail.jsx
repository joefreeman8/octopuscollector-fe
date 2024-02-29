import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams, Link } from "react-router-dom"


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
    <div>
      <Link className="mt-5 ml-5 btn btn-accent btn-target:shadow-lg" to={'/octopus'}>Go Back</Link>
      <div className="flex justify-center items-center h-dvh">
        {data &&
          <div className="card card-compact bg-neutral shadow-xl p-4">
            <div className="card-body">
              <h2 className="card-title">
                {data.name} <span className="text-sm">({data.scientific_name})</span>
              </h2>
              <p>{data.description}</p>
              <p>Maximum life span: {data.life_span} years.</p>
            </div>
            <div className="card-footer card-actions justify-end">
              <button className="btn btn-warning">Edit</button>
              <button className="btn btn-error">Delete</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
