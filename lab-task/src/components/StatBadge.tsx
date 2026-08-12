import PropTypes from 'prop-types'

function StatBadge(props: { label: string; value: string | number }) {
  return (
    <div className="stat-badge">
      <span className="stat-badge-value">{props.value}</span>
      <span className="stat-badge-label">{props.label}</span>
    </div>
  )
}

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default StatBadge
