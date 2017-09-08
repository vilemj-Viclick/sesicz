import React, {
  PureComponent,
} from 'react';
import PropTypes from 'react-proptypes';
import classNames from 'classnames';

export class ThirdLevelMenuItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    currentLocation: PropTypes.string.isRequired,
  };

  render() {
    const { currentLocation, item } = this.props;
    const isSelected = currentLocation.startsWith(item.linkPath);

    return (
      <li>
        <a
          className={classNames('third-level-menu__link', {
            'third-level-menu__link--is-selected': isSelected,
          })}
          href={item.linkPath}
        >
          {item.title}
        </a>
      </li>
    );
  }
}
