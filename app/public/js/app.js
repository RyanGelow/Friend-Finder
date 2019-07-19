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

let output = "N/A";
let slider = "";
$('#test5').on('click', function() {
    output = parseInt($('#test5').val())
    if (output === 1) {
        $('.agree').text("Disagree");
    }if(output === 2) {
        $('.agree').text("Somewhat Disagree");
    }if(output === 3) {
        $('.agree').text("Neutral");
    }if(output === 4) {
        $('.agree').text("Somewhat Agree");
    }if(output === 5) {
        $('.agree').text("Agree");
    }
    slider = $('.agree').html();
})

$(".next-question").on('click', function(){
    if(slider === "" || slider === "You Tell Me..." || slider === "Please adjust slider"){
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
        slider = "";
    }
})
        
$(".last-question").on('click', function(){
    if(slider === "You Tell Me..." || slider === "Please adjust slider"){
        $('.agree').text("Please adjust slider");
    }else{
        $('.agree').text("You Tell Me...");
        newFriend.survey.push(output)
        $('next-question').removeClass('q9')
        $('.question9').addClass('hide').removeClass('show')
        $('.last-question').addClass('hide')
        $('.question10').removeClass('hide').addClass('show')
        $('.see-results').removeClass('hide')
    }
    slider = "";
})

$(".see-results").on('click', function(){
    if(slider === "You Tell Me..." || slider === "Please adjust slider"){
        $('.agree').text("Please adjust slider");
    }else{
        newFriend.survey.push(output)
        $.post("/api/data/friends.js", newFriend)
        .then(function(data) {
            console.log("survey.html", data);
            alert("Friend info uploaded...");
        });
        $('.survey').addClass('hide')
        analyzeFriends()
    }
})

// let testFriend = {
//     first_name: "Ryan",
//     last_name: "G",
//     email: "ryan@fake.com",
//     password: "abc123",
//     img_url: "https://wowxwow.com/wp-content/uploads/2016/12/SListfield-Pink-Square.jpg",
//     survey: [4,4,3,4,2,2,3,4,5,5]
// }

function analyzeFriends() {
    $('.results').removeClass('hide');
    $('img.user-pic').attr('src', newFriend.img_url);
    $('.user-name').text(newFriend.first_name + " " + newFriend.last_name);
    $.ajax({
        url: "/find-friend", 
        method: "GET"
    }).then(function(friendList){
        
        for(let i = 0; i < newFriend.survey.length; i++) {
            newFriend.survey[i] = parseInt(newFriend.survey[i]) 
        }

        let bestMatch = 0;
        let minDiff = 40;
        let scores = [];
        
        for(let i = 0; i < friendList.length; i++) {
            let totalDiff = 0;
            for(let j = 0; j < friendList[i].survey.length; j++) {
                let diff = Math.abs(newFriend.survey[i] - friendList[i].survey[j]);
                totalDiff += diff;
            }
            if(totalDiff < minDiff) {
                bestMatch = i;
                minDiff = totalDiff;
            }
            scores.push(totalDiff)
        }
        let matchName = friendList[bestMatch].first_name + " " + friendList[bestMatch].last_name;
        let matchImg = friendList[bestMatch].img_url;
        let percentMatch = ((1 - (Math.min(...scores)/40))*100).toFixed(2);
        $('img.friend-pic').attr('src', matchImg);
        $('.friend-name').text(matchName);
        $('.analysis-results').text(percentMatch)
    })
}

$('.friend-submit').on('click',function () {
    $.ajax({
        url: "/find-friend", 
        method: "POST"
    }).then(function(data){
        data.push(newFriend)
        $('.analysis-update').text(`${newFriend.first_name} ${newFriend.last_name} added to Friend Network!`)
    })
})

$('#log-in').on('click',function () {
    $.ajax({
        url: "/find-friend", 
        method: "GET"
    }).then(function(data){
        let user = [];
        let bestMatch = 0;
        let minDiff = 40;
        let scores = [];
        for(let i = 0; i < data.length; i++) {
            if($('#email').val() === data[i].email) {
                if($('#password').val() === data[i].password) {
                    const friendListCopy = [...data]
                    user = friendListCopy.splice(i,1)
                    $('.results').removeClass('hide');
                    $('img.user-pic').attr('src', user.img_url);
                    $('.user-name').text(user.first_name + " " + user.last_name);
                    
                    let totalDiff = 0;
                    for(let j = 0; j < friendListCopy[i].survey.length; j++) {
                        let diff = Math.abs(user.survey[i] - friendListCopy[i].survey[j]);
                        totalDiff += diff;
                    }
                    if(totalDiff < minDiff) {
                        bestMatch = i;
                        minDiff = totalDiff;
                    }
                    scores.push(totalDiff)

                    let matchName = friendListCopy[bestMatch].first_name + " " + friendListCopy[bestMatch].last_name;
                    let matchImg = friendListCopy[bestMatch].img_url;
                    let percentMatch = ((1 - (Math.min(...scores)/40))*100).toFixed(2);
                    $('img.friend-pic').attr('src', matchImg);
                    $('.friend-name').text(matchName);
                    $('.analysis-results').text(percentMatch)

                } else{
                    $('#password').val("Not a valid password");
                }
            }else {
                $('#email').val("Not a valid email");
            }
        }
    })
})
