const addContent = function(data_set) {

    $('.content_wrap').empty();

    // --- Div Creation --- //
    // Within a for loop, cycles through a provided list of emperors, the variable data_set, concating necessary information and inserting values where needed. 
    // Uses jQuery to append markup to content area created in index.html.

    data_set.forEach((emperor) => {
        let start_date = `${emperor.start_of_reign.day} ${emperor.start_of_reign.month} ${emperor.start_of_reign.year} ${emperor.start_of_reign.bcad}`
        let end_date = `${emperor.end_of_reign.day} ${emperor.end_of_reign.month} ${emperor.end_of_reign.year} ${emperor.end_of_reign.bcad}`
        let length = `${emperor.length_of_reign.years} years, ${emperor.length_of_reign.months} months and ${emperor.length_of_reign.days} days`


        const card_markup = `
        <div class="emperor_card">
        <h2 class="card_title">--- ${emperor.name} ---</h2>
        <img class="card_img" src="./pictures/profiles/${emperor.picture}" alt="Picture of ${emperor.name}">
        <p class="card_content_attributes"><span style="font-size: large; font-weight: bold;">Start of Reign : </span>${start_date}</p>
        <p class="card_content_attributes"><span style="font-size: large; font-weight: bold;">End of Reign : </span>${end_date}</p>
        <p class="card_content_attributes"><span style="font-size: large; font-weight: bold;">Time Reigned : </span>${length}</p>
        <p class="card_content_attributes"><span style="font-size: large; font-weight: bold;">Imperial Dynasty : </span>${emperor.dynasty}</p>
        _______________________________________________
        <div class="card_content_long">
            <p class="card_content_hidden">${emperor.breif}</p>
            <p class="card_content_para">${emperor.breif}</p>
        </div>
        `;

        $('.content_wrap').append(card_markup);

        // --- Div Styling --- // 
        // Uses jQuery .css() method to apply necessary styling for previously created cards.

        $('.emperor_card').css({
            'width': '23.5em',
            'height': 'fit-content',
    
            'display' : 'flex',
            'flex-wrap' : 'nowrap',
            'flex-direction' : 'column',
            'justify-content' : 'center',
    
            'background-color': 'rgb(75, 58, 39)',
            'border-radius': '3em',
            'border' : '2px solid black',
            'box-shadow' : '2px 2px 3px rgb(52, 52, 52)',

            'padding' : '1em',
            'margin' : '1em'


        });
    
        $('.card_title').css({
            'margin' : 'auto'
        });

        $('.card_img').css({
            'max-width' : '20vh',
            'margin' : '.5em auto .5em auto',
            'border' : '2px solid rgb(97, 82, 0)'
        });

        $('.card_content_attributes').css({
            'margin' : '.15em auto .15em auto'
        });

        $('.card_content_hidden').css({
            'display' : 'none'
        })

        $('.card_content_para').css({  
            'max-width' : '40vh',
            'white-space' : 'nowrap',
            'overflow' : 'hidden',
            'text-overflow' : 'ellipsis',
            'margin' : '.5em auto .5em auto'
        });
    });

    // --- Events --- //
    // Initializes events embedded in the markup for the cards.
    // jQuery is used to discover the necessary divs and the .css() method is used to apply needed styling.

    $('.card_content_para').on('mouseover', function() {
        $(this).css({'text-shadow': '1px 1px 1px rgb(150, 150, 150)'})
    });
    $('.card_content_para').on('mouseout', function() {
        $(this).css({'text-shadow': 'none'})
    });

    $('.card_content_long').on('click', function() {
        if ($(this).find('.card_content_hidden').css("display") == 'none') {
            $(this).find('.card_content_hidden').css({'display' : 'block'})
            $(this).find('.card_content_para').css({'display' : 'none'})
        } else if ($(this).find('.card_content_hidden').css("display") == 'block') {
            $(this).find('.card_content_hidden').css({'display' : 'none'})
            $(this).find('.card_content_para').css({'display' : 'block'})
        } 
    });

};

const filterEmperors = function() {

    //  --- Filter Setup --- //
    // Retrieves values from the input fields in the filter bar created in index.html.
    // Uses .val() to add to the object.
    
    console.log('')
    let filters = {
        dynasty : $('#dynasty_select').val(),
        start : {
            year : $('#reign_start_year').val(),
            bcad : $('#reign_start_bcad').val()
        },
        end : {
            year : $('#reign_end_year').val(),
            bcad : $('#reign_end_bcad').val()
        },
        length : $('#years_reigned').val(),
        name : $('#nomen_imperatoris').val(),
    }

    let filtered_emperors = []

    console.log(filters)
    
    console.log('Start')
    console.log(filtered_emperors)

    // --- Filter Dynasty --- //
    // Creates initial filter set by using .push() to add emperors with dynasty values matching filter.dynasty.


    imperators.forEach((emperor) => {
        if (filters.dynasty == 'All') {
            filtered_emperors.push(emperor);
        } else if (filters.dynasty == emperor.dynasty) {
            filtered_emperors.push(emperor);
        } else {
        }
    });

    console.log('After Dynasty Filter')
    console.log(filtered_emperors)

    // --- Filter Reigned After --- //
    // lines 157 - 164 provide a wall against any non numeric positive values.
    // lines 167 - 177 deal with the issue of compatibility between the BC and AD years. That is to say, i needed to be able to judge them on the same numeric line and not as separate dating eras.
    // lines 180 - 182 use keyword delete to clear any objects not meeting the filter criteria from the filter results.
    // NOTE : Attemps were made to use .splice(index, 1) in place of delete in line 183 and subsequent uses. During testing, this filter resulted in the removal of every other entry in the filtered_emperors list. This is due to a shift in the index of the entry following the removed entry. (ex. in list y = [a, b, c, d, e] removal of all != a would result in y = [a, c, e]. The cause being the original index of c, 2, would become an index of 1 after the removal of b. The loop would skip c as it has already removed a value at that index.) After some fidling, in the interest of further development of this project, keyword delete was used. 


    filtered_emperors.forEach((emperor) => {
        let index = filtered_emperors.indexOf(emperor)
        let year = 0
        let start_year = 0

        if (filters.start.year == '') {
        } else if (isNaN(filters.start.year) == true) {
            alert('Please enter a positive number')
            exit
        } else if (filters.start.year < 0) {
            alert('Please enter a positive number')
            exit
        } else {

            if (filters.start.bcad == 'BC') {
                year = year - filters.start.year
            } else {
                year = filters.start.year
            }

            if (emperor.start_of_reign.bcad == 'BC') {
                start_year = start_year - emperor.start_of_reign.year
            } else {
                start_year = emperor.start_of_reign.year
            }  

            if (year > start_year) {
                delete filtered_emperors[index]
            }
        }
    });

    console.log('After After Filter')
    console.log(filtered_emperors)

    // --- Filter Reigned Before --- //
    // lines 199 - 208 provide a wall against any non numeric positive values.
    // lines 210 - 220 deal with the issue of compatibility between the BC and AD years. That is to say, i needed to be able to judge them on the same numeric line and not as separate dating eras.
    // lines 222 - 224 use keyword delete to clear any objects not meeting the filter criteria from the filter results.

    filtered_emperors.forEach((emperor) => {
        let index = filtered_emperors.indexOf(emperor)
        let year = 0
        let start_year = 0

        if (filters.end.year == '') {
        } else if (isNaN(filters.end.year) == true) {
            alert('Please enter a positive number')
            exit
        } else if (filters.end.year < 0) {
            alert('Please enter a positive number')
            exit
        } else {

            if (filters.end.bcad == 'BC') {
                year = year - filters.end.year
            } else {
                year = filters.end.year
            }

            if (emperor.start_of_reign.bcad == 'BC') {
                start_year = start_year - emperor.start_of_reign.year
            } else {
                start_year = emperor.start_of_reign.year
            }  

            if (start_year > year) {
                delete filtered_emperors[index]
            }
        }

    });

    console.log('After Before Filter')
    console.log(filtered_emperors)

    // --- Filter Length --- //
    // lines 238 - 244 provide a wall against any non numeric positive values.
    // line 247 accepts any entries meeting criteria
    // line 249 removes all entries not meeting criteria

    filtered_emperors.forEach((emperor) => {
        let index = filtered_emperors.indexOf(emperor)

        if (filters.length == '') {
        } else if (isNaN(filters.length) == true) {
            alert('Please enter a positive number')
            exit
        } else if (filters.length < 0) {
            alert('Please enter a positive number')
            exit
        } else if (filters.length <= emperor.length_of_reign.years){
        } else {
            delete filtered_emperors[index]
        }
    });

    console.log('After Length Filter')
    console.log(filtered_emperors)

    // --- Filter Name --- //
    // ensures the names match. deletes entry otherwise

    filtered_emperors.forEach((emperor) => {
        let index = filtered_emperors.indexOf(emperor)

        if (filters.name == '') {
        } else if (filters.name == emperor.name) {
        } else {
            delete filtered_emperors[index]
        }
    });

    console.log('After Name Filter')
    console.log(filtered_emperors)

    addContent(filtered_emperors)
};

// I needed a main function because line 282 would not accept a paramater into addContent

const main = function() {
    addContent(imperators);
};


$(document).ready(main);