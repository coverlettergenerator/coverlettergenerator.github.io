var app = new Vue({

  delimiters: ["((", "))"],
  el: '#app',

  data: {

    Address: null,
    CompanyName: null,
    Position: '',
    Greetings: '',
    EmployerAddress : '',
    Qualities1:'',
    Qualities2:'',
    ReasonsForApplying:'',
    Output: '',
    file: null,
    textFromFile: ''
  },

  methods: {


    FillTextWithData: function (value) {
        return value
            .replace( /%Company/g, this.CompanyName)
            .replace( /%Greetings/g, this.Greetings)
            .replace( /%Position/g, this.Position)
            .replace( /%EmployerAddress/g, this.EmployerAddress)
            .replace( /%Qualities1/g, this.Qualities1)
            .replace( /%Qualities2/g, this.Qualities2)
            .replace( /%Reasons/g, this.ReasonsForApplying)
            .replace( /%Address/g, "<p style=\"text-align: right \">" + this.Address + "</p>")
            .replace( /%Date/g, "<p style=\"text-align: right \">" + new Date(Date.now()).toLocaleString().split(',')[0] + "</p>")
    },

    GenerateCL: function () {

            var reader = new FileReader();
            const boundFunction = this.updateOutput.bind(this);
            reader.readAsArrayBuffer(this.file);

            reader.onload = function(loadEvent) {
                var arrayBuffer = loadEvent.target.result;
                mammoth.convertToHtml({arrayBuffer: arrayBuffer})
                .then(boundFunction)
                .done();
            }
          },

      updateOutput: function (result) {
      const boundFunction = this.FillTextWithData.bind(this);
      this.Output=boundFunction(result.value)
      console.log(this.Output);
    },

    DownloadCL: function () {

      var doc=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><style>
        html
        {
          font-family: Arial;
          font-size: 14.5px;
        }
        </style></head><body>`;

        doc+=this.Output;
        doc+=`</body></html>`;
      var converted = htmlDocx.asBlob(doc);
      saveAs(converted, this.CompanyName + "-coverLetter");
    },



  }});
