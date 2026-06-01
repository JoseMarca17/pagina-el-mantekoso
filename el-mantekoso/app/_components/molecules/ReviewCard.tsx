import StarRating from "../atoms/StarRating";

interface ReviewCardProps {
  initials: string;
  author: string;
  date: string;
  rating: number;
  text: string;
}

export default function ReviewCard({ initials, author, date, rating, text }: ReviewCardProps) {
  return (
    <div className="mx-4 mb-3 bg-white border border-(--color-border) rounded-[16px] p-[14px_16px]">
      <div className="flex items-center gap-[10px] mb-[6px]">
        <div className="w-9 h-9 rounded-full bg-(--color-cream-2) flex items-center justify-center text-[14px] font-bold text-(--color-navy)">
          {initials}
        </div>
        <div>
          <div className="text-[12px] font-bold text-(--color-navy)">{author}</div>
          <div className="text-[10px] text-(--color-muted) flex items-center gap-1">
            {date} · <StarRating value={rating} readonly size="sm" />
          </div>
        </div>
      </div>
      <p className="text-[12px] text-(--color-muted) leading-relaxed">{text}</p>
    </div>
  );
}
