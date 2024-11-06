import Link from "next/link";
import LikeAndComment from "../../LikeAndComment";
import Creator from "../Creator";

export default function Quote({ content }: any) {
  return (
    <section className="w-[535px] overflow-y-scroll pt-8">
      <div className="flex flex-col border-b border-[#C2C2C2] gap-2">
        <div className="flex flex-row w-full justify-between">
          <Creator author={content.author} />

          <Link href={`/quote/${content.id}`}
            className="font-[family-name:var(--font-cormorant)] text-sm text-primary"
          >
            Ver mais
          </Link>
        </div>

        <div className="flex flex-row gap-2">
          <strong className="font-[family-name:var(--font-cormorant)] leading-8 text-primary text-[42px] font-bold">
            &quot;</strong>
          <p className="font-[family-name:var(--font-cormorant)] text-2xl font-bold">
            {content.quote.description}
          </p>
        </div>

        <span className="font-[family-name:var(--font-cormorant)] mt-2 text-primary text-base font-bold">
          {content.quote.quoteAuthor}
        </span>

        <LikeAndComment values={content._count} liked={content.Like[0]} contentId={content.id} />
      </div>
    </section>
  )
}