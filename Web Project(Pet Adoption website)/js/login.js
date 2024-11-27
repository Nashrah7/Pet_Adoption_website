let currentPanel = "signin";
let error = "";

swap("signin");

function signin() {
    const user = $("#user").val();
    const password = $("#password").val();

    if (user.length !== 0 && password.length !== 0) {
        let _data = {
            user,
            password
        };
        sendRequest(_data, "signin");
    } else {
        $(".error").html("Username or Password must not be empty!");
    }
}

function signup() {
    const user = $("#reguser").val();
    const password = $("#regpassword").val();
    const email = $("#email").val();
    const fullname = $("#fullname").val();
    const phonenumber = $("#phonenumber").val();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (user.length !== 0 && password.length !== 0 && email.length !== 0 && fullname.length !== 0 && phonenumber !== 0) {
        if (emailRegex.test(email)) {
            var _data = {
                user,
                password,
                email,
                fullname,
                phonenumber
            };

            sendRequest(_data, "signup");
        } else {
            $(".error").html("Invalid email");
        }
    } else {
        $(".error").html("All fields are required");
    }

}

function sendRequest(_data, requestType) {
    const _url = requestType === "signin" ? "http://localhost:3000/authentication" : "http://localhost:3000/signup";
    $.ajax({
        method: "get",
        url: _url,
        dataType: "jsonp",
        data: _data,
        success: function (data) {
            if (data.success) {
                if (data.error) {
                    $(".error").html(data.error);
                }

                switch (requestType) {
                    case "signin":
                        window.location.href = "profile.html";
                        break;
                    case "signup":
                        $(".form").hide();
                        $(".message").html(data.message)
                        break;
                }
            }
        },
        error: function (err) {
            $(".error").html("Oops! There was an error sending request, please try again!");
            console.log(err);
        }
    });
}

function swap(value) {
    currentPanel = value;
    switch (value) {
        case "signin":
            $("#signup").hide();
            $("#login").show();
            break;
        case "signup":
            $("#login").hide();
            $("#signup").show();
            break;
    }
}