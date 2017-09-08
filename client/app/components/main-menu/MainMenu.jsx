import React, {
  PureComponent,
} from 'react';
import PropTypes from 'react-proptypes';
import { MainMenuFooter } from './MainMenuFooter';
import { MainMenuLinks } from './MainMenuLinks';

export class MainMenu extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  render() {
    return (
      <td className="main-menu__wrapper">
        <table className="main-menu">
          <tbody>
            <MainMenuLinks items={this.props.items} />
            <MainMenuFooter items={this.props.items} />
          </tbody>
        </table>
      </td>
    );
  }
}
