'use client'
const YoutubeEmbed = ({ embedId }: { embedId: string }) => (
  <div className="">
    <iframe
      height="250"
      width="350"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YoutubeEmbed;