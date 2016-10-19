import React from "react";
import ReactDOM from "react-dom";
class App extends React.Component {
  constructor(...arg){
    super(...arg);
    this.start = this.start.bind(this);
    this.createMass = this.createMass.bind(this);
    this.drawMass = this.drawMass.bind(this);
    this.state ={
      mass: {},
      id: 0,
      active: false
    }
  }
  componentDidMount(){
    this.setState({mass: this.createMass()});
    this.canvas = this.refs.this.canvas;
    this.context = this.canvas.getthis.context("2d");
  }
  start(){
    let mass = Object.assign({}, this.state.mass);
    const id = this.state.id;
    if(!this.state.active){ 
      this.setState({id:setInterval(()=>{mass = this.drawMass(mass)},16),active:!this.state.active}) 
    }
    else {
      this.setState({active:!this.state.active});
      clearInterval(id);
    }
    
  }  
  drawMass(arg){
    const mass = arg;
    let gradient = "";
    let arr = [];
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(let key in mass){
      this.context.beginPath();
      this.context.arc(mass[key].pos[0],mass[key].pos[1],mass[key].size,0,2*Math.PI);
      this.context.fillStyle = mass[key].color;
      this.context.strokeStyle = mass[key].color;
      this.context.fill(); 
      mass[key].move();
      mass[key].drawTriangle(mass);
      this.context.stroke();
    }
    
    return mass;
  }
  randomPos(){
    let x = 0,y = 0;
    x = Math.ceil(Math.random()*this.canvas.width*0.95 + 1);
    y = Math.ceil(Math.random()*this.canvas.height*0.95 + 1);
    return [x,y];
  }
  createMass(){
    const pallete = ["#05CDE5","#FFB803","#FF035B","#3D3E3E"];
    let mass = {};
    for(let i = 0; i < 100; i ++){
      mass[i] = {
        "size": Math.ceil(Math.random()*2),
        "color": pallete[Math.floor(Math.random()*4)],
        "speed": Math.random()*2,
        "pos": this.randomPos(),
        "incrX": true,
        "incrY": true,
        "drawTriangle": (obj)=>{
          const that = mass[i];
          const  arr = obj;
          let dx = 0;
          let dy = 0;
          let res = [];
          for(let key in arr){
            dx = Math.sqrt(Math.pow((arr[key].pos[0] - that.pos[0]),2));
            dy = Math.sqrt(Math.pow((arr[key].pos[1] - that.pos[1]),2));
            if(((dx + dy) > 0) && ((dx + dy) < 60)){
              res.push([arr[key].pos[0],arr[key].pos[1]]);
            }
          }
          if((res.length>1)){
            res.reduce((pre,curr,i)=>{
              if(!((i+1)%2)){
                this.context.beginPath();
                this.context.moveTo(that.pos[0],that.pos[1]);
                this.context.lineTo(curr[0],curr[1]);
                this.context.globalAlpha = 0.4;
                this.context.lineTo(pre[0],pre[1]);
                this.context.fillStyle = that.color;
                this.context.fill();
              }
              return curr;
            })
          }
        },
        "move": ()=>{
          const that = mass[i];
          const limX = (this.canvas.width - that.size);
          const limY = (this.canvas.height - that.size);
          let incrX = that.speed;
          let incrY = that.speed;
          let x = that.pos[0];
          let y = that.pos[1];   
           if((that.pos[0] < that.size) || (that.pos[0] > limX)){
            that.incrX = !that.incrX;
          }
          if((that.pos[1] < that.size) || (that.pos[1] > limY)){
            that.incrY = !that.incrY;
          }
          x += (that.incrX)? that.speed : -that.speed;
          y += (that.incrY)? that.speed : -that.speed;
          that.pos = [x,y];
        }
      }
    }
    return mass;
  }
  render(){
    return <div>
              <button  onClick={this.start}>{(this.state.active)? "Stop":"Start"}</button>
              <this.canvas className="this.canvas" width="800" height="400" ref="this.canvas">
              </this.canvas>
            </div>
  }
};
export default App
