$(function () {
    //Declare a variable to store the token.
    var tokenKey = 'token';

    //Function that will call the WebApi if we are authenticated and authorized.
    $("#callApi").click(function () {
        $("#result").text("");

        //Get the token from session storage.
        var token = sessionStorage.getItem(tokenKey);
        //Create an object to store authorization header.
        var headers = {};
        if (token) {
            //if token exists add it to the http header, we are using a Bearer token.
            headers.Authorization = 'Bearer ' + token;
        }

        //Use JQuery and the ajax function to call the webapi method demo.
        $.ajax({
            type: 'GET',
            url: '/api/demo',
            headers: headers
        }).done(function (data) {
            $("#result").append("Name: " + data.name + " Email: " + data.email);
        }).fail(function (jqxhr, textStatus, error) {
            $("#result").append(error);
        });
    });

    //Function for adding new users to the system.
    $("#registerForm").submit(function (e) {
        e.preventDefault();
        $("#result").text("");

        //Create an object to hold user information.
        var data = {
            Email: $("#email").val(),
            Password: $("#password").val(),
            ConfirmPassword: $("#confirmPassword").val()
        };

        //Use JQuery and the ajax method to call the register method.
        $.ajax({
            type: 'POST',
            url: '/api/Account/Register',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function (data) {
            $("#result").append("User is registered!");
        }).fail(function (jqxhr, textStatus, error) {
            $("#result").append(error);
        });
    });

    //Function that is used for authenticating a user.
    $("#loginForm").submit(function (e) {
        e.preventDefault();
        $("#result").text("");

        //Create an object to hold the userinformation taken from the loginForm.
        var loginData = {
            grant_type: 'password',
            username: $("#loginEmail").val(),
            password: $("#loginPassword").val()
        };

        //Use JQuery and the method ajax to call the Token method in the webapi.
        $.ajax({
            type: 'POST',
            url: '/Token',
            contentType: 'application/x-www-form-urlencoded',
            data: loginData
        }).done(function (data) {
            $("#result").append("User logged in!");
            //If it was successful we store the access_token in the sessionStorage.
            sessionStorage.setItem(tokenKey, data.access_token);
            $("#userInfo").html("You are logged in as: " + data.userName);
        }).fail(function (jqxhr, textStatus, error) {
            $("#result").append("Error: " + error);
        });
    });

    //Function that is used for logging off a user.
    $("#logout").click(function () {
        $("#result").text("");
        sessionStorage.removeItem(tokenKey)
        $("#result").append("User is logged out!");
        $("#userInfo").html("Your are not logged in");
    });
});