import React, {
  PureComponent,
} from 'react';
import PropTypes from 'react-proptypes';
import { ContentArticle } from './ContentArticle';

export class ContentCell extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    currentLocation: PropTypes.string.isRequired,
  };

  render() {
    const { currentLocation, items } = this.props;
    const selectedItem = items.find(item => currentLocation.startsWith(item.linkPath));
    const itemsToRender = selectedItem ?
      [selectedItem].concat(selectedItem.subPages) :
      items;
    return (
      <td className="inner-table__content-cell">
        {itemsToRender.map(item => (
          <ContentArticle
            key={item.linkPath}
            currentLocation={currentLocation}
            item={item}
          />
        ))}
      </td>
    );
  }
}
