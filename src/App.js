import React, { Component } from "react";
import "./App.css";
import unsplash, {test_key, API_KEY, API_SECRET, unsplash_api} from "./unsplash-api.js";
import stoicapi from "stoic-api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getPhoto = this.getPhoto.bind(this);
    this.addText = this.addText.bind(this);
    this.getLines = this.getLines.bind(this);
  }

  async getPhoto() {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.clearRect(0, 0, 400, 600);

    const req_url = unsplash_api + "photos/random?query=nature&client_id="+API_KEY;
    const response = await fetch(req_url);
    const json = await response.json();
    console.log(json);

    const img_url = json['urls']['small'];
    var img = new Image();
    img.src = img_url;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      this.addText();
    };
  }

  addText() {
    const ctx = this.refs.canvas.getContext("2d");
    console.log(ctx);

    const quote = stoicapi.random();

    const lines = this.getLines(ctx, quote, 200);
    console.log(lines);

    var cnt = 1;
    lines.forEach(function(line) {
      console.log("in loop", line, cnt);
      ctx.font = "18px serif";
      ctx.fillStyle = "black";
      ctx.lineWidth = 6;
      ctx.strokeText(line, 30, cnt*35 + 40);
      ctx.fillStyle = "white";
      ctx.fillText(line, 30, cnt * 35 + 40);
      cnt += 1;
    });

    //ctx.font = '18px serif'
    //ctx.fillText(quote, 0, 50)
  }

  getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
      var word = words[i];
      var width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <canvas ref="canvas" width={400} height={600} />
          <button onClick={this.getPhoto}>Get Photo</button>
          <button onClick={this.addText}>Get Quote</button>
          <button onClick={test_key}>Test Key</button>
        </header>
      </div>
    );
  }
}

export default App;
