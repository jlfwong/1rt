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
      paddingLeft: '4px',
      position: 'relative',
      top: '-1px' // vertically center in parent
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
        <a href="/" style={kaLinkStyle}><svg style={{height:'48px'}} version="1.1" x="0px" y="0px" viewBox="0 0 861 250" enable-background="new 0 0 861 250"><style>{".style0{fill:#25303C;}.style1{fill:#9CB53B;}"}</style><switch><g><g><g><path d="M299.8 91.3h-14.4l-0.3 0.8l-24.6 67.8h9.1c2.4 0 4.3-0.3 5.7-1.3c1.5-1.1 2.3-2.7 3.1-4.8l3.8-10.8 h20.7l3.8 10.8c0.8 2.2 1.7 3.8 3.2 4.9c1.5 1 3.4 1.3 5.8 1.3h9L299.8 91.3z M292.5 109.9c0.5 1.8 1 3.9 1.6 5.5l5.1 15h-13.4 l5.1-15C291.5 113.8 292.1 111.7 292.5 109.9z" className="style0"/><path d="M192.4 145.6l-1.1 0.5L192.4 145.6l-8.4-16.9c-1.1-2.2-2.4-3.5-3.3-4.3c0.9-0.8 2.1-2.2 3.2-4.2l15.9-29 h-16.2l-13.7 25.4c-0.4 0.7-0.8 1-1.5 1.2c-0.6 0.2-1.6 0.3-2.8 0.3h-5.9V98.8c0-2.3-0.5-4.3-1.8-5.6c-1.4-1.4-3.3-1.9-5.7-1.9 H145v13.6v10.6v44.3h14.8v-28.9h5.1c1.3 0 2.4 0 3.1 0.3c0.7 0.2 1.2 0.5 1.6 1.3l10.8 21.7c1.1 2.3 2.4 3.8 4.1 4.6 c1.7 0.8 3.7 1 6.2 1h9l-0.9-1.8C198.8 158 193.3 147.5 192.4 145.6z" className="style0"/><path d="M255.1 91.3h-5.9c-2.3 0-4.3 0.5-5.7 1.9c-1.3 1.4-1.9 3.3-1.9 5.7v20.5h-22V98.8c0-2.3-0.5-4.3-1.8-5.6 c-1.4-1.4-3.3-1.9-5.7-1.9h-7.1v13.6v12.6v42.3h14.6V132h22v27.8h14.6v-41.5v-13.4V91.3H255.1z" className="style0"/><path d="M380.8 91.3H375c-2.4 0-4.4 0.5-5.7 1.9c-1.3 1.4-1.8 3.3-1.8 5.6v30.3c0 1 0 2.1 0.1 3.2 c-0.9-1.8-1.9-3.6-3-5.1l-21.8-35.9h-14.1v48.2v6.7v13.6h7.1c0 0 0 0 0 0c2.4 0 4.3-0.5 5.7-1.8c1.4-1.4 1.8-3.3 1.8-5.7v-30.2 c0-1 0-2.1-0.1-3.2c0.9 1.8 1.9 3.6 3 5.1l21.9 35.8h14v-44.3v-10.6V91.3H380.8z" className="style0"/><path d="M412.7 91.7h7.3l25.8 68.1h-2c-4.8 0-6.2-1-7.9-5.6l-6-16.1h-27l-6.1 16.1c-1.7 4.6-3 5.6-7.8 5.6h-2 L412.7 91.7z M428 132.1l-9-24.3c-1.2-3.2-2.6-8.8-2.6-8.8h-0.2c0 0-1.5 5.6-2.6 8.8l-8.9 24.3H428z" className="style0"/><path d="M529 91.7h7.3l25.8 68.1h-2c-4.8 0-6.2-1-7.9-5.6l-6-16.1h-27l-6.1 16.1c-1.7 4.6-3 5.6-7.8 5.6h-2 L529 91.7z M544.2 132.1l-9-24.3c-1.2-3.2-2.6-8.8-2.6-8.8h-0.2c0 0-1.5 5.6-2.6 8.8l-8.9 24.3H544.2z" className="style0"/><path d="M678.3 91.7h6.9l18 39.6c1.6 3.5 3.4 8 3.4 8h0.2c0 0 1.7-4.5 3.3-8l18-39.6h6.9l5.9 68.1h-2 c-4.2 0-5.6-1.7-5.9-5.9l-3.2-41.3c-0.3-3.7-0.3-9.5-0.3-9.5h-0.2c0 0-1.8 6-3.5 9.5L709.7 147h-6.1l-16.1-34.6 c-1.6-3.4-3.6-9.7-3.6-9.7h-0.2c0 0 0 6-0.3 9.7l-3.2 41.3c-0.3 4.2-1.7 5.9-5.9 5.9h-1.6L678.3 91.7z" className="style0"/><path d="M764.4 130.1l-23.7-38.4h2c4.6 0 6.4 0.7 9.3 5.4l11.5 19.3c2.1 3.6 4.2 7.7 4.2 7.7h0.2 c0 0 2-4.1 4.2-7.7l11.5-19.3c2.9-4.7 4.6-5.4 9.3-5.4h2l-23.7 38.4v29.6h-6.8V130.1z" className="style0"/><path d="M496.5 108.2c-2.6-5.6-10-12-20.9-12c-15.1 0-26.7 11.8-26.7 28.3c0 16.3 11.5 29.3 27 29.3 c7.4 0 13.3-2.5 17-5.2c4.5-3.3 9.2 0.5 9.2 0.5s-9.4 11-26.2 11c-19.9 0-34-15.9-34-35.7c0-19.6 14.4-34.7 33.6-34.7 c9.7 0 21.6 4.3 26.1 14.6c2.1 4.7 2.4 6.9 2.4 6.9S498.3 111.9 496.5 108.2z" className="style0"/><path d="M587.4 91.7h-21v6v5.8v50.4c0 4.2 1.7 5.9 5.9 5.9h15.1c20.5 0 34.2-12.4 34.2-34.1 C621.5 104.1 607.9 91.7 587.4 91.7z M586.7 153.7h-11.4c-1.4 0-2.1-0.7-2.1-2.1V97.7h13.6c16.6 0 27.8 9.9 27.8 28 C614.5 143.8 603.4 153.7 586.7 153.7z" className="style0"/><path d="M660 153.7h-7h-16.9c-1.4 0-2.1-0.7-2.1-2.1v-23.1h25.6v-6H634V97.7h17.3h5.9h8.5v-0.1 c0-4.2-1.7-5.9-5.9-5.9h-32.6v6v7.8v48.3c0 4.2 1.7 5.9 5.9 5.9h29.4c4.2 0 5.9-1.7 5.9-5.9v-0.1H660z" className="style0"/></g><path d="M69.2 155.5c0 0-10.8-25.9 8.6-45.3c17.7-17.6 44.3-20.3 48.9-20.4c0 0 7.2 23.5-10.7 50.1 c-17.8 26.6-42.6 19.4-42.6 19.4s24.4-31.2 21.5-31C92.8 128.4 80 142.6 69.2 155.5z" className="style1"/></g></g></switch></svg></a>
        </nav>
        <div style={{float:'right'}}>
        <a href="#" style={menuButtonStyle} title="Menu">&nbsp;</a>
        <a href="/search" style={searchButtonStyle} title="Search">&nbsp;</a>
        </div>
      </div>
    );
  }
}
