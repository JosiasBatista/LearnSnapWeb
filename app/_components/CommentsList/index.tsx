import Creator from "../Content/Creator";

export default function CommentsList({ comments }: any) {
  return (
    <div className="w-9/12">
      <strong className="font-[family-name:var(--font-cormorant)] text-2xl">
        Comentários
      </strong>
      {comments.map((comment: any) => (
        <div key={comment.id} className="p-4 flex flex-col gap-2 border-b border-[#C4C4C4] w-full">
          <Creator author={comment.user} />
          
          <span className="font-[family-name:var(--font-cormorant)] text-lg">
            {comment.value}
          </span>
        </div>
      ))}
    </div>
  )
}