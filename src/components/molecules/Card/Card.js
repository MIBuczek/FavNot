import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import LinkIcon from 'assets/icons/link.svg';
import { connect } from 'react-redux';
import { removeItem } from 'actions';
import withContext from 'hoc/withContext';

const StyledWrapper = styled.div`
  min-height: 380px;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
`;

const InnerWrapper = styled.div`
  position: relative;
  padding: 17px 30px;
  background-color: ${({ activeColor, theme }) => (activeColor ? theme[activeColor] : 'white')};

  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `}
`;

// const DateInfo = styled(Paragraph)`
//   margin: 0 0 5px;
//   font-weight: ${({ theme }) => theme.bold};
//   font-size: ${({ theme }) => theme.fontSize.xs};
// `;

const StyledHeading = styled(Heading)`
  margin: 5px 0 0;
`;

const StyledAvatar = styled.img`
  width: 86px;
  height: 86px;
  border: 5px solid ${({ theme }) => theme.twitters};
  border-radius: 50px;
  position: absolute;
  right: 25px;
  top: 25px;
`;

const StyledLinkButton = styled.a`
  display: block;
  width: 47px;
  height: 47px;
  border-radius: 50px;
  background: white url(${LinkIcon}) no-repeat;
  background-size: 60%;
  background-position: 50%;
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
`;

class Card extends Component {
  state = {
    redirect: false,
  };

  handleCardClick = () => this.setState({ redirect: true });

  render() {
    const {
      id,
      pageContext,
      title,
      twitterName,
      articleUrl,
      content,
      removeItem,
    } = this.props;

    if (this.state.redirect) {
      return <Redirect to={`${pageContext}/${id}`} />;
    }
    return (
      <StyledWrapper>
        <InnerWrapper onClick={this.handleCardClick} activeColor={pageContext}>
          <StyledHeading>{title}</StyledHeading>
          {pageContext === 'twitters' && (
            <StyledAvatar src={`https://avatars.io/twitter/${twitterName}`} />
          )}
          {pageContext === 'articles' && <StyledLinkButton href={articleUrl} />}
        </InnerWrapper>
        <InnerWrapper flex>
          <Paragraph>{content}</Paragraph>
          <Button secondary onClick={() => removeItem(pageContext, id)}>
            REMOVE
          </Button>
        </InnerWrapper>
      </StyledWrapper>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  cardType: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  twitterName: PropTypes.string,
  articleUrl: PropTypes.string,
  removeItem: PropTypes.func.isRequired,
};

Card.defaultProps = {
  cardType: 'note',
  twitterName: null,
  articleUrl: null,
};
const mapDispatchToProps = (dispatch) => ({
  removeItem: (itemType, id) => dispatch(removeItem(itemType, id)),
});

export default connect(null, mapDispatchToProps)(withContext(Card));
