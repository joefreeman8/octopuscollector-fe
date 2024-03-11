import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

export default function OctopusIndex() {

  const [data, setData] = useState([])


  async function fetchData() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/octopus`)
      console.log(response.data)
      setData(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="bg-base h-full">
      <p>Octopus Index</p>
      <div className="grid grid-cols-3 gap-4">
        {data &&
          data.map(octopus => (
            <Link key={octopus.id} to={`/octopus/${octopus.id}`}>
              <div className="card bg-neutral shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">
                    {octopus.name} <span className="text-sm">({octopus.scientific_name})</span>
                  </h2>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}


