import React, { Component } from "react";

const Field =(props) => {

  const initNewField =() => {
    let {cells} = props;
    let {latest}=props;
    console.log(props);
    let divStyle={
      webkitAnimation: 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
      animation: 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'
    };
    let Tile = {

    };

    let allCells = cells.map((item,x) => {
      return item.map((i,y) => {

        if(latest && x===latest.i && y===latest.j){console.log('!!') }
        // console.log(x,y, latest.i[0], latest.j[0]);
        return <div className={'cell '+((latest && x===latest.i && y===latest.j) ? ' rt' :'')} style={divStyle}  >{i ? i : ""} </div>;
      });
    });

    return <div className="field">{allCells}</div>;
  };
 return (
      initNewField()
 )


};
export default Field