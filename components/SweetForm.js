import { useState, useEffect } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";

const SweetForm = () => {
  const [submission, setSubmission] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { ingredients: [{ name: "" }] } });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const handleReset = () => {
    reset({ sweetName: "", price: "", ingredients: [{ name: "" }] });
    setSubmission(null);
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await axios.post("/api/sweets", data);
      handleReset();
      setSubmission("Sweet successfully created");
    } catch (e) {
      setSubmission("Something went wrong...try later");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSubmission(null);
    }, 7000);
  }, [submission]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center"
    >
      <div className="input-div">
        <label htmlFor="sweetName" className="form-label">
          name:
        </label>
        <input
          type="text"
          {...register("sweetName", { required: true })}
          id="sweetName"
          className="form-input"
        />
      </div>
      {errors.sweetName && (
        <small className="text-danger -mt-4">this field is required</small>
      )}

      <div className="input-div">
        <label htmlFor="price" className="form-label">
          price $:
        </label>
        <input
          type="number"
          min="0.5"
          step="0.5"
          {...register("price", { required: true })}
          id="price"
          className="form-input"
        />
      </div>
      {errors.price && (
        <small className="text-danger -mt-4">this field is required</small>
      )}

      {fields.map((field, index) => {
        return (
          <div key={index} className="w-[90%] md:w-[60%]">
            <div className="my-4 flex flex-row items-center justify-between">
              <label htmlFor="name" className="form-label">
                ingredient {index + 1}:
              </label>
              <div className="basis-2/3 flex flex-col">
                <div className="form-control">
                  <input
                    className="border-2 border-orange-500 rounded-2xl p-2 basis-5/6"
                    type="text"
                    {...register(`ingredients.${index}.name`, {
                      required: true,
                    })}
                    id="name"
                  />
                  <button
                    className="bg-red-500 rounded-full text-white ml-2 basis-1/6 text-2xl pb-1"
                    onClick={() => {
                      remove(index);
                      fields.length--;

                      if (fields.length == 0) {
                        append({ name: "" });
                      }
                    }}
                  >
                    x
                  </button>
                </div>
                {errors?.["ingredients"]?.[index] && (
                  <small className="ml-2 text-danger">
                    this field is required
                  </small>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={() => {
          append({ ingredient: "" });
        }}
        className="btn mt-2"
      >
        <span className="form-label">Add ingredient</span>
      </button>

      <div className="my-4 flex flex-row gap-4">
        <button className="btn" type="submit">
          Create
        </button>

        <button className="btn" type="button" onClick={handleReset}>
          Reset
        </button>
      </div>

      {submission && <div className="bg-orange-300 p-4">{submission}</div>}
    </form>
  );
};

export default SweetForm;
