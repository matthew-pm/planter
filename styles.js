const fs = require('fs');
const csv = require("csvtojson");
// const args[0] = './styles.csv';

const args = process.argv.slice(2);
// args[0] – file
const base = args[0].split('.')[0];
let out = '.';
if (args[1]) out = args[1];

let styles;
console.log(`Parsing ${args[0]}...`);
csv()
  .fromFile(args[0])
  .then((data)=>{
      writeParsed(parseData(data));
      writeAllStyles(data);
  })

function parseData(data) {
  const styles = data;
  let parsed = {};
  // Initialize arrays to hold multiple styles for each image ID key
  for (let s of styles) {
    parsed[s.id] = [];
    // Mutate style data to be in new format (e.g. style.pid, style.color)
    let style = s.style.split('_')
    s.style = { pid: style[0].toLowerCase(), color: style[1] ? style[1].toUpperCase() : ''}

    // Mutate style data to save a link to the JSON url for debugging
    // NOTE: This URL will not be consumed
    //       $wainclude(...)$ will be used to get data to avoid needing to use http requests
    s.style.data_url = `https://staging-na01-petermillar.demandware.net/on/demandware.store/Sites-PM-Site/en_US/Product-ShowQuickView?pid=${s.style.pid}&dwvar_${s.style.pid}_color=${s.style.color}`;
    s.style.pdp_url = `https://staging-na01-petermillar.demandware.net/${s.style.pid}.html`;
  }

  // Add styles to respective image ID key
  for (let s of styles) {
    parsed[s.id] = [...parsed[s.id], s.style]
  }

  console.log('Parsing... Done.');
  return parsed;
}

function writeParsed(parsed) {
  let debug = { ...parsed };
  fs.writeFile(`${out}/${base}-sets.human.json`, JSON.stringify(debug, null, 2), (err) => {
    if (err) return console.log(err);
    console.log(`Writing to '${base}-sets.human.json'... Done.`);
  });
  
  for (let set in parsed) {
    for (let p of parsed[set]) {
      delete p.data_url
      delete p.pdp_url
    }
  }
  fs.writeFile(`${out}/${base}-sets.json`, JSON.stringify(parsed), (err) => {
    if (err) return console.log(err);
    console.log(`Writing to '${base}-sets.json'... Done.`);
  });
}

function writeAllStyles(data) {
  let styles = [];
  
  for (let d of data) {
    styles.push({ pid: d.style.pid, color: d.style.color });
  }

  let unique = [];
  for (let i = 0; i < styles.length; i++) {
    if (unique.find((item) => item.pid == styles[i].pid && item.color == styles[i].color)) {
      continue;
    }
    else unique.push(styles[i]);
  }

  fs.writeFile(`${out}/${base}.human.json`, JSON.stringify(unique, null, 2), (err) => {
    if (err) return console.log(err);
    console.log(`Writing to '${base}.human.json'... Done.`);
  });
  fs.writeFile(`${out}/${base}.json`, JSON.stringify(unique), (err) => {
    if (err) return console.log(err);
    console.log(`Writing to '${base}.json'... Done.`);
  });
}