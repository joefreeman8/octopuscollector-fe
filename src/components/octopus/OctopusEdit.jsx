
export default function OctopusEdit() {


  return (
    <div className="bordered">
      <div>OctopusEdit</div>
      <form className="form-control">
        <div className="flex gap-2">
          <label className="input input-bordered flex items-center gap-2 text-sm text-base-content" htmlFor="name">Name:
            <input type="text" id="name" className="grow" />
          </label>
          <label className="input input-bordered flex items-center gap-2 text-sm" htmlFor="scientific-name">Scientific Name:
            <input type="text" id="scientific-name" className="grow" />
          </label>
        </div>
        <textarea className="mt-2 textarea textarea-info" placeholder="Bio"></textarea>
        <select className="mt-2 select select-bordered w-full">
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
