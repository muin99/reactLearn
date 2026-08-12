import PropTypes from "prop-types";

function CourseTag(props: { courseName: string; color: string }) {
  const style = {
    backgroundColor: props.color + "1a",
    color: props.color,
    borderColor: props.color + "40",
  };

  return (
    <span className="course-tag" style={style}>
      {props.courseName}
    </span>
  );
}

CourseTag.propTypes = {
  courseName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default CourseTag;
