/* eslint-disable import/extensions */
/* eslint-disable no-alert */
import Game from './Game.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx, canvas);
