import React, { Component } from 'react';
import './App.css';
import stoicapi from 'stoic-api';
import { API_KEY, unsplashApi } from './unsplash-api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvas = React.createRef();
    this.getPhoto = this.getPhoto.bind(this);
    this.addText = this.addText.bind(this);
  }

  async getPhoto() {
    const ctx = this.canvas.current.getContext('2d');
    ctx.clearRect(0, 0, 400, 600);

    const reqUrl = `${unsplashApi}photos/random?query=nature&client_id=${API_KEY}&w=400&h=600&fit=clamp`;
    const response = await fetch(reqUrl);
    const json = await response.json();

    const imgUrl = json.urls.small;
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      this.addText();
    };
  }

  static getLines(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i += 1) {
      const word = words[i];
      const { width } = ctx.measureText(`${currentLine} ${word}`);
      if (width < maxWidth) {
        currentLine += ` ${word}`;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  addText() {
    const ctx = this.canvas.current.getContext('2d');

    const quote = stoicapi.random();

    const lines = App.getLines(ctx, quote, 220);

    ctx.miterLimit = 2;
    ctx.lineJoin = 'round';

    let cnt = 1;
    lines.forEach((line) => {
      ctx.font = '18px serif';
      ctx.fillStyle = 'black';
      ctx.lineWidth = 7;
      ctx.strokeText(line, 40, cnt * 35 + 40);
      ctx.font = '18px serif';
      ctx.fillStyle = 'white';
      ctx.fillText(line, 40, cnt * 35 + 40);
      cnt += 1;
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <canvas ref={this.canvas} width={400} height={600} />
          <button type="button" onClick={this.getPhoto}>
            Get Photo
          </button>
        </header>
      </div>
    );
  }
}

export default App;
