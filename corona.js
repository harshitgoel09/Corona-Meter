#!/usr/bin/env node
const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const figlet = require('figlet');

console.log(chalk.bold.rgb(10, 100, 200)(figlet.textSync("Corona Meter")));

request('https://www.worldometers.info/coronavirus/', cb);

function cb(error, response, html) {
    if (error) {
        // Getting error
        console.error('error:', error);
    } else {
        // Getting html
        handleHtml(html); // function to handle html
    }
}

function handleHtml(html) {
    // Get the Selector Tool : yeh hume selector laa ke dedega
    let selectorTool = cheerio.load(html);

    // Get Content or Data Array using selector
    let contentArr = selectorTool("#maincounter-wrap>.maincounter-number>span");

    // Get the Content individually
    let Cases = selectorTool(contentArr[0]).text();
    let deaths = selectorTool(contentArr[1]).text();
    let recovered = selectorTool(contentArr[2]).text();

    // Print On Console Using npm Chalk
    console.log(chalk.cyan("Coronavirus Cases: ") + chalk.magentaBright(Cases));
    console.log(chalk.cyan("Deaths: ") + chalk.redBright(deaths));
    console.log(chalk.cyan("Recovered: ") + chalk.greenBright(recovered));

}
