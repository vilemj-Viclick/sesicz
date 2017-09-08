import React, {
  PureComponent,
} from 'react';
import PropTypes from 'react-proptypes';
import { SubMenuItem } from './SubMenuItem';

export class SubMenu extends PureComponent {
  static propTypes = {
    menuItems: PropTypes.array.isRequired,
    currentLocation: PropTypes.string.isRequired,
  };

  render() {
    const { currentLocation, menuItems } = this.props;

    return (
      <div className="submenu__wrapper">
        <table
          className="submenu"
        >
          <tbody>
            {menuItems.map(item => (
              <SubMenuItem
                key={item.linkPath}
                item={item}
                currentLocation={currentLocation}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
