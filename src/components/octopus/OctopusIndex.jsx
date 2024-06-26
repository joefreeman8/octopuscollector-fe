import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import Loading from "../common/Loading"

export default function OctopusIndex() {

  const [data, setData] = useState(null)
  const isLoading = !data


  async function fetchData() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/octopus`)
      setData(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="h-screen">
      {isLoading && <Loading />}

      {data && (
        <div className="mt-10">
          <h1 className="font-bold text-4xl text-center">Find Your Octopus</h1>
          <div className="m-10  grid grid-cols-3 gap-4">
            {data.map(octopus => (
              <Link key={octopus.id} to={`/octopus/${octopus.id}`}>
                <div className="card bg-base-200 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title flex justify-center">
                      {octopus.name} <span className="text-sm">({octopus.scientific_name})</span>
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


