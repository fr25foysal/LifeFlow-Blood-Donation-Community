
const ExcerptMaker = ({ content, maxLength }) => {
    const excerpt = content.slice(0, maxLength);

    return (
      <div dangerouslySetInnerHTML={{ __html: excerpt }} />
    );
  
};

export default ExcerptMaker;