/* eslint-disable */
(function() {
    
    /**********************
     *  Constructor 
     * ********************/
    var PDFFiller = function(pdfURL) {
        var pdfFiller = this;

        pdfFiller.loaded = false;
        pdfFiller.queuedEvents = [];
        pdfFiller.pdfURL = pdfURL || false; 

        // Initialise class
        pdfFiller.init();
    };

    
    /** Init the class  **/
    PDFFiller.prototype.init = function () {
        var pdfFiller = this;
        window.addEventListener("message", pdfFiller.receiveMessage.bind(pdfFiller), false);

        if(pdfFiller.pdfURL) {
            pdfFiller.sendMessage("LOADED", {});
            pdfFiller.loadPDFTron();
        }
    }

    /******************************
     *  Work with PDFTron document 
     * ***************************/
    PDFFiller.prototype.loadPDFTron = function () {
        var pdfFiller = this;
        var viewerElement = document.getElementById('viewer');
        
        pdfFiller.myWebViewer = new PDFTron.WebViewer({
            type: 'html5',  
            path: 'lib',
            l: window.sampleL, // replace with your own license key
            initialDoc: pdfFiller.pdfURL,
            hideAnnotationPanel: true,
            documentType: 'pdf',
            documentId: 'form1',
            mobileRedirect: false
        }, viewerElement);

        $(viewerElement).bind('documentLoaded', function pdfLoaded(event, data) {
            var readerInstance = pdfFiller.myWebViewer.getInstance().docViewer;

            readerInstance.on("annotationsLoaded", function() {
                pdfFiller.annotations = readerInstance.getAnnotationManager();
                pdfFiller.loaded = true;
                pdfFiller.queuedEvents.forEach(function executeQueuedFunction(queuedFunction) {
                    queuedFunction();
                });
            });
        });
    }

    PDFFiller.prototype.exportPDF = function (callback){
        var pdfFiller = this;
        pdfFiller.myWebViewer.getInstance().getFileData({
            xfdfString: pdfFiller.annotations.exportAnnotations(),
            finishedWithDocument: true
        }).then(function pdfToBlob(c) {
            var uintarr = new Uint8Array(c);
            var blob  = new Blob([uintarr], {type: "application/pdf"});
            callback(blob);
        });
      }

      PDFFiller.prototype.loopAnnotations = function (annotationFunction) {
        var pdfFiller = this;

        let annotationsArray = pdfFiller.annotations.getAnnotationsList();
        annotationsArray.forEach(function loopAnnotation(annotation) {
            annotationFunction(annotation);
        });
      }

      PDFFiller.prototype.getValues = function () {
        var pdfFiller = this;

        let values = {};
        pdfFiller.loopAnnotations(function getAnnotationValue(annotation) {
          let field = annotation.getField();
          let {name, value} = field;

          // let formattedName = name.split('_')[0];  // TODO For future development and convention.
          let formattedName = name;
          
          values[formattedName] = value;
        });
        
        return values;
      }

    /*****************************
     *  Frame/parent communication 
     * **************************/
    PDFFiller.prototype.sendMessage = function(messageType, messageData) {
        var message = {
            messageType: messageType,
            messageData: messageData
        };

        window.parent.postMessage(message, "*");
    }

    PDFFiller.prototype.receiveMessage = function(message) {
        var pdfFiller = this;
        
        var payload = message.data;
        var messageType = payload.messageType;
        var messageData = payload.messageData;
        var messageFunction = null;

        switch (messageType) {
            case "SUBMIT":
                messageFunction = function submitFormMessage() {
                    pdfFiller.submitForm();
                }
                break;
            case "PREFILL":
                messageFunction = function prefillFormMessage() {
                    pdfFiller.prefillValues(messageData);
                }
                break; 
        }

        // If the PDF is loaded, do the event. Otherwise, store for later
        if(event && pdfFiller.loaded) {
            messageFunction();
        } else {
            pdfFiller.queuedEvents.push(messageFunction);
        }
    }

    /*******************************************
     *  Actions that can be called from parent 
     * *****************************************/
    PDFFiller.prototype.submitForm = function() {
        var pdfFiller = this;
        pdfFiller.exportPDF(function exportPDFCallback(pdfBlob) {
            pdfFiller.sendMessage("SUBMIT", {
                formData: pdfFiller.getValues(),
                pdfBlob: pdfBlob
            });
        });
    };

    PDFFiller.prototype.prefillValues = function (prefillObject) {
        var pdfFiller = this;
        
        pdfFiller.loopAnnotations(function prefillAnnotation(annotation) {
            let field = annotation.getField();            
            let {name} = field;
  
            // let formattedName = name.split('_')[0];  // TODO For future development and convention.
            let formattedName = name;
  
            if(prefillObject[formattedName]) {
              field.setValue(prefillObject[formattedName]);
            }
        });
      }

    // Expose class to window.
    window.PDFFiller = PDFFiller;
})();