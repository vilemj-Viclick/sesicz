import React, {
  PureComponent,
} from 'react';
import PropTypes from 'react-proptypes';
import { ThirdLevelMenuItem } from './ThirdLevelMenuItem';

export class ThirdLevelMenu extends PureComponent {
  static propTypes = {
    menuItems: PropTypes.array.isRequired,
    currentLocation: PropTypes.string.isRequired,
  };

  render() {
    if (this.props.menuItems.length <= 0) {
      return null;
    }

    return (
      <ul className="third-level-menu">
        {this.props.menuItems.map(item => (
          <ThirdLevelMenuItem
            key={item.linkPath}
            currentLocation={this.props.currentLocation}
            item={item}
          />
        ))}
      </ul>
    );
  }
}
