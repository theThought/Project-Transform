define(['o-question'],
    function (oQuestion) {

        /**
         * Organism: Openend Search
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */
        
        /*

        I want to be able to get the data from this filel  - done! 
        I want to be able to get that tick box? - WIP
        I want to be able to see the selected item - done
        I want to be able to see the selected count - done

        All of the above are in the combobox as I need functions from there that I will need to migrate over to here.

        */ 

        function oQuestionOpenendSearch(id, group) {
            oQuestion.call(this, id, group);
            this.element = document.querySelector('input.a-input-openend-search[data-questionid="' + this.id + '"]');
            this.droplist = document.querySelector('input.a-input-openend-search[data-questionid="' + this.id + '"] + ul');
            this.wrapper = document.querySelector('div[class*=o-openend-search][data-questiongroup="' + this.group + '"]');
            this.container = this.element.closest('div[data-questiongroup="' + this.group + '"]');
            this.hiddenelement = null;
        }

        oQuestionOpenendSearch.prototype = Object.create(oQuestion.prototype);
        oQuestionOpenendSearch.prototype.constructor = oQuestionOpenendSearch;

        oQuestionOpenendSearch.prototype.init = function () {
            oQuestionOpenendSearch.prototype.init.call(this);
            
            this.cloneInputElement();
            this.getDataFromSource();
            
        }
        

        oQuestionOpenendSearch.prototype.cloneInputElement = function () {
            var newelement = this.element.cloneNode();
            newelement.id = '';
            newelement.name = '';
            this.element.type = 'hidden';
            this.element.value = this.element.getAttribute('data-value');
            this.hiddenelement = this.element;
            this.element = this.wrapper.insertBefore(newelement, this.element);
        }

        oQuestionOpenendSearch.prototype.receiveOptionVisibilityChange = function (event) {
            if (this.hiddenelement.value === event.detail.itemValue) {
                this.clearEntries();
            }
        }



        //Getting Data from different sources
        oQuestionOpenendSearch.prototype.getDataFromSource = function () {

            console.log(this.properties.list.location);
                
                  if(this.properties.list.location === 'external'){
                    var location = this.properties.list.location;
                    console.log(location);
                      
                      var xhr = new XMLHttpRequest();
                              var self = this; 
                              
                              xhr.open('GET', this.properties.list.source, true); 
                          
                              xhr.onload = function () {
                                  if (xhr.status >= 200 && xhr.status < 300) {
                                      var response = JSON.parse(xhr.responseText);
                                      if (response && response.length) {
                                          var html = '';
                                          for (var i = 0; i < response.length; i++) {
                                              var item = response[i];
                                              html += '<li class="a-option-list">' + item.name + '</li>';
                                          }
                                          self.droplist.innerHTML = html; 
                                      } else {
                                          self.droplist.innerHTML = '<li>No items found.</li>'; 
                                      }
                                  } else {
                                      console.error('Request failed with status:', xhr.status);
                                  }
                              };
                          
                              xhr.onerror = function () {
                                  console.error('Error during the request.');
                              };
                          
                              xhr.send();
      }
              
  
            
  
  
  
  
           
        };

        return oQuestionOpenendSearch;


    });
    