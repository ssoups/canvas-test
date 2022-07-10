import { createCanvas, loadImage } from "canvas"
import {MessageAttachment } from 'discord.js'
import fetch from 'node-fetch';

export default function canvas(channel, name){
  fetch(`https://pokeapi.co/api/v2/pokemon/${(name).toLowerCase()}`)
      .then(res => res.json())
      .then(json => {

          const width = 1200;
          const height = 627;
          const canvas = createCanvas(width, height);
          const main = canvas.getContext("2d");
          var background = loadImage('imgs/pokedex.png')

        
          background.then((image) => {
            main.drawImage(image, 0, 0, width, height);
            
            main.textAlign = "center";
            main.fillStyle = "#fff";
            main.font = "25pt 'Retro Gaming'";
            main.fillText(name, (width/2), 600);          
            
            var poekmonimg = loadImage(json.sprites.front_default)
            poekmonimg.then((image) => {
              main.drawImage(image, (width/2)-100, 375, 200, 200); //image, x, y, w, h
            
              var buffer = canvas.toBuffer("image/png");
              const attachment = new MessageAttachment(buffer)
              channel.send({files: [attachment]})
            })
          });
  })
  .catch(err => {
    channel.send('Something went wrong! Possible invalid name.')
    console.log(err)
  })
 
}
