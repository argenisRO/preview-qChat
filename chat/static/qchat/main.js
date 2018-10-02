document.addEventListener('DOMContentLoaded', () => {
    var locat = window.location;
    var wsStart; (locat.protocol == 'https:') ? wsStart = 'wss://': wsStart = 'ws://';
    var des_path = wsStart + locat.host + locat.pathname;
    var socket = new ReconnectingWebSocket(des_path);

    var login_attempts = 1;

    socket.onclose = event => {
        call_alert("Connection to the server has been lost.\nAttempting to reconnect");
        $(".chat-link").removeClass("joined");
        $("ul.chatroom-members").empty();
        $("#quick-buttons").empty();
    }

    socket.onerror = event => {
        call_alert("An Internal Server Error Occurred");
    }

    socket.onmessage = event => {
        let context = JSON.parse(event.data);
        console.log(context);

        if (context.error) {
            call_alert(`Error Retrieving Data`);
            return;
        }

        if (context.authentication) {
            if (context.request_login) {
                if ($("#log-in-box").css('display') === 'none') {
                    login_box_display('show');
                } else if (context.attempts >= 5) {
                    $("#log-title").text("Locked Out");
                    $("#login_info").text(`Too Many Login Attempts. Please wait X minutes.`);
                    call_alert(`Too many login attempts. Please Wait...`);
                } else if (context.attempts <= 5) {
                    $("#login_info").text(`Incorrect Login Information. Attempt ${context.attempts}/5`);
                }
            } else {
                if ($("#log-in-box").css('display') === 'block') {
                    login_box_display('hide');
                    login_user(context.is_staff);
                    welcome_display('show');
                    $("#logout-button").click(()=> {
                        socket.send(JSON.stringify({
                            "operation"  : "logout"
                        }));
                    });
                }
            }
        }

        if (context.connection) {
            let connected_members = $("ul.chatroom-members[room-id='" + context.room + "']");
            connected_members.empty();
            $.each(context.connected_members, function(index,value) {
                let div = `<li name="${value}" room-id="${context.room}" class="list-group-item">${value}</li>`;
                connected_members.append(div);
            })
        }

        if (context.message) {
            let message_group = $("ul.chatroom-messages[room-id='" + context.room + "']");
            let new_message_li;

            switch (context.message_type) {
                case 0: //SPECIAL MESSAGE
                        new_message_li =   `<li class='list-group-item message-item mx-auto'>${context.username}: ${context.message} "</li>`;
                        break;
                case 1: //ALERT MESSAGE
                        new_message_li =   `<li class='list-group-item message-item mx-auto text-warning'>${context.message}</li>`;
                        break;
                case 2: //NORMAL MESSAGE
                        new_message_li =   `<li class='list-group-item py-2 message-item'>
                                                <img class="align-self-end mr-1 chat-image" src="${context.profile_img}" alt="${context.username}'s Profile Image">
                                                <span class="profile-link">${context.username}</span>: ${context.message}
                                                <span class='float-right font-italic'>
                                                    <small>${context.time}</small>
                                                </span>
                                            </li>`;
                        break;
                case 3: //MUTED MESSAGE
                        new_message_li =   `<li class='list-group-item message-item'>${context.username}: ${context.message}
                                                <span class='float-right font-italic'>
                                                    <small>"${context.time}"</small>
                                                </span>" +
                                            </li>`;
                        break;
                default:
                        call_alert("Internal Server Error");
                        return;
            }

            message_group.append(new_message_li);
            message_group.animate({scrollTop: message_group[0].scrollHeight}, "slow");
        }

        if (context.registration) {
            if(context.already_in_use) {
                call_alert("Already Registered. Try different information");
            } else {
                register_display("hide");
                login_user(context.is_staff);
            }
        } 
    }

    // Button Functions
    $(".feedback-icon").click(function () {
        let f_box = $("#feedback-box");
        f_box.fadeToggle("fast","linear")
    })


    $(".chat-link").click(function () {
        let chatroom_id = $(this).attr("room-id");
        let chatroom_messages = $("ul.chatroom-messages[room-id='" + chatroom_id + "']");
        let chatroom_title = $(`.chatroom[room-id='${chatroom_id}']`).find("h1").text();

        if ($(this).hasClass("joined")) {

            $(this).removeClass("joined");
            socket.send(JSON.stringify({
                "operation"  : "manage_chatrooms",
                "command"    : "exit_chat",
                "room_id"    : chatroom_id
            }));

        } else {

            call_alert(`Connected to '${chatroom_title}'`)
            $(this).addClass("joined");
            socket.send(JSON.stringify({
                "operation"  : "manage_chatrooms",
                "command"    : "join_chat",
                "room_id"    : chatroom_id
            }));
        }
        chatroom_messages.animate({scrollTop: chatroom_messages[0].scrollHeight}, "slow");
    });

    // Handles all the Close Buttons in Modal Boxes
    $('.close').each(function (){
        let par = $(this).parent()
        $(this).click(function () {
            call_alert("Although you're able to skip login authentication, at this time qChat doesn't support annonymous users. This feature is being worked on.");
            par.disabled = true;
            par.removeClass("faded");
            setTimeout(() => {
                par.disabled = false;
                par.css('display','none');
            }, 1000);
        });
    });

    // Handles The Register Modal
    $("#register-user").click(function () {
        if ($(this).parent().css('display') === 'block') {
            login_box_display('hide');
        }
        register_display('show');
    });

    // Handles Messages Sent
    $(".channel-message-send").click(function () {
        let chatroom_id = $(this).attr('room-id');
        let chatroom_message = $(`input[room-id='${chatroom_id}']`);
        let chat_connected = $(`.chat-link[room-id='${chatroom_id}']`).hasClass("joined");
        
        if (chat_connected) {
            socket.send(JSON.stringify({
                "operation"  : "new_message",
                "room_id"    : chatroom_id,
                "message"    : chatroom_message.val()
            }));
            chatroom_message.val('');
        } else {
            call_alert("You're not connected to that channel. Join a channel at the top left")
        }
    });

    $("#log-in-box").find("#log-in").click(function () {
        let info = $(this).parent().find(".login-info");
        console.log(info[2].checked)
        socket.send(JSON.stringify({
            operation :  "check_authentication",
            attempts  :  login_attempts++,
            username  :  info[0].value,
            password  :  info[1].value,
            checked   :  info[2].checked
        }));
    })

    function login_box_display(command) {
        let login_box = $("#log-in-box");
        let animation_dura = 1000;

        if (command === 'show') {
            setTimeout(() => {
                login_box.find("button").prop('disabled', false);
            }, animation_dura);
            login_box.css('display','block');
            login_box.addClass("faded");
        } else {
            login_box.find("button").prop('disabled', true);
            login_box.removeClass("faded");
            setTimeout(() => {
                login_box.css('display','none');
            }, animation_dura);
            
        }
    }

    $("#got_it").click(()=>{
        let show_again = $(this).find("#dont-show-again").checked;
        
        welcome_display('hide')
    })

    function welcome_display(command) {
        let welcome_box = $("#Welcome_Message");
        let animation_dura = 1000;

        if (command === 'show') {
            setTimeout(() => {
                welcome_box.find("button").prop('disabled', false);
            }, animation_dura);
            welcome_box.css('display','block');
            welcome_box.addClass("faded");
        } else {
            welcome_box.find("button").prop('disabled', true);
            welcome_box.removeClass("faded");
            setTimeout(() => {
                welcome_box.css('display','none');
            }, animation_dura);
            
        }
    }

    function register_display(command) {
        let register_box = $("#register-box");
        let register_email = register_box.find("#register-email");
        let register_fname = register_box.find("#register-fname");
        let register_lname = register_box.find("#register-lname");
        let register_username = register_box.find("#register-username");
        let register_password = register_box.find("#register-password");
        let register_city = register_box.find("#register-city");
        let register_state = register_box.find("#register-state");
        let register_zipcode = register_box.find("#register-zipcode");
        let register_signup = register_box.find("#register-signup");
        let register_login = register_box.find("#register-login");
        let animation_dura = 1000;

        if (command === 'show') {
            setTimeout(() => {
                register_box.find("button").prop('disabled', false);
            }, animation_dura);
            register_box.css('display', 'block');
            register_box.addClass("faded");

            register_login.click(() => {
                register_display('hide');
                login_box_display('show');
            })  

            register_signup.click(() => {
                socket.send(JSON.stringify({
                    operation   :  "user_registration",
                    email       :  register_email.val(),
                    username    :  register_username.val(),
                    password    :  register_password.val(),
                    fname       :  register_fname.val(),
                    lname       :  register_lname.val(),
                    city        :  register_city.val(),
                    state       :  register_state.val(),
                    zipcode     :  register_zipcode.val(),
                }));
            });
        } else {
            register_box.find("button").prop('disabled', true);
            register_box.removeClass("faded");
            setTimeout(() => { 
                register_box.css('display', 'none')
            }, animation_dura);
        }
    }

    function login_user(is_staff){
        if (is_staff) {
            $("#quick-buttons").append(`<button id="admin-button" type="button" class="btn btn-success quick-btns mx-1">Admin</button>`).show("slow");
        }
        $("#quick-buttons").append(`<button id="profile-button" type="button" class="btn btn-info   quick-btns mx-1">Profile</button>
                                    <button id="logout-button"  type="button" class="btn btn-danger quick-btns mx-1">Log Out</button>`).show("slow");
        
        
        call_alert(`Successfully Logged In`);
    }

    function call_alert(message) {
        duration = message.split(" ").length * 750;
        Snackbar.show({
            text        : message,
            pos         : 'bottom-center',
            showAction  : false,
            duration    : duration
        });
    }
});

