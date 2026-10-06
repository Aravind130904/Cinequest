import {IMAGE_BASE_URL} from '../api'

const CastCard = ({person}) => {
  const image = person.profile_path
    ? `${IMAGE_BASE_URL}${person.profile_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image'

  return (
    <div className="cast-card">
      <img src={image} alt={person.name} />
      <div className="cast-info">
        <h3>{person.name}</h3>
        <p>{person.character || 'Unknown Character'}</p>
      </div>
    </div>
  )
}

export default CastCard