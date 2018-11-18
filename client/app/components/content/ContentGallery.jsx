import React, {
  PureComponent,
} from 'react';
import PropTypes from 'react-proptypes';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export class ContentGallery extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    currentLocation: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      imageInLightbox: null,
    };
  }

  componentDidMount() {
    this._focusIfSelected();
  }

  componentDidUpdate() {
    this._focusIfSelected();
  }

  _focusIfSelected = () => {
    const { currentLocation, item } = this.props;
    if (currentLocation === item.linkPath) {
      this._scrollToSelf();
    }
  };

  _scrollToSelf = () => {
    const domNode = ReactDOM.findDOMNode(this);
    domNode.scrollIntoView();
  };

  _openLightbox = index => {
    this.setState({
      imageInLightbox: index,
    });
  };

  _closeLightbox = () => {
    this.setState({
      imageInLightbox: null,
    });
  };

  _nextPhoto = () => {
    this.setState(prevState => ({
      imageInLightbox: (prevState.imageInLightbox + 1) % this.props.item.images.length,
    }));
  };

  _previousPhoto = () => {
    this.setState(prevState => ({
      imageInLightbox: (prevState.imageInLightbox - 1 + this.props.item.images.length) % this.props.item.images.length,
    }));
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
        <div className="gallery">
          {item.images.map((image, index) => (
            <div
              className="gallery__image-wrapper"
              key={image.url}
              onClick={() => this._openLightbox(index)}
            >
              <img
                className="gallery__image"
                src={`${image.url}?h=200`}
                alt={image.description}
                title={image.description}
              />
            </div>
          ))}
          {this.state.imageInLightbox !== null && (
            <Lightbox
              mainSrc={item.images[this.state.imageInLightbox].url}
              nextSrc={item.images[(this.state.imageInLightbox + 1) % item.images.length].url}
              prevSrc={item.images[(this.state.imageInLightbox + item.images.length - 1) % item.images.length].url}
              onCloseRequest={this._closeLightbox}
              onMovePrevRequest={this._previousPhoto}
              onMoveNextRequest={this._nextPhoto}
            />
          )}
        </div>
      </div>
    );
  }
}
