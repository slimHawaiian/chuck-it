
const randoLink = 'http://api.icndb.com/jokes/random?firstName=Chuck&amp;lastName=Norris';

$(document).ready(function(){
    getRandomJoke().then(() => {
        displayLikedCount();
        clickEvents();
    });
});

//used in the footer
function getRandomJoke()
{
    //hide while getting facts
    $('#fact-block').removeClass('d-block').addClass('d-none');
    return $.get(randoLink,function(result){
        if(result)
        {
            const joke = result.value.joke;
            const newJoke = joke.replace(/(&quot\;)/g,"\"");
            $('.fact-message').text('');
            $('.fact-message').text(newJoke);

            //display with new fact
            $('#fact-block').removeClass('d-none').addClass('d-block');
        }
    });
}

//used in the learning section.  all click events are registered here
function clickEvents()
{
    $('#btnLearnMore').click(function(){
        $('#fact-block').removeClass('d-block').addClass('d-none');
        $.get(randoLink,function(result){
            if(result)
            {
                const fact = result.value.joke;
                const newfact = fact.replace(/(&quot\;)/g,"\"");
                $('#fact-message').text('');
                $('#fact-message').text(newfact);
                $('#fact-block').removeClass('d-none').addClass('d-block');
            }
        });
    });

    $('#btnLike').click(function(){
        saveLikedCount();
        displayLikedCount();
    });
}

function saveLikedCount()
{
    if (localStorage.clickcount) 
        localStorage.clickcount = parseInt(localStorage.clickcount) + 1;
    else
        localStorage.clickcount = 1;
}

function displayLikedCount()
{
    const count = localStorage.clickcount ? parseInt(localStorage.clickcount) : 0;
    $('#like-count').text('');
    $('#like-count').text(count > 0 ? count: "");
}