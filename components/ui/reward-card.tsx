import { useRouter } from "next/navigation";
import Loader from "./loader";
import { RewardType } from "@/types/interface";
import { useGetProductbyIdQuery } from "@/redux/slices/productSlice";
import { Routes } from "@/routes/Routes";
import Image from "next/image";

const RewardCard = ({ reward }: { reward: RewardType }) => {
  const router = useRouter();
  const { data, isLoading } = useGetProductbyIdQuery(reward.productId);

  const product = data?.product ?? [];

  if (isLoading) {
    return (
      <div className="bg-[#11413a] rounded-lg border border-teal-500/10 p-3 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!data || !data.product) {
    return (
      <div className="bg-[#11413a] rounded-lg border border-teal-500/10 p-3">
        <p className="text-red-400">Product not found</p>
      </div>
    );
  }
  return (
    <div className="bg-[#11413a] rounded-lg border border-teal-500/10 p-3">
      <Image
        src={product.featuredImage}
        alt="Logo"
        width={100}
        height={100}
        className="mb-5 size-16"
      />

      <div className="text-gray-300 text-sm space-y-1">
        <p className="text-white">
          Name:{" "}
          <span
            onClick={() => router.push(Routes.PRODUCTS_DETAIL(product.id))}
            className="text-gray-300 cursor-pointer hover:underline"
          >
            {product.name}
          </span>
        </p>
        <p>
          <span className="text-white">Brand:</span> {product.brand?.name}
        </p>
        <p>
          <span className="text-white">Category:</span> {product.category?.name}
        </p>
        <p>
          <span className="text-white">Calories:</span> {product.calories}
        </p>
        <p>
          <span className="text-white">Specs:</span> {product.specs}
        </p>

        {reward.claimedAt && (
          <p>
            <span className="text-white">Claimed At:</span>{" "}
            {new Date(reward.claimedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default RewardCard;
