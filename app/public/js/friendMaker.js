let newFriend = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    img_url: "",
    survey: []
}

$(".build-profile").on('click', function(){
    newFriend.first_name = $("#first_name").val().trim();
    newFriend.last_name = $("#last_name").val().trim();
    newFriend.email = $("#email").val().trim();
    newFriend.password = $("#password").val().trim();
    newFriend.img_url = $(".profile-image img").attr('src');
    $('.intro').addClass('hide')
    $('.survey').removeClass('hide')
    console.log(newFriend)
})

let output = "N/A"

$('#test5').on('click', function() {
    output = parseInt($('#test5').val());
    if (output === 1) {
        $('.agree').text("Disagree");
        slider = "disagree";
    }if(output === 2) {
        $('.agree').text("Somewhat Disagree");
        slider = "somewhat disagree";
    }if(output === 3) {
        $('.agree').text("Neutral");
        slider = "neutral";
    }if(output === 4) {
        $('.agree').text("Somewhat Agree");
        slider = "somewhat agree";
    }if(output === 5) {
        $('.agree').text("Agree");
        slider = "agree";
    }
    console.log(output)
})

// $(".next-question").on('click', function(){
//     console.log(output)
//     if(output === "N/A"){
//         $('.agree').text("Please adjust slider");
//     }else{
//         newFriend.survey.push(output)
//         $(`.question1`).removeClass('show').addClass('hide')
//         $('.next-question').addClass(`q2`).removeClass(`q1`)
//         $(`.question2`).removeClass('hide').addClass('show')
//         $('.agree').text("You Tell Me...");
//     }
// })



$(".next-question").on('click', function(){
    if(output === "N/A"){
        $('.agree').text("Please adjust slider");
    }else{
        $('.agree').text("You Tell Me...");
        newFriend.survey.push(output)
        for(let i = 1; i < 9; i++){
            if($(`.question${i}`).hasClass('show')) {
                $(`.question${i}`).removeClass('show').addClass('hide')
                $('.next-question').addClass(`q${i++}`).removeClass(`q${i}`)
                $(`.question${i++}`).removeClass('hide').addClass('show')
            }
        } 
        if($(`.question9`).hasClass('show')) {
            $(`.question8`).removeClass('show').addClass('hide')
            $('.next-question').addClass(`hide`).removeClass(`show`)
            $('.last-question').addClass(`show`).removeClass(`hide`)
        }

        output = 3;
        output = 'N/A';
    }
})
        
$(".last-question").on('click', function(){
    if(output === "N/A"){
        $('.agree').text("Please adjust slider");
    }else{
        $('.agree').text("You Tell Me...");
        newFriend.survey.push(output)
        $('next-question').removeClass('q9')
        $('.question9').addClass('hide').removeClass('show')
        $('.last-question').addClass('hide')
        $('.question10').removeClass('hide').addClass('show')
        $('.see-results').removeClass('hide')
        console.log(newFriend)
        output = 3;
        output = 'N/A';
    }
})

$(".see-results").on('click', function(){
    if(output === "N/A"){
        $('.agree').text("Please adjust slider");
    }else{
        newFriend.survey.push(output)
        // friendList.friends.push(newFriend)
        $.post("/api/data/friends.js", newFriend)
        .then(function(data) {
            console.log("survey.html", data);
            alert("Friend info uploaded...");
        });
        $('.survey').addClass('hide')
        analyzeFriends()
        console.log(newFriend)
    }
})

// let newFriend = {
//     first_name: "Ryan",
//     last_name: "Gelow",
//     email: "ryan@fake.com",
//     password: "abc123",
//     img_url: "",
//     survey: [1,2,3,4,1,2,3,4,5,5]
// }

function analyzeFriends() {
    // for(let i = 0; i < 10; i++) {
    //     const scoreLine = parseInt(newFriend.survey[i]);
    //     for (let f = 0; f < (friendList.friends.length - 1); f++){
    //         const matchLine = parseInt(friendList.friends[f].survey[i]);
    //         let lineDiff = [f];
    //         lineDiff.push(Math.abs(scoreLine - matchLine));
    //         const reducer = (total, num) => total + num;
    //         lineDiff.reduce(reducer);
    //     }
    // }
    $.post("/find-friend", newFriend).then(function(response){
        console.log(response)
    })
}
