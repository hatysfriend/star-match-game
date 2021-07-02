import React from 'react';
import '../App.css';
import {utils} from '../App.js';

export default function StarDisplay(props) {
  return (
    utils.range(1, props.count).map((starId) => <div key={starId} className="star"></div> )
  )
}
