import { OpaqueToken } from "@angular/core";

export let conf = new OpaqueToken("conf");

export const AppConf = {
    defaultTitle: 'BreezN - ',
    user: {},
    userInfo: {},
    userRoles: [],
    userLocations: [],
    server: "https://development.veristreamcloud.com/api",
    apis: {
        websocket: '/websocket',
        auth: '/oauth/token',
        authSSOLogin: '/saml/auth?t=',
        userInfo: '/users/self',
        logout: '/logout',
        users: '/users',
        usersUpload: '/users/bulkimport',
        roles: '/roles',
        location: '/locations',
        visits: '/visits',
        visitTypes: '/visittypes',
        widgets: '/dashboard/widgets',
        resetPass: '/reset/password',
        updatePass: '/reset/password/mail',
        customer: '/self',
        customers: '/customers',
        devices: '/kiosks',
        kioskTemplates: '/kiosktemplates',
        documents: '/documents',
        timezones: '/timezones',
        checkToken: '/reset/token/valid',
        backgroundCheck: '/backgroundcheck',
        reports: '/reports',
        activeDirectory: '/integrations',
        countries: '/countries',
        watchlist: '/watchlistentries',
        ssoGet: '/samlidp/customer',
        ssoSet: '/samlidp',
        ssoDownload: '/saml/metadata',
    },
    progress: false,
    globalRoles: ['VeristreamAdmin', 'GlobalAdmin'],
    roles: ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin', 'SecurityOfficer', 'Receptionist', 'StandardUser'],
    roleNames: {
            'VeristreamAdmin': 'Veristream Admin',
            'GlobalAdmin': 'Global Admin',
            'LocalAdmin': 'Local Admin',
            'SecurityOfficer': 'Security Officer',
            'Receptionist': 'Receptionist',
            'StandardUser': 'Standard User'
    },
    timeZones: [
        {id: '1', text: '(UTC-05:00) Easter Time'},
        {id: '2', text: '(UTC-06:00) Northern Time'},
        {id: '3', text: '(UTC-07:00) Southern Time'},
        {id: '4', text: '(UTC-08:00) Wester Time'},
        {id: '5', text: '(UTC-09:00) Easter Time'},
        {id: '6', text: '(UTC-10:00) Easter Time'}
    ],
    languages: [
        {id: 'en', text: 'English'},
        {id: 'es', text: 'Spanish'},
    ],
    defaultRoute: '/dashboard',
    // access information - defines which roles have access to which urls
    access: {
        pages: {
            '/settings/profile':['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin', 'Receptionist', 'SecurityOfficer', 'StandardUser'],
            '/dashboard': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin', 'Receptionist', 'SecurityOfficer', 'StandardUser'],
            '/settings/users': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin'],
            '/settings/locations': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin'],
            '/settings/location': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin'],
            '/settings/kiosk': ['VeristreamAdmin', 'GlobalAdmin'],
            '/settings/kiosk/themes': ['VeristreamAdmin', 'GlobalAdmin'],
            '/settings/devices': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin'],
            '/settings/account': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin'],
            '/settings/integrations': ['VeristreamAdmin', 'GlobalAdmin'],
            '/reports': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin', 'Receptionist', 'SecurityOfficer'],
            '/settings/watchlist': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin', 'SecurityOfficer', 'Receptionist'],
        }
    },
    tooltip: {
        html: true,
        placement: 'top',
    },
    printerTypes: [ {id: 0, text: 'No Printer'},
                    {id: 1, text: 'Brother QL-710W'},
                    {id: 2, text: 'Brother QL-720NW'},
                    {id: 3, text: 'Brother QL-820NWB'}],
    cache: {
        locationId: null,
        dashboardColumns: null,
        statusFilter: null,
        currentLocation: null,
    },
    def: {
        minSearchChars: 2
    }
};
