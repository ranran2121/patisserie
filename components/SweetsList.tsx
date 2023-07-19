import { SweetTypeFe } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SweetsList = (props: { sweetsFe: SweetTypeFe[] }) => {
  const { sweetsFe } = props;
  const router = useRouter();

  const handleOnclick = async (id: number) => {
    await axios.delete("/api/sweets", { data: { id } });
    router.refresh();
  };

  return (
    <table className="mx-auto px-8 text-center w-full md:w-[80%] border-2 border-blue-500">
      <thead>
        <tr className="first-row">
          <th className="font-extrabold">#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Created</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {sweetsFe.map((sweet, index) => {
          const { id, name, madeAt, price, ingredients } = sweet;
          return (
            <tr className="row" key={id}>
              <td className="font-bold">{index + 1}</td>
              <td>{name}</td>
              <td>{price}</td>
              <td>{madeAt}</td>
              <td>
                <Link href={`/dashboard/sweets/${id}`} className="btn">
                  Details
                </Link>
              </td>
              <td>
                <button
                  className="btn"
                  type="button"
                  onClick={() => handleOnclick(id)}
                >
                  delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SweetsList;
