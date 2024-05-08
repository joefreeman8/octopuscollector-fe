import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams, Link, useNavigate } from "react-router-dom"
import DisplayPhoto from "../photos/DisplayPhoto"
import AddPhoto from "../photos/AddPhoto"
import AddSighting from "./AddSighting"
import Loading from "../common/Loading"
import OctopusEdit from "./OctopusEdit"


export default function OctopusDetail({ user }) {

  const [data, setData] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  const isLoading = !data



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/octopus/${id}`)
        setData(response.data)
        console.log(response.data)
        setIsComplete(false)
      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
  }, [id, isComplete])

  function editButton() {
    setIsEditMode(true)
  }

  function openDeleteModal() {
    setIsModalOpen(true)
  }

  function closeDeleteModal() {
    setIsModalOpen(false)
  }

  async function handleDelete() {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/octopus/${id}`, {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('deleted')
      navigate('/octopus')
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div>
      {isLoading && <Loading />}
      {data && (
        <>
          <div className="mb-5">
            <Link className="mt-5 ml-5 mr-2 btn btn-accent btn-target:shadow-lg" to={'/octopus'}>Go Back</Link>
            {isEditMode ? (
              <button className="btn btn-warning mr-2 btn-disabled">Edit</button>
            ) : (
              <button onClick={editButton} className="btn btn-warning mr-2">Edit</button>
            )}
            <button onClick={openDeleteModal} className="btn btn-error">Delete</button>
            {isModalOpen && (
              <div className="modal modal-open modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeDeleteModal}>✕</button>
                  <h3 className="font-bold text-lg">Are you sure you want to delete this {data.name}?</h3>
                  <div className="modal-action">
                    <button className="btn btn-error" onClick={handleDelete}>Delete</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center">
            <div className="text-center flex flex-col md:flex-row gap-4 justify-center md:items-start">
              <div className="p-4 md:w-1/2">
                <div className="card bg-base-100 mb-5 shadow-xl">
                  <div className="card-body flex items-center">
                    {isEditMode ? (
                      <OctopusEdit
                        name={data.name}
                        scientific_name={data.scientific_name}
                        description={data.description}
                        life_span={data.life_span}
                        setIsEditMode={setIsEditMode}
                        setIsComplete={setIsComplete}
                        id={id}
                      />
                    ) : (
                      <>
                        <h1 className="text-white card-title text-center">
                          {data.name} <span className="text-sm">({data.scientific_name})</span>
                        </h1>
                        <p><strong className="text-white">Bio:</strong> {data.description}</p>
                        <p><strong className="text-white">Maximum life span:</strong> {data.life_span} years.</p>
                      </>
                    )}
                  </div>
                </div>
                <hr />
                <DisplayPhoto octopusData={data} />
                {user &&
                  <>
                    <AddPhoto setIsComplete={setIsComplete} user={user} />
                    <hr className="sm:hidden" />
                  </>
                }
              </div>
              <div className="card px-4 md:w-1/2">
                <AddSighting octopusData={data} setIsComplete={setIsComplete} />
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
