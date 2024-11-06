export const renderTextWithLink = (text: string) => {
  const regexLink = /(.*?)(https?:\/\/[^\s]+)$/;
  const match = text.match(regexLink);

  const textoPrincipal = match ? text.replace(match[2], "") : text;
  const link = match ? match[2] : null;

  return (
    <p className="font-[family-name:var(--font-montserrat)] text-xs font-regular line-clamp whitespace-pre-line">
      {textoPrincipal}
      {link && (
        <>
          {' '}
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-[#0000EE] underline">
            Reference
          </a>
        </>
      )}
    </p>
  )
}