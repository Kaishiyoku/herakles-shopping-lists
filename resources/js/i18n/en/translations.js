const translations = {
    common: {
        cancel: 'Cancel',
        close: 'Close',
        confirm: 'Confirm',
        create: 'Create',
        error: 'Error',
    },
    confirmationDialog: {
        description: 'Please confirm this action.',
        title: 'Are you sure?',
    },
    login: {
        alreadyLoggedIn: 'You are already logged in.',
        error: 'Login failed .',
        success: 'Login successful.',
        title: 'Login',
    },
    logout: {
        success: 'Logout successful.',
    },
    nav: {
        home: 'Shopping lists',
        login: 'Login',
        logout: 'Logout',
    },
    notFound: {
        description: 'The page you requested does not exit.',
        title: 'Page not found',
    },
    shoppingLists: {
        create: {
            error: 'Shopping list couldn\'t be saved',
            shareWithUsers: 'Share list with other users',
            success: 'Shopping list created.',
            title: 'Add new shopping list',
        },
        default: 'Default list',
        destroy: {
            confirmation: {
                description: 'Do you really want to delete the shopping list “%{name}”? All entries will be deleted permanently.',
            },
            success: 'Shopping list “%{name}” deleted.',
        },
        details: {
            deleteShoppingList: 'Delete shopping list',
        },
    },
    validation: {
        attributes: {
            email: 'Email',
            name: 'Name',
            password: 'Password',
        },
        errors: {
            email: '%{field} must be a valid email address.',
            required: '%{field} is a required field.',
        },
    },
};

export default translations;
