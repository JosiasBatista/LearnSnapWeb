import LikeAndComment from "@/app/_components/LikeAndComment";
import Creator from "../Creator";
import Link from "next/link";
import { renderTextWithLink } from "../../RenderTextWithLink";

export default function Article({ content } : any) {
  return (
    <section className="max-w-[535px] overflow-y-scroll pt-8">
      <div className="flex flex-col border-b border-[#C2C2C2] gap-2">
        <div className="flex flex-row w-full justify-between">
          <Creator author={content.author} />

          <Link href={`/article/${content.id}`}
            className="font-[family-name:var(--font-cormorant)] text-sm text-primary"
          >
            Ver mais
          </Link>
        </div>

        <strong className="font-[family-name:var(--font-cormorant)] text-primary text-2xl font-bold">
          {content.article.title}
        </strong>

        <p className="font-[family-name:var(--font-montserrat)] text-xs font-regular line-clamp whitespace-pre-line">
          {renderTextWithLink(content.article.article)}
        </p>

        <LikeAndComment values={content._count} liked={content.Like[0]} contentId={content.id} />
      </div>
    </section>
  )
}