type MatchCardProps = {
  name: string;
  description: string;
};

const MatchCard = ({ name, description }: MatchCardProps) => {
  return (
    <div className="match-card">
      <h3>{name}</h3>
      <p>{description}</p>
      <button className="btn">联系TA</button>
    </div>
  );
};

export default MatchCard;
