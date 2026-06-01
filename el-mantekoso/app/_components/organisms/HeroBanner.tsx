"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";

interface HeroBannerProps {
  productId: string;
  img: string;
  badge: string;
  title: string;
  desc: string;
  price: number;
  oldPrice?: number;
}

export default function HeroBanner({ productId, img, badge, title, desc, price, oldPrice }: HeroBannerProps) {
  const router = useRouter();
  return (
    <div
      className="mx-4 mb-5 rounded-[24px] overflow-hidden relative h-[220px] cursor-pointer"
      onClick={() => router.push(`/vitrina/${productId}`)}
    >
      <Image src={img} alt={title} fill className="object-cover hover:scale-[1.03] transition-transform duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(27,46,75,0.85)] to-transparent px-5 py-4 flex flex-col justify-end">
        <Badge>{badge}</Badge>
        <h2 className="font-display text-[22px] text-white font-bold leading-tight mt-[6px] mb-1">{title}</h2>
        <p className="text-[11px] text-white/80 mb-[10px]">{desc}</p>
        <div className="flex justify-between items-center">
          <span className="text-[20px] font-bold text-white">
            ${price.toFixed(2)}
            {oldPrice && <small className="text-[11px] line-through opacity-55 ml-[6px] font-normal">${oldPrice.toFixed(2)}</small>}
          </span>
          <Button
            variant="white"
            fullWidth={false}
            className="text-[12px] px-[18px] py-2 rounded-[20px]"
            onClick={(e) => { e.stopPropagation(); router.push(`/vitrina/${productId}`); }}
          >
            Pedir Ahora
          </Button>
        </div>
      </div>
    </div>
  );
}
