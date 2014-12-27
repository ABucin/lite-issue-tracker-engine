app.service('AuthenticationService', ['ResourceService', 'UserService', 'SettingsService', '$rootScope', '$cookieStore', '$cookies',

    function (ResourceService, UserService, SettingsService, $rootScope, $cookieStore) {

        /**
         * Checks if the user is authenticated via the cookie store.
         * @returns {boolean} true if the user is authenticated; false, otherwise
         */
        this.isAuthenticated = function () {
            return $cookieStore.get('user') !== undefined && $cookieStore.get('user').username !== undefined;
        };

        /**
         * Retrieves the currently authenticated user via the cookie store.
         * @returns {*} a user object
         */
        this.getAuthenticatedUser = function () {
            return ($cookieStore.get('user') !== undefined) ? $cookieStore.get('user') : {};
        };

        /**
         * Authenticates a user using the provided data.
         * @param data user information that is sent to the backend and cached locally
         */
        this.login = function (data) {
            var callback = function (data) {
                if (!$rootScope.general.errors.length) {
                    $cookieStore.put('user', data);
                    // disable when user auth in place
                    UserService.fetchUserData();
                    // caches the settings for the current user
                    SettingsService.loadSettings();
                    $rootScope.navigate('dashboard');
                }
            };

            ResourceService.postData('users/login', data, callback);
        };

        /**
         * De-authenticates a user both locally and in the backend.
         */
        this.logout = function () {
            var callback = function () {
                $cookieStore.remove('user');
                $cookieStore.remove('page');
                $cookieStore.remove('settings');
                $cookieStore.remove('analytics-subpage');
                $cookieStore.remove('settings-subpage');
                $rootScope.navigate('login');
            };

            ResourceService.getData('users/logout', null, callback);
        };

        /**
         * Registers a user and displays the appropriate modals.
         * @param data user information that is stored locally
         */
        this.register = function (data) {
            var callback = function (data) {
                if (!$rootScope.general.errors.length) {
                    $cookieStore.put('user', data);
                    $rootScope.general.errors = [];
                    $("#register-modal").modal('hide');
                    $('#register-success-modal').modal('show');
                    // disable when user auth in place
                    UserService.fetchUserData();
                    // caches the settings for the current user
                    SettingsService.loadSettings();
                }
            };

            ResourceService.postData('users/register', data, callback);
        };
    }]);
