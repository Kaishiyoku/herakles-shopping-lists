const translations = {
    common: {
        cancel: 'Abbrechen',
        close: 'Schließen',
        confirm: 'Bestätigen',
        create: 'Erstellen',
        error: 'Fehler',
    },
    confirmationDialog: {
        description: 'Bitte bestätigen Sie die Aktion.',
        title: 'Sind Sie sicher?',
    },
    login: {
        alreadyLoggedIn: 'Sie sind bereits eingeloggt.',
        error: 'Login gescheitert.',
        success: 'Login erfolgreich.',
        title: 'Login',
    },
    logout: {
        success: 'Logout erfolgreich.',
    },
    nav: {
        home: 'Einkaufslisten',
        login: 'Login',
        logout: 'Logout',
    },
    notAuthorized: {
        title: 'Bitte melden Sie sich an',
    },
    notFound: {
        description: 'Die von Ihnen aufgerufene Seite konnte nicht gefunden werden.',
        title: 'Seite nicht gefunden',
    },
    shoppingLists: {
        create: {
            error: 'Einkaufsliste konnte nicht gespeichert werden.',
            shareWithUsers: 'Liste mit anderen Nutzern teilen',
            success: 'Einkaufsliste erstellt.',
            title: 'Neue Einkaufsliste erstellen',
        },
        default: 'Standardliste',
        destroy: {
            confirmation: {
                description: 'Wollen Sie die Einkaufsliste „%{name}” wirklich löschen? Alle Einträge werden unwiderruflich gelöscht.',
            },
            success: 'Einlaufsliste „%{name}” gelöscht.',
        },
        details: {
            deleteShoppingList: 'Einkaufsliste löschen',
        },
    },
    validation: {
        attributes: {
            email: 'E-Mail',
            name: 'Name',
            password: 'Passwort',
        },
        errors: {
            email: '%{field} muss eine gültige E-Mail-Adresse sein.',
            required: '%{field} ist ein Pflichtfeld.',
        },
    },
};

export default translations;
