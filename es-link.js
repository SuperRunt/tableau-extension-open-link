'use strict';

(function () {
    
    $(document).ready(function () {
        tableau.extensions.initializeAsync().then(function () {
            tableau.extensions.dashboardContent.dashboard.worksheets.forEach(function (worksheet) {
                // add event listener to Item Analysis worksheet
                if (worksheet.name == "Item Analysis") {
                    worksheet.addEventListener(tableau.TableauEventType.MarkSelectionChanged, (event) => {
                        console.log(event)
                        worksheet.getSelectedMarksAsync().then(function (marks) {
                            // Get the first DataTable for our selected marks (usually there is just one)
                            const worksheetData = marks.data[0]._data[0]
                            
                            if ( worksheetData ) {
                                const linkObj = _.find( worksheetData,  (obj) => obj._value.startsWith('https://ei1.examsoft.com') )
                                $('#noMark').hide()
                                $('#showMark').show()
                                $('#showMark iframe').prop('src', linkObj._value)
                            } else {
                                $('#noMark').show()
                                $('#showMark').hide()
                                $('#showMark iframe').prop('src', "")
                            }

                        })
                    })
                }
            })
        })
    })

})();
