import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    const outerStyle = {
      boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      position: 'relative',
      top: 0,
      lineHeight: '45px',
      height: '45px'
    };
    const kaLinkStyle = {
      color: '#444',
      padding: '0 10px 0 15px',
      textTransform: 'uppercase',
      fontSize: '18px',
      position: 'relative',
      top: '1px' // vertically center in parent
    };
    const logotypeStyle = {
      fontWeight: 'bold',
      paddingLeft: '18px',
      backgroundImage: 'url(https://www.khanacademy.org/favicon.ico?leaf)', // TODO(chris): inline
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 4px'
    };
    const buttonStyle = {
      borderLeft: '1px solid #ddd',
      color: '#999',
      float: 'right',
      fontSize: '20px',
      textAlign: 'center',
      width: '45px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%'
    };
    const searchButtonStyle = {
      ...buttonStyle,
      backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABm0lEQVR4nKXUT4iNURjH8c+9NGrETjOmpLGxo0hTsqFMabY0MlNKJMlCiYVGWcm/FaNuM4iMjWSl2UwWNrJix05CkZXEpFwzi3Nu8/Q6996RZ3N+zznP+Z7nOe97nlqj0VCxdTiIYWzAb7zDUzzCj+qGaCuDruEszmNNJW479uMSzmCmG7COhxjtdDr68QCbcaEUUM/jxQpsBjuxGmuxF3NhfQKH2gEHpVJbdgzjeIGf+J5hw7ga4q6htwQ8jp7s38J06WQs4FzIdD0OlID7gn+lDSxCLwd/pAQczPoL3ncBwsugN5WAK7JuLgNWjVtVAn7Iul/6qbvZ1qA/loBzQZ9YBvBk0M9LwNvSZZNeyZ4OsKMYy/oX7peAr3Av+z2YlV5BLH8jJjEV5p7gUxVYy82hF88wFNb+4LP00foK2S7kjO9UMyS9iN24a6n8OgYqsGauiNRMpnGkBIT5vLgNN/FWalXzeIMb2IIdlrrNX9DYvlr2GqcK89EO53EsQL/hcb3tls7WzNCY6Wi7DP8V+hW7cP1/gS3o6TixCOv9UNxu8mc0AAAAAElFTkSuQmCC)'
    };
    const menuButtonStyle = {
      ...buttonStyle,
      backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAgklEQVR4nNWUPQ5AUBCEP+IACpVWcBAdJ3wH4S5CrSFKLY3nJ8p5EibZZosvM5nsesYYXMp3SnsT2AKrMCMQXoGZaCzah2BfNEAuAEdguAIrAXaT81Kswxo9cgEsFlgqroAEiIHeRu5F4AxMcEZOReCh75/ef1ruROCjZfU5HPp+yxsV6CSLn4I+KgAAAABJRU5ErkJggg==)'
    };
    return (
      <div className="clearfix" style={outerStyle}>
        <nav style={{float:'left'}}>
        <a href="/" style={kaLinkStyle}><span style={logotypeStyle}>Khan</span>Academy</a>
        </nav>
        <div style={{float:'right'}}>
        <a href="#" style={menuButtonStyle} title="Menu">&nbsp;</a>
        <a href="/search" style={searchButtonStyle} title="Search">&nbsp;</a>
        </div>
      </div>
    );
  }
}
