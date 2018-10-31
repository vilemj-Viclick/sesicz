import React, {
  PureComponent,
} from 'react';
import PropTypes from 'react-proptypes';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export class ContentArticle extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    currentLocation: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this._focusIfSelected();
  }

  componentDidUpdate() {
    this._focusIfSelected();
  }

  _focusIfSelected = () => {
    const { currentLocation, item } = this.props;
    if (currentLocation === item.linkPath) {
      this.__scrollToSelf();
    }
  };

  __scrollToSelf = () => {
    const domNode = ReactDOM.findDOMNode(this);
    domNode.scrollIntoView();
  };

  render() {
    const { item } = this.props;

    return (
      <div className="article">
        <h2
          className={classNames('article__title', {
            'article__title--has-children': item.subPages.length > 0,
          })}
        >
          {item.title}
        </h2>
        <div
          className="article__text"
          dangerouslySetInnerHTML={{
            __html: item.text,
          }}
        />
      </div>
    );
  }
}
