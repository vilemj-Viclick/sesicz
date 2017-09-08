import React, {
  PureComponent,
} from 'react';
import PropTypes from 'react-proptypes';
import classNames from 'classnames';

function renderItem(item) {
  return [
    <td
      key={item.path + 'left'}
      className={classNames('main-menu__item-left-corner', {
        'main-menu__item-left-corner--is-selected': item.isSelected,
      })}
    />,
    <td
      key={item.path}
      className={classNames('main-menu__item-bottom', {
        'main-menu__item-bottom--is-selected': item.isSelected,
      })}
    />,
    <td
      key={item.path + 'right'}
      className={classNames('main-menu__item-right-corner', {
        'main-menu__item-right-corner--is-selected': item.isSelected,
      })}
    />,
  ];
}

export class MainMenuFooter extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  render() {
    const renderedItems = this.props.items.reduce((aggregate, item) => aggregate.concat(renderItem(item)), []);

    return (
      <tr className="main-menu__footer-row">
        <td />
        {renderedItems}
        <td />
      </tr>
    );
  }
}
