"use client";

import BasicInfoCard from "./BasicInfoCard";
import PriceCard from "./PriceCard";
import ImagesCard from "./ImagesCard";
import VariantsCard from "./VariantsCard";
import SizesCard from "./SizesCard";
import SeoCard from "./SeoCard";
import ActionButtons from "./ActionButtons";

type Props = {
  product?: any;
};

export default function ProductForm({
  product,
}: Props) {
  return (
    <div className="space-y-6">

      <BasicInfoCard
        product={product}
      />

      <PriceCard
        product={product}
      />

      <VariantsCard
        product={product}
      />

      <ImagesCard
        product={product}
      />

      <SizesCard
        product={product}
      />

      <SeoCard
        product={product}
      />

      <ActionButtons
        product={product}
      />

    </div>
  );
}