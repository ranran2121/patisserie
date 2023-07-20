import { useState, useEffect } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { IngredientType, SweetTypeFe } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FormDataType = {
  name: string | undefined;
  price: number | undefined;
  quantity: number | undefined;
  ingredients: IngredientType[] | [IngredientType];
};

const SweetForm = (props: { sweetFe: SweetTypeFe | null }) => {
  const { sweetFe } = props;
  const [feedback, setFeedback] = useState("");
  const [hasClicked, setHasClicked] = useState(false);
  const router = useRouter();

  const defaultFormValues: FormDataType = {
    name: sweetFe?.name ? sweetFe.name : "",
    price: sweetFe?.price ? sweetFe.price : 0,
    quantity: sweetFe?.quantity ? sweetFe.quantity : 1,
    ingredients: sweetFe?.ingredients ? sweetFe.ingredients : [{ name: "" }],
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues: defaultFormValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const handleReset = () => {
    reset(defaultFormValues);
    setFeedback("");
  };

  const onSubmit = async (data: FormDataType) => {
    if (!hasClicked) {
      setHasClicked(true);

      try {
        if (!sweetFe) {
          await axios.post("/api/sweets", { data });
          handleReset();
          setFeedback("Sweet successfully created");
        } else {
          const s = await axios.put("/api/sweets", {
            data: { ...data, id: sweetFe.id, madeAt: sweetFe.madeAt },
          });

          router.push("/dashboard/sweets");
        }
      } catch (e) {
        setFeedback("Something went wrong...try later");
      } finally {
        setHasClicked(false);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setFeedback("");
    }, 7000);
  }, [feedback]);

  return (
    <>
      <div className="w-full md:w-[80%] px-4 mx-auto mb-6 mt-2 md:text-center relative">
        <h2 className="text-center font-semibold text-2xl inline">
          {!sweetFe ? "Let' s Create a sweet" : `${sweetFe.name}`}
        </h2>
        {sweetFe && (
          <Link
            href="/dashboard/sweets"
            className="btn inline absolute top-0 right-2"
          >
            back
          </Link>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:items-center md:w-[80%] px-1 mx-auto"
      >
        <>
          <div className="input-div">
            <label htmlFor="quantity" className="form-label">
              quantity:
            </label>
            <input
              type="number"
              min="1"
              max="100"
              step="1"
              defaultValue={1}
              {...register("quantity", { required: true })}
              id="quantity"
              className="form-input"
            />
          </div>
          {errors.quantity && (
            <small className="text-danger -mt-4">this field is required</small>
          )}
        </>

        <div className="input-div">
          <label htmlFor="sweetName" className="form-label">
            name:
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            id="sweetName"
            className="form-input"
          />
        </div>
        {errors.name && (
          <small className="text-danger -mt-4">this field is required</small>
        )}

        <div className="input-div">
          <label htmlFor="price" className="form-label">
            price $:
          </label>
          <input
            type="number"
            min="0"
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
            <div key={index} className="md:w-[60%]">
              <div className="my-4 flex flex-row items-center justify-between">
                <label htmlFor="name" className="form-label">
                  ingredient {index + 1}:
                </label>
                <div className="basis-2/3 flex flex-col">
                  <div className="form-control">
                    <input
                      className="border-2 border-color1 rounded-2xl p-2 basis-5/6"
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
            append({ name: "" });
          }}
          className="btn mt-2"
        >
          <span className="form-label">Add ingredient</span>
        </button>

        <div className="my-4 flex flex-row gap-4 justify-center">
          <button className="btn" type="submit">
            save
          </button>

          {/*  {!sweetFe && ( */}
          <button className="btn" type="button" onClick={handleReset}>
            Reset
          </button>
          {/* )} */}
        </div>

        {feedback && <div className="bg-color3 p-4">{feedback}</div>}
      </form>
    </>
  );
};

export default SweetForm;
