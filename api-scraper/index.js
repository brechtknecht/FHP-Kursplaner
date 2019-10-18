const fs = require('fs');

const Utils = require('./utils');

const LINKS = {
    LINK_BASIC_STUDYPERIOD : 'https://www.fh-potsdam.de/studieren/fachbereiche/design/studium/vorlesungsverzeichnis/1-studienabschnitt-ba-design/',
    LINK_MAIN_STUDYPERIOD : 'https://www.fh-potsdam.de/studieren/fachbereiche/design/studium/vorlesungsverzeichnis/2-studienabschnitt-ba-design/',
    LINK_MASTER_STUDYPERIOD : 'https://www.fh-potsdam.de/studieren/fachbereiche/design/studium/vorlesungsverzeichnis/ma-design/'
}



const puppeteer = require('puppeteer');

let courses = [];
let modules = [];


scrape(LINKS.LINK_BASIC_STUDYPERIOD);
scrape(LINKS.LINK_MAIN_STUDYPERIOD);
scrape(LINKS.LINK_MASTER_STUDYPERIOD);



async function scrape (LINK) {
  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true
    });
    const page = await browser.newPage();
    await page.goto(LINK);
  
    await page.evaluate(() => {
      let elements = document.querySelectorAll('td.data_spalte1');
      Array.from(elements).forEach((element) => element.click());
    });
  
    let meta = await page.evaluate(() => {
      let tableHeads = document.querySelectorAll('tr.short');
      let headsArray = [];
  
      for (let i = 0; i < tableHeads.length; i++) {
        headsArray[i] = {
          // id: tableHeads[i].children[0].innerText,
          name: tableHeads[i].children[1].innerText,
          teacher: tableHeads[i].children[2].innerText,
          time: tableHeads[i].children[3].innerText,
          room: tableHeads[i].children[4].innerText
        }
      }
  
      return headsArray;
    });
  
    let details = await page.evaluate(() => {
      let tableDetails = document.querySelectorAll('.details');
      let detailsArray = [];
  
      for (let i = 0; i < tableDetails.length; i++) {
        creditRegEx = new RegExp(/\d{1,2} \bCredits\b/gm);
        moduleIdRegEx = new RegExp(/\d{1,2}\w{1,5}-\w{1,5}/gm);
        newModuleIdRegEx = new RegExp(/\d{2} \w{1,5}(\-\w{1,5})?/gm);
        moduleNameRegEx = new RegExp(/\d{1,2}\w{1,5}-\w{1,5}.+?(?=\-)/gm);
  
        // Regex Exceptions
        let resId = moduleIdRegEx.exec(tableDetails[i].children[0].innerText);
        let resName = moduleNameRegEx.exec(tableDetails[i].children[0].innerText);
        let newModuleId = newModuleIdRegEx.exec(tableDetails[i].children[0].innerText);
  
        if(resId == null) {
            resId = new RegExp(/\d{1,2} \w{1,5}-\w{1,5}/gm).exec(tableDetails[i].children[0].innerText);
        }
        if(resName == null) {
          resName = new RegExp(/\d{1,2} \w{1,5}-\w{1,5}.+?(?=\-)/gm).exec(tableDetails[i].children[0].innerText);
        }
  
        if(resName == null) {
          resName = resId;
        }

        if(newModuleId == null) {
          newModuleId = [''];
        }
        if(typeof newModuleId === "undefined") {
          newModuleId = [''];
        }
  
        console.log("New Module IDsheesh: ", newModuleId);
        console.log(resId[0]);
  
        detailsArray[i] = {
          id: resId[0].replace(/\s/g, ''),
          name: resName[0],
          newModuleId: newModuleId[0],
          category: tableDetails[i].children[0].children[2].innerText,
          workspace: tableDetails[i].children[0].children[7],
          credits: creditRegEx.exec(tableDetails[i].children[0].innerText),
          description: tableDetails[i].children[1].innerText
        }
      }
  
      // console.log(detailsArray);
      return detailsArray
    });
  
  
    for (let i = 0; i < meta.length; i++) {
      courses.push({
        "type": "course",
        "_id": Utils.uid(),
        "attributes": {
          "type": null,
          "title": meta[i].name,
          "teacher": meta[i].teacher,
          "semester": "",
          "graduateProgram": "",
          "module": {
            "id": "PO 2013 " + details[i].id,
            "id_new": details[i].newModuleId,
            "name": details[i].name,
            "category": details[i].category
          },
          "time": Utils.dateParser(meta[i].time),
          "room": meta[i].room,
          "descriptionText": {
            "type": "html/md",
            "value": details[i].description,
          },
          "maxStudents": 0,
          "credits": "6",
          // "workspace": details[i].workspace
          "workspace": ""
        },
        "included": [],
        "request": {
          "type": "GET",
          // "url": "https://www.fh-potsdam.de/course-api/storage/7087/course/38c5d9d7122e4ada974ce711e946b067"
        }
      }); 


      modules.push({
        "module": {
          "id": "PO 2013 " + details[i].id,
          "id_new": details[i].newModuleId,
          "name": details[i].name,
          "category": details[i].category
        }
      }); 
    }
  
    
  
  
    let data = JSON.stringify({
      "data" : {
        "data" : {
          "semester" : {
            "name" : "WiSe 2019/2020",
            courses
          }
        }
      }
    });

    fs.writeFileSync('../public/data/courses.json', data);
  
    let moduleData = JSON.stringify({ modules });
    fs.writeFileSync('modules.json', moduleData);
  
    // await page.waitFor(4000)
      await browser.close();
  })();
}
