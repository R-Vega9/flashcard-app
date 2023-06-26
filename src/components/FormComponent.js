import React from "react";


function FormComponent({front, back, handleChange, handleSubmit, handleCancel}){
    return (
        <form onSubmit={handleSubmit}>
        <div>
          <label>Front</label>
          <textarea
            id="front"
            name="front"
            className="form-control"
            onChange={handleChange}
            type="text"
            value={front}
          />
        </div>
        <div>
          <label>Back</label>
          <textarea
            id="back"
            name="back"
            className="form-control"
            onChange={handleChange}
            type="text"
            value={back}
          />
        </div>
        <button onClick={handleCancel} className="btn btn-secondary mx-1">Cancel</button>
        <button type="submit" className="btn btn-primary mx-1">Submit</button>
      </form>
    )
}

export default FormComponent;