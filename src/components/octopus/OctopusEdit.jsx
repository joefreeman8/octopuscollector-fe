import { useState } from "react"

export default function OctopusEdit({ name, scientific_name, bio, life_span, setIsEditMode }) {

  const [formData, setFormData] = useState({
    name: name,
    scientific_name: scientific_name,
    bio: bio,
    life_span: life_span
  })

  console.log(formData)

  return (
    <div className="bordered">
      <h1 className="text-white text-lg font-bold">Edit Octopus Details</h1>
      <form className="form-control mt-5">
        <div className="flex gap-2">
          <label className="input input-bordered flex items-center gap-2 text-sm text-base-content" htmlFor="name">Name:
            <input type="text" id="name" className="grow" value={name} />
          </label>
          <label className="input input-bordered flex items-center gap-2 text-sm" htmlFor="scientific-name">Scientific Name:
            <input type="text" id="scientific-name" className="grow" value={scientific_name} />
          </label>
        </div>
        <textarea className="mt-2 textarea textarea-info" placeholder="Bio" value={bio}></textarea>
        <select className="mt-2 select select-bordered w-full" value={life_span}>
          <option disabled selected>Maximum Lifespan</option>
          <option value="1">One Year</option>
          <option value="2">Two Years</option>
          <option value="3">Three Years</option>
          <option value="4">Four Years</option>
          <option value="5">Five Years</option>
        </select>
      </form>
    </div>
  )
}
