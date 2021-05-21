describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”

    const entries = await page.$$('journal-entry'); 
    const entry1 = entries[0];
    
    await entry1.click();
    await page.waitForNavigation();
    expect(page.url()).toMatch("/#entry1");
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1”

    const header = await page.$eval("h1", (el) => el.textContent);
    expect(header).toBe("Entry 1");

  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
      //will get all the entries on the default jounral-entry page
      const entries = await page.$$('journal-entry'); 
      //this will get the the contents of the first entry
      const contents = await entries[0].getProperty('entry');
      //this will convert to json format
      const json = await (contents.jsonValue());

      expect(json.title).toBe('You like jazz?');
      expect(json.date).toBe('4/25/2021');
      expect(json.content).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
      expect(json.image.src).toBe('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
      expect(json.image.alt).toBe('bee with sunglasses')
        
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
      const body = await page.evaluate( () => {
        return document.querySelector('body').className;
      });

      expect(body).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('header > img');
    expect(page.url()).toMatch("/#settings");
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    // if(page.url() == "/#settings"){
    //   expect(page.title()).toBe("Settings");
    // }
    const header = await page.$eval('header > h1', (el) => el.textContent);
    expect(header).toBe("Settings");
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const body = await page.evaluate( () => {
      return document.querySelector('body').className;
    });

    expect(body).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toMatch("/#entry1");
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goBack();
    expect(page.url()).toMatch("");
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user is on the homepage, the header title should be “Journal Entries”', async() => {
    const header = await page.$eval('header > h1', (el) => el.textContent);
    expect(header).toBe("Journal Entries");
  });
    

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute', async() => {
    const body = await page.evaluate( () => {
      return document.querySelector('body').className;
    });

    expect(body).toBe('');
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
    const entries = await page.$$('journal-entry'); 
    const entry2 = entries[1];
    
    await entry2.click();
    await page.waitForNavigation();
    expect(page.url()).toMatch("/#entry2");
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async() => {
    const header = await page.$eval("header > h1", (el) => el.textContent);
    expect(header).toBe("Entry 2");
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async() => {
  /*
        { 
          title: 'Run, Forrest! Run!',
          date: '4/26/2021',
          content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
          image: {
            src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
            alt: 'forrest running'
          }
        }
      */
        const entries = await page.$$('journal-entry'); 
        //this will get the the contents of the first entry
        const entry2 = await entries[1].getProperty('entry');
        //this will convert to json format
        const json = await (entry2.jsonValue());
  
        expect(json.title).toBe('Run, Forrest! Run!');
        expect(json.date).toBe('4/26/2021');
        expect(json.content).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
        expect(json.image.src).toBe('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg');
        expect(json.image.alt).toBe('forrest running');
      }, 10000);

  // create your own test 17
  it('Test17: When the user clicks on the entry page title for entry 1, the url is for the default page', async() => {
    const goToDefault = await page.$('h1');
    await goToDefault.click();
    await page.waitForNavigation();
    expect(page.url()).toMatch("");
  });

  //create your own test 18
  it("Test18: Verify the header is updated to 'Journal Entries' when clicking on the second entry", async() => {
    const header = await page.$eval("header > h1", (el) => el.textContent);
    expect(header).toBe("Journal Entries");
  });

  //create your own test 19
  it('Test19: When the user clicks the back button, and then forward button, the url should be for the default page', async() => {
      await page.goBack();
      await page.goForward();
      expect(page.url()).toMatch("");
  });

  // create your own test 20
  it('Test20: Verify the entry page contents is correct when clicking on the fourth entry (checking if the audio is working)', async() => {
    const entries = await page.$$('journal-entry');
    /*
        { 
          title: 'You're a wizard, Harry',
          date: '4/28/2021',
          content: "Hmm, difficult. VERY difficult. Plenty of courage, I see. Not a bad mind, either. There's talent, oh yes. And a thirst to prove yourself. But where to put you? Not Slytherin. Not Slytherin. Not Slytherin, eh? Are you sure? You could be great, you know. 
          It's all here in your head. And Slytherin will help you on the way to greatness, there's no doubt about that. No? Please, please. Anything but Slytherin, anything but Slytherin. Well if you're sure, better be... GRYFFINDOR!",
          image: {
            src: 'https://w7w5t4b3.rocketcdn.me/wp-content/uploads/2019/01/harry-potter-sorting-hat-wrong.jpg',
            alt: 'harry looking up at the sorting hat'
          }
          audio: {
            src: 'https://drive.google.com/uc?export=download&id=1Orwnly-OMhNt83tb-SAWt6Y3S6AYQgkk',
            class: 'entry-audio'
          }
        }
      */ 
        //this will get the the contents of the first entry
        const entry4 = await entries[3].getProperty('entry');
        //this will convert to json format
        const json = await (entry4.jsonValue());
        expect(json.title).toBe("You're a wizard, Harry");
        expect(json.date).toBe('4/28/2021');
        expect(json.content).toBe("Hmm, difficult. VERY difficult. Plenty of courage, I see. Not a bad mind, either. There's talent, oh yes. And a thirst to prove yourself. But where to put you? Not Slytherin. Not Slytherin. Not Slytherin, eh? Are you sure? You could be great, you know. It's all here in your head. And Slytherin will help you on the way to greatness, there's no doubt about that. No? Please, please. Anything but Slytherin, anything but Slytherin. Well if you're sure, better be... GRYFFINDOR!");
        expect(json.image.src).toBe('https://w7w5t4b3.rocketcdn.me/wp-content/uploads/2019/01/harry-potter-sorting-hat-wrong.jpg');
        expect(json.image.alt).toBe('harry looking up at the sorting hat');
        expect(json.audio).toBe('https://drive.google.com/uc?export=download&id=1Orwnly-OMhNt83tb-SAWt6Y3S6AYQgkk');
        // expect(json.audio.className).toBe('entry-audio');
  }, 10000);
  
});
