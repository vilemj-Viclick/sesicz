import React, {
  PureComponent,
} from 'react';

export class ContentFooter extends PureComponent {
  render() {
    return (
      <table
        className="footer"
      >
        <tbody>
          <tr>
            <td className="footer__right-corner" />
            <td
              className="footer__center"
              width="978"
            />
            <td className="footer__right-corner" />
          </tr>
        </tbody>
      </table>
    );
  }
}
