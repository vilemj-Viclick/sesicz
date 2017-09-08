import React, {
  PureComponent,
} from 'react';
import PropTypes from 'react-proptypes';
import classNames from 'classnames';
import { MainMenu } from './main-menu/MainMenu';
import { ContentFooter } from './ContentFooter';
import { InnerTable } from './InnerTable';
import { getCurrentLocation } from '../utils/locationUtils';

export class MainTable extends PureComponent {
  static propTypes = {
    content: PropTypes.array.isRequired,
  };

  constructor() {
    super();

    this.state = {
      location: getCurrentLocation(),
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ location: getCurrentLocation() });
    });
  }

  _getSelectedMenuItem = () => {
    return this.props.content.find(item => this.state.location.startsWith(item.linkPath));
  };

  _getMenuItems = () => {
    const selectedItem = this._getSelectedMenuItem() || this.props.content[0];
    return this.props.content.map(item => ({
      isSelected: item === selectedItem,
      path: item.linkPath,
      text: item.text,
    }));
  };

  render() {
    const selectedContent = this._getSelectedMenuItem();

    return (
      <table
        className="main-table"
      >
        <tbody>
          <tr className="main-table__logo">
            <td
              className={classNames('main-table__logo-cell', {
                'main-table__logo-cell--is-hidden': true,
              })}
            >
            </td>
          </tr>
          <tr>
            <MainMenu
              items={this._getMenuItems()}
            />
          </tr>
          <tr>
            <td>
              {selectedContent && (
                <InnerTable
                  content={selectedContent}
                  currentLocation={this.state.location}
                />
              )}
              <ContentFooter />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
