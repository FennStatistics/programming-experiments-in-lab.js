/* global variables */
// moral theories
var MTrela = 0;
var MTconstruc = 0;
var MThedo = 0;
var MTuti = 0;
var MTDeon = 0;
var MTvirtue = 0;


// explenations global theories
const textRelativism = "adjust in future";


const ds = new lab.data.Store()


/* template: award points to judge importance of X 
> progress bar listening for input */
const templatePointsImportance = new lab.html.Form({
  content: '<div style="font-weight: bold; font-size: x-large;"> ${ parameters.technology} </div> <br>' +
    `
    <form>
    <div class="clearfix">
    <div class="col1">
      <div> <abbr title="${textRelativism}">Relativism</abbr>: <input id="inpMTRelativism" type="number" min="0" max="100" value="0"></div>
      <div>Contractualism: <input id="inpMTContractualism" type="number" min="0" max="100" value="0"></div>
      <div>Hedonism: <input id="inpMTHedonism" type="number" min="0" max="100" value="0"></div>
    </div>
    <div class="col2">
      <div>Utilitarianism: <input id="inpMTUtilitarianism" type="number" min="0" max="100" value="0"></div>
      <div>Deontology: <input id="inpMTDeontology" type="number" min="0" max="100" value="0"></div>
      <div>Virtue Ethics: <input id="inpMTVirtue" type="number" min="0" max="100" value="0"></div>
    </div>
    </div>
     <progress value="0" min="0" max="100" class="progressbar"></progress>
     <div>
     <button id="saveMT" type="submit">Save</button>
   </div>
   
     </form>
    <div id="saveMTmessage">
    <i>Please award in total 100 points!</i>
</div>`,
  messageHandlers: {
    'run': () => {
      // set variables
      MTrela = 0;
      MTconstruc = 0;
      MThedo = 0;
      MTuti = 0;
      MTDeon = 0;
      MTvirtue = 0;

      const progressbar = document.querySelector('.progressbar');

      $("#saveMT").hide(); // hide save button

      // callback function
      var calculate = function () {
        const totalpoints = MTrela + MTconstruc + MThedo + MTuti + MTDeon + MTvirtue;
        if (totalpoints == 100) {
          $("#saveMT").show();
          $("#saveMTmessage").hide();
        } else {
          $("#saveMT").hide();
          $("#saveMTmessage").show();
          const totalpointsDiff = 100 - totalpoints;
          const messageMT = 'Please award in total 100 points, you have ' + totalpointsDiff + ' left'
          document.querySelector('#saveMTmessage').innerText = messageMT;
        }
        return totalpoints;
      };

      // event listeners
      $('#inpMTRelativism').on("input", function () {
        MTrela = Number(this.value);
        progressbar.value = calculate();
      })
      $('#inpMTContractualism').on("input", function () {
        MTconstruc = Number(this.value);
        progressbar.value = calculate();
      })
      $('#inpMTHedonism').on("input", function () {
        MThedo = Number(this.value);
        progressbar.value = calculate();
      })

      $('#inpMTUtilitarianism').on("input", function () {
        MTuti = Number(this.value);
        progressbar.value = calculate();
      })
      $('#inpMTDeontology').on("input", function () {
        MTDeon = Number(this.value);
        progressbar.value = calculate();
      })
      $('#inpMTVirtue').on("input", function () {
        MTvirtue = Number(this.value);
        progressbar.value = calculate();
      })
    },
    'end': () => console.log('Component ended'),
  },
})

const stimuliTechImp = new lab.flow.Loop({
  template: templatePointsImportance,
  templateParameters: [
    /* ... */
    {
      technology: 'nuclear power plant',
      theory: 'A'
    },
    {
      technology: '	wind power station',
      theory: 'A'
    },
    /* ... */
  ]
})

const frameTechImp = new lab.html.Frame({
  context: `
    <header>
     <h3>  Please rate the importance of each moral theory for the following technology. </h3>
    </header>

    <div class="content-horizontal-center">
      <i>Allocate 100 points for this, whereby the allocation of more points represents a higher importance of the respective moral theory:</i>
    </div>
    <main>
      <!-- this is where stimuli will be inserted -->
    </main>

    <footer>
    After you have awarded exactly 100 points, please click save.
    </footer>
  `,
  contextSelector: 'main',
  content: stimuliTechImp,
})

/* template: drag and drop task 
S drag and drop: https://de.khanacademy.org/computer-programming/jquery-example-drag-and-drop/6362163139706880 
S text to image: https://stackoverflow.com/questions/43905570/converting-html-text-to-an-image-javascript */
const templateDragandDrop = new lab.html.Form({
  content: '<div class="content-vertical-center content-horizontal-center">' +
  '<div id="singleItem" style="font-weight: bold; font-size: large;"> ${ parameters.item} </div> <br>' +
    `
    </div>
    <br>
    <div class="content-horizontal-center">
      <div id="Relativism" class="dropzone">
        <abbr title="${textRelativism}">Relativism</abbr>
      </div>
      <div id="Contractualism" class="dropzone">Contractualism</div>
      <div id="Hedonism" class="dropzone">Hedonism</div>

      <div id="Utilitarianism" class="dropzone">Utilitarianism</div>
      <div id="Deontology" class="dropzone">Deontology</div>
      <div id="Virtue" class="dropzone">Virtue Ethics</div>
  </div>
  <form>
  <button id="saveDD" type="submit">Save</button>

  </form>
 `,
  messageHandlers: {
    'run': () => {
      $("#saveDD").hide();

      $("#singleItem").draggable();

      $(".dropzone").droppable({
        drop: function(event, ui) {
            $(this).css('background', 'green');
            $("#saveDD").show();
        },
        over: function(event, ui) {
            $(this).css('background', 'orange');
        },
        out: function(event, ui) {
            $(this).css('background', 'white');
            $("#saveDD").hide();
        }
    });

    },
    'end': () => {
      console.log('Component ended');

      const resultmp = document.querySelectorAll('div');
      resultmp.forEach(el => {
        if(el.style.backgroundColor == "green"){
          console.log(el.style.backgroundColor);
          console.log(el.id);
        }
      })
    },
  },
})

const stimuliItems = new lab.flow.Loop({
  template: templateDragandDrop,
  templateParameters: [
    /* ... */
    {
      item: 'The technology is culturally unacceptable',
      theory: 'A'
    },
    {
      item: 'The technology leads to future evil',
      theory: 'A'
    },
    /* ... */
  ]
})

const frameItems = new lab.html.Frame({
  context: `
    <header>
     <h3>  Please assign the following statement to the moral theory that you think is most appropriate. </h3>
    </header>

    <main>
      <!-- this is where stimuli will be inserted -->
    </main>

    <footer>
    After you have assigned the statement, please click save. It is possible to change your decision.
    </footer>
  `,
  contextSelector: 'main',
  content: stimuliItems,
})










/* ...
> ... */

const fixationCross = function () {
  return new lab.html.Screen({
    content: '+aaa',
    'timeout': 1000
  })
}






// Define the sequence of components that define the study
const study = new lab.flow.Sequence({
  content: [
    frameItems,
    frameTechImp,
  ],
})

// Start the study (uncomment to run)
study.run()