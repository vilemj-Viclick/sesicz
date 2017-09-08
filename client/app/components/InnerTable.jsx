import React, {
  PureComponent,
} from 'react';
import PropTypes from 'react-proptypes';

import { SubMenu } from './submenu/SubMenu';
import { ContentCell } from './content/ContentCell';

export class InnerTable extends PureComponent {
  static propTypes = {
    content: PropTypes.object.isRequired,
    currentLocation: PropTypes.string.isRequired,
  };

  render() {
    const menuItems = this.props.content.subPages;

    return (
      <table
        width="1000"
        className="inner-table"
      >
        <tbody>
          <tr>
            <td className="inner-table__left-border" />
            <td
              className="inner-table__menu-cell"
            >
              <SubMenu
                menuItems={menuItems}
                currentLocation={this.props.currentLocation}
              />
            </td>
            <ContentCell
              currentLocation={this.props.currentLocation}
              items={menuItems}
            />
            <td className="inner-table__right-border">
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
