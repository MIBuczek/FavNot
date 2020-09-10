import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { connect } from 'react-redux';
import { fetchItems } from 'actions';

class Notes extends Component {
  componentDidMount() {
    const { fetchNotes } = this.props;
    fetchNotes();
  }

  render() {
    const [notes] = this.props;
    return (
      <GridTemplate pageType="notes">
        {notes.map(({ title, content, created, _id: id }) => (
          <Card
            id={id}
            cardType="notes"
            title={title}
            content={content}
            created={created}
            key={id}
          />
        ))}
      </GridTemplate>
    );
  }
}

Notes.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
    }),
  ),
};

Notes.defaultProps = {
  notes: [],
};

const mapStateToProps = (state) => {
  const { notes } = state;
  return { notes };
};

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: () => dispatch(fetchItems('notes')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
