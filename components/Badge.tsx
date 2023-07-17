import Image from "next/image";
import badge from "../assets/badge.svg";

const Badge = (props: { discount: number }) => {
  const { discount } = props;
  return (
    <>
      <Image
        src={badge}
        alt="cake"
        className="absolute -top-4 -right-5"
        width={50}
        height={50}
      />
      <div className="absolute -top-1 -right-[10px] text-white font-bold text-xs">
        <p className="">{(1 - discount) * 100}%</p>
        <p className="">OFF</p>
      </div>
    </>
  );
};

export default Badge;
