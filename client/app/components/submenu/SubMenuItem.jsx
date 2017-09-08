import React, {
  PureComponent,
} from 'react';
import PropTypes from 'react-proptypes';
import classNames from 'classnames';
import { ThirdLevelMenu } from './ThirdLevelMenu';

export class SubMenuItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    currentLocation: PropTypes.string.isRequired,
  };

  render() {
    const { item, currentLocation } = this.props;
    const isSelected = currentLocation.startsWith(item.linkPath);
    const subItems = item.subPages;

    return (
      <tr>
        <td
          className={classNames('submenu__item', {
            'submenu__item--is-selected': isSelected,
          })}
        >
          <a
            className={classNames('submenu__link', {
              'submenu__link--is-selected': isSelected,
            })}
            href={item.linkPath}
          >
            {item.title}
          </a>
          {isSelected && (
            <ThirdLevelMenu
              currentLocation={currentLocation}
              menuItems={subItems}
            />
          )}
        </td>
      </tr>
    );
  }
}
