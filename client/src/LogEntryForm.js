import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { createLogEntry } from "./API";

function LogEntryForm({ latitude, longitude, onClose }) {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const created = await createLogEntry({ ...data, latitude, longitude });
      console.log(created);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h4 className="error">{error}</h4> : null}
      <label htmlFor="title">Title</label>
      <input name="title" type="text" required ref={register} />
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows="2" ref={register}></textarea>
      <label htmlFor="description">Description</label>
      <textarea name="description" rows="2" ref={register}></textarea>
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required ref={register} />
      <label htmlFor="image">Image</label>
      <input name="image" type="text" ref={register} />
      <button disabled={loading}>{loading ? "Loading..." : "ADD"}</button>
    </form>
  );
}

export default LogEntryForm;
