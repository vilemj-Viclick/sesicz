import React, {
  PureComponent,
} from 'react';
import PropTypes from 'react-proptypes';
import classNames from 'classnames';

function renderItem(item) {
  return [
    <td
      key={item.path + 'left'}
      className={classNames('main-menu__item-left-side', {
        'main-menu__item-left-side--is-selected': item.isSelected,
      })}
    />,
    <td
      key={item.path}
      className={classNames('main-menu__item', {
        'main-menu__item--is-selected': item.isSelected,
      })}
    >
      <a
        className="main-menu__link"
        href={item.path}
      >
        {item.text}
      </a>
    </td>,
    <td
      key={item.path + 'right'}
      className={classNames('main-menu__item-right-side', {
        'main-menu__item-right-side--is-selected': item.isSelected,
      })}
    />,
  ];
}

export class MainMenuLinks extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  render() {
    const renderedItems = this.props.items.reduce((aggregate, item) => aggregate.concat(renderItem(item)), []);

    return (
      <tr className="main-menu__content-row">
        <td className="main-menu__spacer" />
        {renderedItems}
        <td className="main-menu__spacer" />
      </tr>
    );
  }
}
